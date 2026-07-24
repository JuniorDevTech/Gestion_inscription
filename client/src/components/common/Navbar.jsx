import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-105 transition">
            <GraduationCap className="text-white" size={26} />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              INSCRIPTIONS
            </span>

            <span className="text-xs tracking-wide text-gray-400 uppercase">
              Plateforme de Formation
            </span>
          </div>
        </Link>

        {/* LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-indigo-500 transition">
            Accueil
          </Link>

          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-indigo-500 transition">
            Connexion
          </Link>

          <Link
            to="/register"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 font-semibold">
            Inscription
          </Link>
        </nav>
      </div>
    </header>
  );
}
