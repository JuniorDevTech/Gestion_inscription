import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../features/auth/authService";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import Loader from "../../components/common/Loader";

import ErrorMessage from "../../components/common/ErrorMessage";

export default function Register() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  /* FORM STATE */
  const [formData, setFormData] = useState({
    firstName: "",

    lastName: "",

    email: "",

    password: "",

    confirmPassword: "",
  });

  /* PASSWORD TOGGLE */
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  /* HANDLE CHANGE */
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const MySwal = withReactContent(Swal);

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* REQUIRED FIELDS */
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      return MySwal.fire({
        icon: "error",

        title: "Erreur",

        text: "Veuillez remplir tous les champs",
      });
    }

    /* PASSWORD LENGTH */
    if (formData.password.length < 6) {
      return MySwal.fire({
        icon: "error",

        title: "Erreur",

        text: "Le mot de passe doit contenir au moins 6 caractères",
      });
    }

    /* PASSWORD CHECK */
    if (formData.password !== formData.confirmPassword) {
      return MySwal.fire({
        icon: "error",

        title: "Erreur",

        text: "Les mots de passe ne correspondent pas",
      });
    }

    try {
      /* REGISTER */
      const response = await dispatch(
        registerUser({
          firstName: formData.firstName,

          lastName: formData.lastName,

          email: formData.email,

          password: formData.password,
        }),
      );

      /* CHECK ERROR */
      if (!response.success) {
        throw new Error(response.error);
      }

      /* SUCCESS */
      await MySwal.fire({
        icon: "success",

        title: "Code OTP envoyé",

        text: "Un code OTP a été envoyé à votre adresse email",

        confirmButtonText: "Vérifier mon email",
      });

      /* REDIRECT */
      navigate("/verify-email", {
        replace: true,

        state: {
          email: formData.email,
        },
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",

        title: "Erreur",

        text: err?.message || "Erreur lors de l'inscription",
      });
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Inscription</h1>

        <p className="text-gray-500 mt-2">Créez votre compte pour commencer</p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* LOADER */}
      {loading && <Loader />}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* FIRST NAME */}
        <Input
          placeholder="Nom"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        {/* LAST NAME */}
        <Input
          placeholder="Prénom"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        {/* EMAIL */}
        <Input
          icon={Mail}
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <PasswordInput
          placeholder="Mot de passe"
          name="password"
          value={formData.password}
          onChange={handleChange}
          show={showPassword}
          setShow={setShowPassword}
        />

        {/* CONFIRM PASSWORD */}
        <PasswordInput
          placeholder="Confirmer mot de passe"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          show={showConfirm}
          setShow={setShowConfirm}
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
          {loading ? "Chargement..." : "Créer le compte"}
        </button>
      </form>

      {/* FOOTER */}
      <p className="text-center text-sm text-gray-500 mt-8">
        Déjà un compte ?{" "}
        <Link
          to="/login"
          className="text-indigo-600 font-medium hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
}

/* INPUT */
function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-3 text-gray-400" size={18} />
      )}

      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

/* PASSWORD */
function PasswordInput({ placeholder, show, setShow, ...props }) {
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        {...props}
        className="w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
