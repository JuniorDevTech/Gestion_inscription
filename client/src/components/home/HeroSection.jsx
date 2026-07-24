import { Link } from "react-router-dom";
import { GraduationCap, ShieldCheck, Users, BadgeCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-900 text-white">
      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/30 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
              <BadgeCheck size={18} className="text-indigo-300" />

              <span className="text-sm tracking-wide text-gray-200">
                Plateforme moderne de gestion académique
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8">
              Simplifiez vos
              <span className="block bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                inscriptions en ligne
              </span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
              Gérez vos inscriptions, documents administratifs, paiements et
              suivi de formation depuis une seule plateforme sécurisée et
              intuitive.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5 mb-14">
              <Link
                to="/register"
                className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:scale-105 hover:bg-gray-100 transition duration-300">
                Commencer maintenant
              </Link>

              <Link
                to="/login"
                className="border border-white/30 bg-white/5 backdrop-blur-md px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-indigo-700 transition duration-300">
                Se connecter
              </Link>
            </div>

            {/* STATS */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <Users className="text-indigo-300 mb-3" size={28} />

                <h3 className="text-3xl font-bold">+5K</h3>

                <p className="text-gray-300 text-sm">Étudiants inscrits</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <GraduationCap className="text-purple-300 mb-3" size={28} />

                <h3 className="text-3xl font-bold">120+</h3>

                <p className="text-gray-300 text-sm">Formations disponibles</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <ShieldCheck className="text-green-300 mb-3" size={28} />

                <h3 className="text-3xl font-bold">100%</h3>

                <p className="text-gray-300 text-sm">Plateforme sécurisée</p>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative hidden lg:flex justify-center">
            <div className="relative w-[500px] h-[500px]">
              {/* MAIN CARD */}
              <div className="absolute inset-0 bg-white/10 border border-white/10 rounded-[40px] backdrop-blur-xl shadow-2xl p-10">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <p className="text-gray-300 text-sm">Tableau de bord</p>

                    <h2 className="text-3xl font-bold">Inscriptions</h2>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <GraduationCap size={32} />
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
                    <p className="text-gray-300 text-sm mb-2">
                      Formation sélectionnée
                    </p>

                    <h3 className="text-xl font-semibold">
                      Développement Fullstack
                    </h3>
                  </div>

                  <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-300">Progression</span>

                      <span className="font-semibold">75%</span>
                    </div>

                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 shadow-xl">
                    <p className="text-sm text-indigo-100 mb-2">
                      Paiement sécurisé
                    </p>

                    <h3 className="text-2xl font-bold">
                      Validation instantanée
                    </h3>
                  </div>
                </div>
              </div>

              {/* FLOATING CARD */}
              <div className="absolute -bottom-8 -left-10 bg-white text-gray-900 rounded-2xl shadow-2xl p-5 w-64">
                <p className="text-sm text-gray-500 mb-2">
                  Nouvelle inscription
                </p>

                <h3 className="font-bold text-lg mb-3">Data Science & IA</h3>

                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-semibold">
                    Confirmée
                  </span>

                  <span className="text-sm text-gray-400">Aujourd'hui</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
