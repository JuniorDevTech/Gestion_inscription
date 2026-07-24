import {
  GraduationCap,
  ClipboardCheck,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  LifeBuoy,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <GraduationCap size={34} />,
      title: "Formations Certifiées",
      description:
        "Des programmes conçus par des experts pour répondre aux exigences du marché professionnel.",
    },
    {
      icon: <ClipboardCheck size={34} />,
      title: "Inscription Simplifiée",
      description:
        "Un processus rapide et intuitif pour finaliser votre inscription en quelques minutes.",
    },
    {
      icon: <CreditCard size={34} />,
      title: "Paiement Flexible",
      description:
        "Profitez de plusieurs options de paiement adaptées à vos besoins et votre budget.",
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "Sécurité Garantie",
      description:
        "Toutes vos données personnelles et transactions sont entièrement sécurisées.",
    },
    {
      icon: <TrendingUp size={34} />,
      title: "Suivi Intelligent",
      description:
        "Consultez l’évolution de vos inscriptions et votre progression en temps réel.",
    },
    {
      icon: <LifeBuoy size={34} />,
      title: "Accompagnement Dédié",
      description:
        "Notre équipe reste disponible pour vous assister à chaque étape de votre parcours.",
    },
  ];

  return (
    <section className="relative bg-gray-50 py-28 overflow-hidden">
      {/* BACKGROUND EFFECT */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-40" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full text-sm font-semibold mb-6">
            NOS AVANTAGES
          </span>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Une plateforme pensée pour
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              simplifier vos inscriptions
            </span>
          </h2>

          <p className="text-xl text-gray-500 leading-relaxed">
            Découvrez une expérience moderne, rapide et sécurisée pour gérer vos
            formations et vos inscriptions en ligne.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-300 overflow-hidden">
              {/* HOVER EFFECT */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/5 group-hover:to-purple-500/10 transition duration-300" />

              {/* ICON */}
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg mb-8">
                {feature.icon}
              </div>

              {/* CONTENT */}
              <div className="relative">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-500 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>

              {/* BORDER EFFECT */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
