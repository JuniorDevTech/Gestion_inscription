export default function PaymentMethod({ name, value, formData, handleChange }) {
  const active = formData?.paymentMethod === value;

  return (
    <label
      className={`
        relative overflow-hidden
        rounded-3xl
        p-6
        cursor-pointer
        transition-all duration-300
        border-2

        ${
          active
            ? `
              border-indigo-500
              bg-indigo-50
              shadow-lg shadow-indigo-100
            `
            : `
              border-slate-200
              hover:border-indigo-300
              bg-white
            `
        }
      `}>
      {/* RADIO */}
      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={active}
        onChange={handleChange}
        className="hidden"
      />

      {/* CONTENT */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-black text-slate-800 text-lg">{name}</p>

          <p className="text-sm text-slate-500 mt-1">Paiement mobile simulé</p>
        </div>

        {/* CHECK */}
        <div
          className={`
            w-6 h-6 rounded-full border-2

            ${
              active
                ? `
                  border-indigo-600
                  bg-indigo-600
                `
                : `
                  border-slate-300
                `
            }
          `}
        />
      </div>
    </label>
  );
}
