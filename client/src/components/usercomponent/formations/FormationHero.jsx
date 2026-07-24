import { GraduationCap } from "lucide-react";

export default function FormationHero() {
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
            w-20 h-20
            rounded-3xl
            bg-white/10
            backdrop-blur-xl
            flex items-center justify-center
          ">
          <GraduationCap size={40} />
        </div>

        <h1 className="mt-6 text-4xl md:text-5xl font-black">
          Nos formations professionnelles
        </h1>

        <p className="mt-4 text-indigo-100 max-w-3xl text-lg">
          Développez vos compétences avec des formations modernes adaptées au
          marché.
        </p>
      </div>
    </div>
  );
}
