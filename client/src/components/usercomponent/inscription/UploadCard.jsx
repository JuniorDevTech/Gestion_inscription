import { Upload, CheckCircle2, FileImage } from "lucide-react";

export default function UploadCard({
  title,
  name,
  file,
  onChange,
  accept = "*",
}) {
  return (
    <label
      className="
        group
        relative overflow-hidden
        border-2 border-dashed
        border-slate-200
        rounded-[28px]
        p-8
        text-center
        hover:border-indigo-400
        hover:bg-indigo-50/50
        transition-all duration-300
        bg-slate-50
        cursor-pointer
        block
      ">
      {/* BACKGROUND */}
      <div
        className="
          absolute -top-10 -right-10
          w-32 h-32
          bg-indigo-100/70
          rounded-full
          blur-3xl
          opacity-0
          group-hover:opacity-100
          transition-all duration-500
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* ICON */}
        <div
          className={`
            w-20 h-20 mx-auto
            rounded-3xl
            flex items-center justify-center
            transition-all duration-300
            ${
              file
                ? `
                  bg-emerald-100
                  text-emerald-600
                `
                : `
                  bg-indigo-100
                  text-indigo-600
                `
            }
          `}>
          {file ? <CheckCircle2 size={34} /> : <Upload size={34} />}
        </div>

        {/* TITLE */}
        <h3
          className="
            mt-6
            text-lg
            font-black
            text-slate-800
          ">
          {title}
        </h3>

        {/* FILE */}
        {file ? (
          <div
            className="
              mt-4
              inline-flex items-center gap-2
              px-4 py-2
              rounded-full
              bg-emerald-100
              text-emerald-700
              text-sm font-semibold
            ">
            <FileImage size={16} />

            <span className="truncate max-w-[180px]">{file.name}</span>
          </div>
        ) : (
          <p
            className="
              text-sm
              text-slate-500
              mt-3
              leading-relaxed
            ">
            Cliquez pour importer votre fichier
          </p>
        )}
      </div>

      {/* INPUT */}
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
}
