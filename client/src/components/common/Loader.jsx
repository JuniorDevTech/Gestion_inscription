export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        {/* SPINNER */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin" />

        {/* TEXT */}
        <p className="text-gray-500 text-sm font-medium">Chargement...</p>
      </div>
    </div>
  );
}
