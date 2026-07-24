import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ActionButtons({ inscription }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center gap-3">
      {/* VIEW */}
      <button
        onClick={() => navigate(`/admin/inscriptions/${inscription._id}`)}
        className="
          flex items-center justify-center
          w-11 h-11 rounded-2xl
          bg-blue-50 border border-blue-100
          text-blue-600
          hover:bg-blue-600 hover:text-white
          hover:shadow-lg hover:shadow-blue-200
          transition-all duration-300
        ">
        <Eye size={20} />
      </button>
    </div>
  );
}
