import { useState } from "react";

import { BadgeCheck, Eye, X, FileText } from "lucide-react";

export default function DocumentsGrid({ inscription }) {
  /* ================================================= */
  /* ================= PREVIEW ======================= */
  /* ================================================= */

  const [selectedDoc, setSelectedDoc] = useState(null);

  /* ================================================= */
  /* ================= DOCUMENTS ===================== */
  /* ================================================= */

  const docs = [
    {
      label: "Photo d'identité",

      value: inscription?.photo,
    },

    {
      label: "Carte d'identité",

      value: inscription?.identityCard,
    },

    {
      label: "Diplôme",

      value: inscription?.diploma,
    },

    {
      label: "CV",

      value: inscription?.cv,
    },
  ];

  /* ================================================= */
  /* ================= FILE TYPE ===================== */
  /* ================================================= */

  const isImage = (file) => {
    return (
      file?.endsWith(".png") ||
      file?.endsWith(".jpg") ||
      file?.endsWith(".jpeg") ||
      file?.endsWith(".webp")
    );
  };

  return (
    <>
      {/* ================================================= */}
      {/* ================= GRID ========================== */}
      {/* ================================================= */}

      {docs.map((doc) => {
        const fileUrl = `http://localhost:5000${doc.value}`;

        return (
          <button
            key={doc.label}
            onClick={() =>
              setSelectedDoc({
                ...doc,

                url: fileUrl,
              })
            }
            className="
              w-full
              flex items-center justify-between
              bg-slate-50
              border border-slate-200
              rounded-2xl
              p-5
              hover:border-indigo-300
              hover:bg-indigo-50
              transition-all duration-300
            ">
            {/* LEFT */}
            <div className="text-left">
              <p
                className="
                  font-bold
                  text-slate-800
                ">
                {doc.label}
              </p>

              <p
                className="
                  text-sm
                  text-slate-500
                  mt-1
                ">
                Cliquer pour voir le document
              </p>
            </div>

            {/* RIGHT */}
            <div
              className="
                flex items-center gap-3
              ">
              <BadgeCheck
                className="
                  text-emerald-600
                "
                size={22}
              />

              <div
                className="
                  w-10 h-10
                  rounded-xl
                  bg-indigo-100
                  text-indigo-600
                  flex items-center justify-center
                ">
                <Eye size={18} />
              </div>
            </div>
          </button>
        );
      })}

      {/* ================================================= */}
      {/* ================= MODAL ========================= */}
      {/* ================================================= */}

      {selectedDoc && (
        <div
          className="
            fixed inset-0
            z-[999]
            bg-black/70
            backdrop-blur-md
            flex items-center justify-center
            p-4
          ">
          {/* CONTAINER */}
          <div
            className="
              relative
              w-full
              max-w-5xl
              h-[90vh]
              bg-white
              rounded-[32px]
              overflow-hidden
              shadow-2xl
              flex flex-col
            ">
            {/* HEADER */}
            <div
              className="
                flex items-center justify-between
                px-6 py-5
                border-b border-slate-200
                bg-white
              ">
              <div>
                <h2
                  className="
                    text-2xl
                    font-black
                    text-slate-800
                  ">
                  {selectedDoc.label}
                </h2>

                <p
                  className="
                    text-slate-500
                    mt-1
                  ">
                  Prévisualisation du document
                </p>
              </div>

              {/* CLOSE */}
              <button
                onClick={() => setSelectedDoc(null)}
                className="
                  w-12 h-12
                  rounded-2xl
                  bg-slate-100
                  hover:bg-red-100
                  text-slate-600
                  hover:text-red-600
                  flex items-center justify-center
                  transition
                ">
                <X size={22} />
              </button>
            </div>

            {/* BODY */}
            <div
              className="
                flex-1
                overflow-auto
                bg-slate-100
                flex items-center justify-center
                p-6
              ">
              {/* IMAGE */}
              {isImage(selectedDoc.url) ? (
                <img
                  src={selectedDoc.url}
                  alt={selectedDoc.label}
                  className="
                    max-w-full
                    max-h-full
                    rounded-3xl
                    shadow-2xl
                    object-contain
                  "
                />
              ) : (
                /* PDF */
                <iframe
                  src={selectedDoc.url}
                  title={selectedDoc.label}
                  className="
                    w-full
                    h-full
                    rounded-2xl
                    bg-white
                  "
                />
              )}
            </div>

            {/* FOOTER */}
            <div
              className="
                border-t border-slate-200
                p-5
                bg-white
              ">
              <a
                href={selectedDoc.url}
                target="_blank"
                rel="noreferrer"
                className="
                  w-full
                  flex items-center justify-center gap-3
                  py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-blue-600
                  text-white
                  font-bold
                  hover:scale-[1.01]
                  transition-all duration-300
                ">
                <FileText size={20} />
                Ouvrir dans un nouvel onglet
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
