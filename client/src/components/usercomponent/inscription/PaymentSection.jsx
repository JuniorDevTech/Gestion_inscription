/* eslint-disable react-hooks/purity */
import { CreditCard, ShieldCheck, Smartphone } from "lucide-react";

import PaymentMethod from "./PaymentMethod";

export default function PaymentSection({ formData, handleChange }) {
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
          bg-amber-100/60
          rounded-full
          blur-3xl
        "
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HEADER */}
        <div className="flex items-start gap-4 mb-10">
          <div
            className="
              w-16 h-16
              rounded-3xl
              bg-gradient-to-br
              from-amber-400
              to-orange-500
              text-white
              flex items-center justify-center
              shadow-lg
            ">
            <CreditCard size={30} />
          </div>

          <div>
            <div
              className="
                inline-flex items-center gap-2
                px-4 py-2
                rounded-full
                bg-amber-50
                border border-amber-100
                text-amber-700
                text-sm font-semibold
                mb-4
              ">
              Paiement sécurisé
            </div>

            <h2 className="text-3xl font-black text-slate-800">
              Paiement des frais
            </h2>

            <p className="text-slate-500 mt-3 max-w-2xl leading-relaxed">
              Sélectionnez votre méthode de paiement pour finaliser votre
              inscription.
            </p>
          </div>
        </div>

        {/* METHODS */}
        <div className="grid md:grid-cols-3 gap-5">
          <PaymentMethod
            name="Orange Money"
            value="Orange Money"
            formData={formData}
            handleChange={handleChange}
          />

          <PaymentMethod
            name="MTN Money"
            value="MTN Money"
            formData={formData}
            handleChange={handleChange}
          />

          <PaymentMethod
            name="Wave"
            value="Wave"
            formData={formData}
            handleChange={handleChange}
          />
        </div>

        {/* PAYMENT INFOS */}
        <div
          className="
            mt-8
            grid grid-cols-1 md:grid-cols-2
            gap-6
          ">
          {/* PHONE */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-3 block">
              Numéro de paiement
            </label>

            <div
              className="
                flex items-center gap-3
                border border-slate-200
                rounded-2xl
                px-4 py-4
                bg-slate-50
                focus-within:ring-2
                focus-within:ring-amber-500
              ">
              <Smartphone size={20} className="text-slate-400" />

              <input
                type="text"
                name="paymentPhone"
                value={formData?.paymentPhone || ""}
                onChange={handleChange}
                placeholder="+225 07 00 00 00 00"
                className="
                  w-full
                  bg-transparent
                  outline-none
                "
              />
            </div>
          </div>

          {/* AMOUNT */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-3 block">
              Montant
            </label>

            <div
              className="
                flex items-center justify-between
                border border-slate-200
                rounded-2xl
                px-5 py-4
                bg-slate-50
              ">
              <span className="text-slate-500">Frais d'inscription</span>

              <span className="text-2xl font-black text-slate-800">
                25 000 FCFA
              </span>
            </div>
          </div>
        </div>

        {/* PAYMENT SIMULATION */}
        <div
          className="
            mt-8
            rounded-3xl
            border border-emerald-200
            bg-emerald-50
            p-6
          ">
          <div className="flex items-start gap-4">
            <div
              className="
                w-14 h-14
                rounded-2xl
                bg-emerald-500
                text-white
                flex items-center justify-center
                shrink-0
              ">
              <ShieldCheck size={26} />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-800">
                Paiement simulé
              </h3>

              <p className="text-slate-600 mt-2 leading-relaxed">
                Aucun vrai paiement ne sera effectué. Cette fonctionnalité sert
                uniquement à tester le système d’inscription.
              </p>

              <div
                className="
                  mt-5
                  inline-flex items-center gap-2
                  px-4 py-2
                  rounded-full
                  bg-emerald-100
                  text-emerald-700
                  font-semibold
                  text-sm
                ">
                Référence : PAY-
                {Math.floor(Math.random() * 999999)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
