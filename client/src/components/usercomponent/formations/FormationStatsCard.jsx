export default function FormationStatsCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <div
      className="
        bg-white
        rounded-[28px]
        border border-slate-200
        shadow-sm
        p-6
      ">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 font-medium">{title}</p>

          <h3 className="mt-3 text-3xl font-black text-slate-800">{value}</h3>
        </div>

        <div
          className={`
            w-14 h-14 rounded-2xl
            flex items-center justify-center
            text-white
            ${color}
          `}>
          <Icon size={26} />
        </div>
      </div>
    </div>
  );
}
