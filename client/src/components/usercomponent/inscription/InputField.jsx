export default function InputField({
  icon: Icon,
  label,
  placeholder,
  type = "text",
  options = [],
  name,
  value,
  onChange,
  disabled = false,
}) {
  return (
    <div>
      {/* LABEL */}
      <label className="text-sm font-semibold text-slate-700 mb-3 block">
        {label}
      </label>

      {/* FIELD */}
      <div
        className={`
          flex items-center gap-3
          border border-slate-200
          rounded-2xl
          px-4 py-4
          transition-all duration-300
          focus-within:ring-2
          focus-within:ring-indigo-500
          focus-within:border-indigo-500

          ${
            disabled
              ? `
                bg-slate-100
                opacity-80
                cursor-not-allowed
              `
              : `
                bg-slate-50
              `
          }
        `}>
        {/* ICON */}
        <Icon size={20} className="text-slate-400 shrink-0" />

        {/* SELECT */}
        {type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="
              w-full
              bg-transparent
              outline-none
              text-slate-700
              disabled:cursor-not-allowed
            ">
            <option value="">Sélectionner...</option>

            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          /* INPUT */
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className="
              w-full
              bg-transparent
              outline-none
              text-slate-700
              placeholder:text-slate-400
              disabled:cursor-not-allowed
            "
          />
        )}
      </div>
    </div>
  );
}
