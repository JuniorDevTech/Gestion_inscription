import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

import { useSelector } from "react-redux";

import InputField from "./InputField";

export default function PersonalInfoSection({ formData, handleChange }) {
  /* ================================================= */
  /* ================= USER ========================== */
  /* ================================================= */

  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        rounded-[32px]
        border border-slate-200
        shadow-sm
        p-6 md:p-8
      ">
      {/* BACKGROUND */}
      <div
        className="
          absolute -top-20 -right-20
          w-72 h-72
          bg-blue-100/60
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HEADER */}
        <div className="flex items-start gap-4 mb-10">
          {/* ICON */}
          <div
            className="
              w-16 h-16
              rounded-3xl
              bg-gradient-to-br
              from-blue-500
              to-indigo-600
              text-white
              flex items-center justify-center
              shadow-lg
              shadow-blue-200
              shrink-0
            ">
            <User size={30} />
          </div>

          {/* TEXT */}
          <div>
            <div
              className="
                inline-flex items-center gap-2
                px-4 py-2
                rounded-full
                bg-blue-50
                border border-blue-100
                text-blue-700
                text-sm font-semibold
                mb-4
              ">
              Informations utilisateur
            </div>

            <h2
              className="
                text-3xl
                font-black
                text-slate-800
              ">
              Informations personnelles
            </h2>

            <p
              className="
                text-slate-500
                mt-3
                max-w-2xl
                leading-relaxed
              ">
              Complétez vos informations personnelles afin de finaliser votre
              dossier d’inscription.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FIRST NAME */}
          <InputField
            icon={User}
            label="Nom"
            name="firstName"
            value={formData?.firstName || user?.firstName || ""}
            onChange={handleChange}
            placeholder="Votre nom"
          />

          {/* LAST NAME */}
          <InputField
            icon={User}
            label="Prénom"
            name="lastName"
            value={formData?.lastName || user?.lastName || ""}
            onChange={handleChange}
            placeholder="Votre prénom"
          />

          {/* EMAIL */}
          <InputField
            icon={Mail}
            label="Adresse email"
            name="email"
            value={user?.email || formData?.email || ""}
            onChange={handleChange}
            placeholder="email@example.com"
            type="email"
            disabled
          />

          {/* PHONE */}
          <InputField
            icon={Phone}
            label="Téléphone"
            name="phone"
            value={formData?.phone || ""}
            onChange={handleChange}
            placeholder="+225 07 00 00 00 00"
          />

          {/* SEXE */}
          <InputField
            icon={User}
            label="Sexe"
            name="sexe"
            value={formData?.sexe || ""}
            onChange={handleChange}
            type="select"
            options={[
              {
                value: "homme",
                label: "Homme",
              },

              {
                value: "femme",
                label: "Femme",
              },

              {
                value: "autre",
                label: "Autre",
              },
            ]}
          />

          {/* DATE */}
          <InputField
            icon={Calendar}
            label="Date de naissance"
            name="birthDate"
            value={formData?.birthDate || ""}
            onChange={handleChange}
            type="date"
          />

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <InputField
              icon={MapPin}
              label="Adresse"
              name="address"
              value={formData?.address || ""}
              onChange={handleChange}
              placeholder="Votre adresse complète"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
