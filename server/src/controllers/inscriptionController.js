import Inscription from "../models/inscriptionModel.js";

/* ================================================= */
/* ================= INSCRIPTION STATS ============= */
/* ================================================= */

export const getInscriptionStats = async (req, res) => {
  try {
    /* ================================================= */
    /* ================= GLOBAL STATUS ================= */
    /* ================================================= */

    const validated = await Inscription.countDocuments({
      status: "validée",
    });

    const pending = await Inscription.countDocuments({
      status: "en attente",
    });

    const rejected = await Inscription.countDocuments({
      status: "rejetée",
    });

    const total = await Inscription.countDocuments();

    /* ================================================= */
    /* ================= PAYMENTS ====================== */
    /* ================================================= */

    const payments = await Inscription.countDocuments({
      paymentValidated: true,
    });

    /* ================================================= */
    /* ================= SECTION STATS ================ */
    /* ================================================= */

    const personalValidated = await Inscription.countDocuments({
      personalValidated: true,
    });

    const formationValidated = await Inscription.countDocuments({
      formationValidated: true,
    });

    const documentsValidated = await Inscription.countDocuments({
      documentsValidated: true,
    });

    /* ================================================= */
    /* ================= RESPONSE ====================== */
    /* ================================================= */

    return res.status(200).json({
      total,

      validated,

      pending,

      rejected,

      payments,

      sections: {
        personalValidated,

        formationValidated,

        documentsValidated,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Erreur serveur",

      error: error.message,
    });
  }
};

/* ================================================= */
/* ================= RECENT INSCRIPTIONS =========== */
/* ================================================= */

export const getRecentInscriptions = async (req, res) => {
  try {
    const inscriptions = await Inscription.find()

      .populate("formation", "title category")

      .sort({
        createdAt: -1,
      })

      .limit(5);

    return res.status(200).json(inscriptions);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message,
    });
  }
};

/* ================================================= */
/* ================= GET INSCRIPTIONS ============== */
/* ================================================= */

export const getInscriptions = async (req, res) => {
  try {
    const inscriptions = await Inscription.find()

      .populate("user", "firstName lastName email avatar")

      .populate("formation", "title category duration level price image")

      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      inscriptions,
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
/* ================= CREATE INSCRIPTION ============ */
/* ================================================= */

export const createInscription = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      sexe,
      birthDate,
      address,
      formation,

      level,
      mode,
      duration,

      paymentMethod,
      paymentPhone,
      paymentReference,
      paymentStatus,

      notes,
    } = req.body;

    /* ================================================= */
    /* ================= VALIDATION ==================== */
    /* ================================================= */

    if (!firstName || !lastName || !email || !phone || !formation) {
      return res.status(400).json({
        message: "Veuillez remplir tous les champs obligatoires",
      });
    }

    /* ================================================= */
    /* ================= CHECK EXIST =================== */
    /* ================================================= */

    const alreadyExists = await Inscription.findOne({
      user: req.user._id,

      formation,
    });

    if (alreadyExists) {
      return res.status(400).json({
        message: "Vous êtes déjà inscrit à cette formation",
      });
    }

    /* ================================================= */
    /* ================= FILES ========================= */
    /* ================================================= */

    const photo =
      req.files?.photo?.[0]?.path?.replace("src", "")?.replace(/\\/g, "/") ||
      "";

    const identityCard =
      req.files?.identityCard?.[0]?.path
        ?.replace("src", "")
        ?.replace(/\\/g, "/") || "";

    const diploma =
      req.files?.diploma?.[0]?.path?.replace("src", "")?.replace(/\\/g, "/") ||
      "";

    const cv =
      req.files?.cv?.[0]?.path?.replace("src", "")?.replace(/\\/g, "/") || "";

    /* ================================================= */
    /* ================= CREATE ======================== */
    /* ================================================= */

    const inscription = await Inscription.create({
      user: req.user._id,

      firstName,

      lastName,

      email,

      phone,

      sexe,

      birthDate,

      address,

      formation,

      level,

      mode,

      duration,

      paymentMethod,

      notes,

      photo,

      identityCard,

      diploma,

      cv,

      paymentMethod,

      paymentPhone,

      paymentReference,

      paymentStatus,
    });

    /* ================================================= */
    /* ================= RESPONSE ====================== */
    /* ================================================= */

    return res.status(201).json({
      message: "Inscription envoyée avec succès",

      inscription,
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
/* ================= UPDATE STATUS ================= */
/* ================================================= */

export const updateInscriptionStatus = async (req, res) => {
  try {
    const { status, section } = req.body;

    const inscription = await Inscription.findById(req.params.id);

    if (!inscription) {
      return res.status(404).json({
        message: "Inscription introuvable",
      });
    }

    /* ================================================= */
    /* ================= GLOBAL DOSSIER ================ */
    /* ================================================= */

    if (!section) {
      inscription.status = status;
    }

    /* ================================================= */
    /* ================= PERSONAL ====================== */
    /* ================================================= */

    if (section === "personal") {
      inscription.personalValidated = status === "validée";
    }

    /* ================================================= */
    /* ================= FORMATION ===================== */
    /* ================================================= */

    if (section === "formation") {
      inscription.formationValidated = status === "validée";
    }

    /* ================================================= */
    /* ================= DOCUMENTS ===================== */
    /* ================================================= */

    if (section === "documents") {
      inscription.documentsValidated = status === "validée";
    }

    /* ================================================= */
    /* ================= PAYMENT ======================= */
    /* ================================================= */

    if (section === "payment") {
      inscription.paymentValidated = status === "validée";

      inscription.paymentStatus = status === "validée" ? "payé" : "échoué";
    }

    await inscription.save();

    return res.status(200).json({
      success: true,

      message: "Statut mis à jour avec succès",

      inscription,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Erreur serveur",

      error: error.message,
    });
  }
};

/* ================================================= */
/* ================= DELETE INSCRIPTION ============ */
/* ================================================= */

export const deleteInscription = async (req, res) => {
  try {
    const inscription = await Inscription.findById(req.params.id);

    if (!inscription) {
      return res.status(404).json({
        message: "Inscription introuvable",
      });
    }

    await inscription.deleteOne();

    return res.status(200).json({
      message: "Inscription supprimée avec succès",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",

      error: error.message,
    });
  }
};

export const getInscriptionById = async (req, res) => {
  try {
    const inscription = await Inscription.findById(req.params.id).populate(
      "formation",
    );

    if (!inscription) {
      return res.status(404).json({
        message: "Inscription introuvable",
      });
    }

    res.status(200).json({
      inscription,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Erreur serveur",
    });
  }
};

export const validateInscription = async (req, res) => {
  try {
    const inscription = await Inscription.findById(req.params.id);

    if (!inscription) {
      return res.status(404).json({
        message: "Inscription introuvable",
      });
    }

    inscription.status = "validée";

    inscription.paymentValidated = true;

    await inscription.save();

    return res.status(200).json({
      message: "Inscription validée avec succès",

      inscription,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Erreur serveur",
    });
  }
};

export const getMyInscriptions = async (req, res) => {
  try {
    /* ================================================= */
    /* ================= FIND USER INSCRIPTIONS ======== */
    /* ================================================= */

    const inscriptions = await Inscription.find({
      user: req.user._id,
    })
      .populate("formation")
      .sort({
        createdAt: -1,
      });

    /* ================================================= */
    /* ================= RESPONSE ====================== */
    /* ================================================= */

    return res.status(200).json({
      success: true,

      inscriptions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: error.message || "Erreur serveur",
    });
  }
};
