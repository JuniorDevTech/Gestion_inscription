import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-indigo-600 mb-4">404</h1>

        <h2 className="text-4xl font-semibold text-gray-800 mb-6">
          Page introuvable
        </h2>

        <p className="text-gray-500 text-lg mb-10 max-w-xl">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <Link
          to="/"
          className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
