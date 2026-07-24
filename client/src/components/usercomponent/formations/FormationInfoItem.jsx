export default function FormationInfoItem({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="
          w-10 h-10 rounded-xl
          bg-slate-100
          flex items-center justify-center
          text-slate-600
        ">
        <Icon size={18} />
      </div>

      <p className="font-medium text-slate-700">{text}</p>
    </div>
  );
}
