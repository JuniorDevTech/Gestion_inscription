export default function SelectField({ label, options }) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700 mb-3 block">
        {label}
      </label>

      <select
        className="
          w-full
          border border-slate-200
          rounded-2xl
          px-4 py-4
          bg-slate-50
          outline-none
          focus:ring-2
          focus:ring-indigo-500
        ">
        <option>Choisir...</option>

        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
}
