export default function GridItem({ label, value }) {
  return (
    <div
      className="
        bg-slate-50
        rounded-2xl
        p-5
      ">
      <p className="text-sm text-slate-500 mb-2">{label}</p>

      <h4
        className="
          font-bold
          text-slate-800
          break-words
        ">
        {value || "-"}
      </h4>
    </div>
  );
}
