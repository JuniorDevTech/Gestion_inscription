import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Mot de passe oublié
        </h1>

        <p className="text-gray-500 mt-2">
          Entrez votre email pour recevoir un lien de réinitialisation
        </p>
      </div>

      {/* FORM */}
      <form className="space-y-6">
        {/* EMAIL */}
        <div>
          <label className="text-sm text-gray-600">Email</label>

          <div className="relative mt-2">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type="email"
              placeholder="ex: user@gmail.com"
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
          Envoyer le lien
        </button>
      </form>

      {/* FOOTER */}
      <p className="text-center text-sm text-gray-500 mt-8">
        Retour à{" "}
        <Link
          to="/login"
          className="text-indigo-600 font-medium hover:underline">
          la connexion
        </Link>
      </p>
    </div>
  );
}
