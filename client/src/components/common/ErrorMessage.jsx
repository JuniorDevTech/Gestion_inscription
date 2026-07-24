import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message = "Une erreur est survenue" }) {
  return (
    <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
      <AlertCircle size={18} className="text-red-600" />

      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
