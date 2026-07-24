import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

import { verifyOTP } from "../../features/auth/authService";

export default function VerifyEmail() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  /* EMAIL FROM REGISTER */
  const email = location.state?.email;

  /* OTP STATE */
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  /* ================================================= */
  /* ================= VERIFY OTP ================= */
  /* ================================================= */

  const handleVerify = async (e) => {
    e.preventDefault();

    /* VALIDATION */
    if (!otp.trim()) {
      return Swal.fire({
        icon: "error",

        title: "Erreur",

        text: "Veuillez entrer le code OTP",
      });
    }

    try {
      setLoading(true);

      /* VERIFY OTP */
      const result = await dispatch(
        verifyOTP({
          email,
          otp,
        }),
      );

      /* FAILED */
      if (!result.success) {
        return Swal.fire({
          icon: "error",

          title: "Erreur",

          text: result.error,
        });
      }

      /* SUCCESS */
      await Swal.fire({
        icon: "success",

        title: "Email vérifié",

        text: "Votre compte a été activé avec succès",

        timer: 1500,

        showConfirmButton: false,
      });

      /* USER */
      const user = result.data.user;

      /* ADMIN */
      if (user.role === "admin") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else {

      /* USER */
        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "Erreur",

        text: error.message || "Erreur serveur",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================================================= */
  /* ================= RESEND OTP ================= */
  /* ================================================= */

  const handleResend = async () => {
    try {
      setLoading(true);

      /* API */
      const response = await fetch(
        "http://localhost:5000/api/auth/resend-otp",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      Swal.fire({
        icon: "success",

        title: "Code renvoyé",

        text: "Un nouveau code OTP a été envoyé",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "Erreur",

        text: error.message || "Impossible de renvoyer le code",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================================================= */
  /* ================= NO EMAIL ================= */
  /* ================================================= */

  if (!email) {
    navigate("/register");

    return null;
  }

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Vérification Email</h1>

        <p className="text-gray-500 mt-3">Un code OTP a été envoyé à :</p>

        <p className="font-semibold text-indigo-600 mt-1">{email}</p>
      </div>

      {/* FORM */}
      <form onSubmit={handleVerify} className="space-y-5">
        <input
          type="text"
          placeholder="Entrer le code OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}
          className="w-full border border-gray-300 p-4 rounded-xl text-center text-2xl tracking-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
          {loading ? "Vérification..." : "Vérifier"}
        </button>
      </form>

      {/* RESEND */}
      <div className="mt-6 text-center">
        <button
          onClick={handleResend}
          disabled={loading}
          className="text-indigo-600 hover:underline text-sm">
          Renvoyer le code
        </button>
      </div>
    </div>
  );
}
