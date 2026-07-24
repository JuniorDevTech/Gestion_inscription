import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, GraduationCap, Users } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-900" />

      {/* BLUR EFFECTS */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-500/20 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-[40px] p-12 md:p-20 overflow-hidden shadow-2xl">
          {/* TOP BADGE */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-5 py-2 rounded-full mb-8">
            <ShieldCheck size={18} className="text-indigo-300" />

            <span className="text-sm text-gray-200 tracking-wide">
              Plateforme sécurisée et accessible 24h/24
            </span>
          </div>

          {/* TITLE */}
          <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-8 max-w-4xl">
            Commencez votre parcours
            <span className="block bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              dès aujourd’hui
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mb-12">
            Rejoignez une communauté d’étudiants et de professionnels qui
            utilisent notre plateforme pour accéder à des formations modernes,
            certifiantes et adaptées au marché actuel.
          </p>

          {/* STATS */}
          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <Users className="text-indigo-300 mb-4" size={30} />

              <h3 className="text-3xl font-bold text-white mb-2">+5 000</h3>

              <p className="text-gray-400">Étudiants inscrits</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <GraduationCap className="text-purple-300 mb-4" size={30} />

              <h3 className="text-3xl font-bold text-white mb-2">120+</h3>

              <p className="text-gray-400">Formations disponibles</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <ShieldCheck className="text-green-300 mb-4" size={30} />

              <h3 className="text-3xl font-bold text-white mb-2">100%</h3>

              <p className="text-gray-400">Données sécurisées</p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-5">
            <Link
              to="/register"
              className="inline-flex items-center gap-3 bg-white text-indigo-700 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:scale-105 hover:bg-gray-100 transition duration-300">
              Commencer gratuitement
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-3 border border-white/20 bg-white/5 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-indigo-700 transition duration-300">
              Se connecter
            </Link>
          </div>

          {/* DECORATION */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}
