import { CheckCircle2 } from "lucide-react";

export default function SuccessHero({ inscription }) {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-[32px]
        bg-gradient-to-r
        from-emerald-500
        to-green-600
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
          <CheckCircle2 size={42} />
        </div>

        <h1 className="mt-6 text-3xl md:text-5xl font-black">
          Inscription envoyée avec succès
        </h1>

        <p className="mt-4 text-emerald-100 max-w-3xl text-lg">
          Votre inscription à la formation{" "}
          <span className="font-bold text-white">
            {inscription?.formation?.title}
          </span>{" "}
          a été transmise à l’administration.
        </p>
      </div>
    </div>
  );
}
