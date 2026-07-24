import Inscription from "../models/inscriptionModel.js";
import User from "../models/userModel.js";
import Payment from "../models/paymentModel.js";

/* ================================================= */
/* ================= DASHBOARD STATS =============== */
/* ================================================= */

export const getDashboardStats = async (req, res) => {
  try {
    /* TOTAL */
    const total = await Inscription.countDocuments();

    /* VALIDATED */
    const validated = await Inscription.countDocuments({
      personalValidated: true,

      formationValidated: true,

      documentsValidated: true,

      paymentValidated: true,
    });

    /* PENDING */
    const pending = await Inscription.countDocuments({
      $or: [
        {
          personalValidated: false,
        },

        {
          formationValidated: false,
        },

        {
          documentsValidated: false,
        },

        {
          paymentValidated: false,
        },
      ],
    });

    /* REJECTED */
    const rejected = await Inscription.countDocuments({
      status: "rejetée",
    });

    /* PAYMENTS */
    const payments = await Inscription.countDocuments({
      paymentValidated: true,
    });

    /* RESPONSE */
    return res.status(200).json({
      totalInscriptions: total,

      validated,

      pending,

      rejected,

      payments,
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
export const getFormationStats = async (req, res) => {
  try {
    const formations = await Inscription.aggregate([
      /* GROUP */
      {
        $group: {
          _id: "$formation",

          value: {
            $sum: 1,
          },
        },
      },

      /* LOOKUP FORMATION */
      {
        $lookup: {
          from: "formations",

          localField: "_id",

          foreignField: "_id",

          as: "formation",
        },
      },

      /* UNWIND */
      {
        $unwind: "$formation",
      },

      /* FORMAT */
      {
        $project: {
          _id: 0,

          name: "$formation.title",

          value: 1,
        },
      },

      /* SORT */
      {
        $sort: {
          value: -1,
        },
      },
    ]);

    return res.status(200).json(formations);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",

      error: error.message,
    });
  }
};

export const getPaymentStats = async (req, res) => {
  try {
    const payments = await Payment.aggregate([
      {
        $group: {
          _id: {
            $month: "$createdAt",
          },

          payments: {
            $sum: "$amount",
          },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const months = [
      "Jan",
      "Fév",
      "Mars",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Août",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ];

    const formattedData = payments.map((item) => ({
      month: months[item._id - 1],

      payments: item.payments,
    }));

    return res.status(200).json({
      growth: 0,

      data: formattedData,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",

      error: error.message,
    });
  }
};
export const createPayment = async (req, res) => {
  try {
    const { inscriptionId, amount, paymentMethod } = req.body;

    const payment = await Payment.create({
      user: req.user.id,

      inscription: inscriptionId,

      amount,

      paymentMethod,

      status: "payé",
    });

    return res.status(201).json({
      message: "Paiement effectué avec succès",

      payment,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

export const validatePayment = async (req, res) => {
  try {
    const inscription = await Inscription.findById(req.params.id).populate(
      "formation",
    );

    inscription.paymentValidated = true;

    inscription.paymentStatus = "payé";

    await inscription.save();

    /* CREATE PAYMENT */
    await Payment.create({
      user: inscription.user,

      inscription: inscription._id,

      amount: inscription.formation.price,

      paymentMethod:
        inscription.paymentMethod === "MTN Money"
          ? "mtn_money"
          : inscription.paymentMethod === "Orange Money"
            ? "orange_money"
            : inscription.paymentMethod === "Moov Money"
              ? "moov_money"
              : inscription.paymentMethod === "Wave"
                ? "wave"
                : "cash",

      status: "payé",

      transactionId: `PAY-${Date.now()}`,
    });

    return res.status(200).json({
      message: "Paiement validé",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};
