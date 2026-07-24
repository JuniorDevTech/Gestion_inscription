import { GraduationCap } from "lucide-react";

export default function InscriptionHeader() {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-[32px]
        bg-gradient-to-r from-indigo-600 to-blue-600
        p-8 md:p-10
        text-white
      ">
      <div className="relative z-10">
        <div
          className="
            w-16 h-16
            rounded-2xl
            bg-white/10
            backdrop-blur-xl
            flex items-center justify-center
          ">
          <GraduationCap size={34} />
        </div>

        <h1 className="mt-6 text-3xl md:text-4xl font-black">
          Inscription à une formation
        </h1>

        <p className="mt-3 text-indigo-100 max-w-2xl">
          Complétez votre dossier d’inscription afin de rejoindre la formation
          de votre choix.
        </p>
      </div>
    </div>
  );
}
