import { Bell, CalendarDays } from "lucide-react";

export default function DashboardHeader() {
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="
        relative overflow-hidden
        bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900
        rounded-[30px]
        p-6 md:p-8
        shadow-xl
        border border-white/10
      ">
      {/* BACKGROUND EFFECT */}
      <div
        className="
          absolute top-0 right-0
          w-72 h-72
          bg-indigo-500/20
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute bottom-0 left-0
          w-60 h-60
          bg-blue-500/10
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* LEFT */}
        <div>
          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-full
              bg-white/10 backdrop-blur-md
              border border-white/10
              text-slate-200 text-sm font-medium
              mb-5
            ">
            <CalendarDays size={16} />

            <span className="capitalize">{currentDate}</span>
          </div>

          <h1
            className="
              text-3xl md:text-4xl
              font-black
              text-white
              leading-tight
            ">
            Dashboard Administrateur
          </h1>

          <p
            className="
              text-slate-300
              mt-4
              text-base md:text-lg
              max-w-2xl
            ">
            Suivez les statistiques, gérez les inscriptions et contrôlez
            l’ensemble des activités de votre plateforme en temps réel.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div
          className="
            flex items-center gap-4
            bg-white/10 backdrop-blur-xl
            border border-white/10
            rounded-3xl
            px-5 py-4
            w-full lg:w-auto
          ">
          <div
            className="
              w-14 h-14 rounded-2xl
              bg-gradient-to-br from-indigo-500 to-blue-500
              flex items-center justify-center
              shadow-lg
            ">
            <Bell className="text-white" size={24} />
          </div>

          <div>
            <p className="text-white font-semibold text-lg">
              Centre Administratif
            </p>

            <p className="text-slate-300 text-sm">
              Gestion intelligente de la plateforme
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
