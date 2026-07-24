import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const socials = [FaFacebook, FaTwitter, FaLinkedin, FaInstagram];

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      {/* BACKGROUND EFFECT */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-4 gap-14 pb-16 border-b border-white/10">
          {/* BRAND */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <GraduationCap size={30} className="text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold">INSCRIPTIONS</h2>

                <p className="text-sm text-gray-400">Plateforme académique</p>
              </div>
            </Link>

            <p className="text-gray-400 leading-relaxed text-lg mb-8">
              Une plateforme moderne et sécurisée pour gérer facilement vos
              inscriptions, formations et parcours académiques en ligne.
            </p>

            {/* SOCIALS */}
            <div className="flex items-center gap-4">
              {socials.map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-xl font-bold mb-8">Navigation</h3>

            <ul className="space-y-4">
              {["Accueil", "Formations", "À propos", "Contact"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      to="/"
                      className="text-gray-400 hover:text-white transition">
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* INFORMATIONS */}
          <div>
            <h3 className="text-xl font-bold mb-8">Informations</h3>

            <ul className="space-y-5 text-gray-400">
              <li>Formations certifiantes professionnelles</li>

              <li>Support disponible 24h/24 et 7j/7</li>

              <li>Paiement sécurisé et suivi en temps réel</li>

              <li>Accès plateforme sur mobile et desktop</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-xl font-bold mb-8">Contact</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>

                  <p className="text-gray-300">contact@plateforme.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Téléphone</p>

                  <p className="text-gray-300">+33 1 23 45 67 89</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Adresse</p>

                  <p className="text-gray-300">Paris, France</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-center md:text-left">
            © 2026 INSCRIPTIONS. Tous droits réservés.
          </p>

          <div className="flex items-center gap-6 text-gray-500">
            <Link to="/" className="hover:text-white transition">
              Politique de confidentialité
            </Link>

            <Link to="/" className="hover:text-white transition">
              Conditions d’utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
