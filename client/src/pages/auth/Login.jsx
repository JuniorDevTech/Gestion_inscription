import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import { loginUser } from "../../features/auth/authService";

import Loader from "../../components/common/Loader";

import ErrorMessage from "../../components/common/ErrorMessage";

export default function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  /* ================= REDUX ================= */
  const { loading, error } = useSelector((state) => state.auth);

  /* ================= STATES ================= */
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /* ================= CHECK SESSION ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    const expiration = localStorage.getItem("tokenExpiration");

    if (token && user && expiration) {
      const isExpired = Date.now() > Number(expiration);

      /* SESSION EXPIRED */
      if (isExpired) {
        localStorage.clear();

        return;
      }

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
    }
  }, [navigate]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* VALIDATION */
    if (!formData.email.trim() || !formData.password.trim()) {
      return MySwal.fire({
        icon: "error",

        title: "Erreur",

        text: "Veuillez remplir tous les champs",
      });
    }

    try {
      /* LOGIN */
      const result = await dispatch(loginUser(formData));

      /* LOGIN FAILED */
      if (!result.success) {
        return MySwal.fire({
          icon: "error",

          title: "Connexion échouée",

          text: result.error || "Email ou mot de passe incorrect",
        });
      }

      /* SUCCESS */
      await MySwal.fire({
        icon: "success",

        title: "Connexion réussie",

        text: "Bienvenue sur votre espace personnel",

        timer: 1500,

        showConfirmButton: false,
      });

      /* USER ROLE */
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
    } catch (err) {
      console.error(err);

      MySwal.fire({
        icon: "error",

        title: "Erreur",

        text: "Une erreur inattendue est survenue",
      });
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
      {/* ================= HEADER ================= */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Connexion</h1>

        <p className="text-gray-500 mt-2">Accédez à votre espace personnel</p>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="mb-5">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* ================= LOADER ================= */}
      {loading && <Loader />}

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-600">Email</label>

          <div className="relative mt-2">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ex: user@gmail.com"
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-gray-600">Mot de passe</label>

          <div className="relative mt-2">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* TOGGLE */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* FORGOT PASSWORD */}
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-indigo-600 hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      {/* ================= FOOTER ================= */}
      <p className="text-center text-sm text-gray-500 mt-8">
        Pas encore de compte ?{" "}
        <Link
          to="/register"
          className="text-indigo-600 font-medium hover:underline">
          S’inscrire
        </Link>
      </p>
    </div>
  );
}
