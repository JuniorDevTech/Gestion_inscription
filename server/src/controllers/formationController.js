import Formation from "../models/formationModel.js";

/* ================================================= */
/* ================= CREATE FORMATION ============== */
/* ================================================= */

export const createFormation = async (req, res) => {
  try {
    const { title, description, price, duration, level, category, status } =
      req.body;

    /* VALIDATION */

    if (!title || !description || !price || !duration || !category) {
      return res.status(400).json({
        message: "Veuillez remplir tous les champs obligatoires",
      });
    }

    /* IMAGE */

    let image = "";

    if (req.file) {
      image = `/uploads/formations/${req.file.filename}`;
    }

    /* CREATE */

    const formation = await Formation.create({
      title,

      description,

      price,

      duration,

      level,

      category,

      status,

      image,
    });

    return res.status(201).json({
      message: "Formation créée avec succès",

      formation,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",

      error: error.message,
    });
  }
};

/* ================================================= */
/* ================= GET FORMATIONS ================ */
/* ================================================= */

export const getFormations = async (req, res) => {
  try {
    const formations = await Formation.aggregate([
      {
        $lookup: {
          from: "inscriptions",

          localField: "_id",

          foreignField: "formation",

          as: "inscriptions",
        },
      },

      {
        $addFields: {
          students: {
            $size: "$inscriptions",
          },
        },
      },

      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return res.status(200).json({
      formations,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur récupération formations",

      error: error.message,
    });
  }
};

/* ================================================= */
/* ================= UPDATE FORMATION ============== */
/* ================================================= */

export const updateFormation = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);

    if (!formation) {
      return res.status(404).json({
        message: "Formation introuvable",
      });
    }

    /* ================================================= */
    /* ================= UPDATE FIELDS ================= */
    /* ================================================= */

    formation.title = req.body.title || formation.title;

    formation.description = req.body.description || formation.description;

    formation.price = req.body.price || formation.price;

    formation.duration = req.body.duration || formation.duration;

    formation.level = req.body.level || formation.level;

    formation.category = req.body.category || formation.category;

    formation.status = req.body.status || formation.status;

    /* ================================================= */
    /* ================= UPDATE IMAGE ================== */
    /* ================================================= */

    if (req.file) {
      formation.image = `/uploads/formations/${req.file.filename}`;
    }

    /* ================================================= */
    /* ================= SAVE ========================== */
    /* ================================================= */

    const updatedFormation = await formation.save();

    return res.status(200).json({
      message: "Formation modifiée avec succès",

      formation: updatedFormation,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur modification formation",

      error: error.message,
    });
  }
};

/* ================================================= */
/* ================= DELETE FORMATION ============== */
/* ================================================= */

export const deleteFormation = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);

    if (!formation) {
      return res.status(404).json({
        message: "Formation introuvable",
      });
    }

    await formation.deleteOne();

    return res.status(200).json({
      message: "Formation supprimée avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur suppression formation",

      error: error.message,
    });
  }
};
