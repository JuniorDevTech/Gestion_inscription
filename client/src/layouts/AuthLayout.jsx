import { Outlet, Link } from "react-router-dom";
import { GraduationCap, Home } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl top-10 left-10" />
        <div className="absolute w-96 h-96 bg-black/10 rounded-full blur-3xl bottom-10 right-10" />

        <div className="relative text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/20 flex items-center justify-center">
            <GraduationCap size={40} />
          </div>

          <h1 className="text-4xl font-bold mb-6">
            Plateforme des Inscriptions
          </h1>

          <p className="text-lg text-white/80 leading-relaxed">
            Gérez vos inscriptions, formations et paiements en toute simplicité
            sur une plateforme moderne et sécurisée.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-6 relative">
        {/* HOME BUTTON */}
        <Link
          to="/"
          className="absolute top-6 right-6 flex items-center gap-2 bg-white border shadow-sm px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition">
          <Home size={18} />
          Accueil
        </Link>

        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
