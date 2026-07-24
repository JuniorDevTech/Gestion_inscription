/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

import {
  X,
  BookOpen,
  FileText,
  Layers3,
  Sparkles,
  DollarSign,
  Image,
  Clock3,
  GraduationCap,
} from "lucide-react";

import {
  createFormation,
  updateFormation,
} from "../../features/formations/formationService";

export default function AddFormationModal({ onClose, formation }) {
  const dispatch = useDispatch();
  const isEdit = Boolean(formation);

  /* ================================================= */
  /* ================= STATE ========================= */
  /* ================================================= */

  const [formData, setFormData] = useState({
    title: formation?.title || "",

    description: formation?.description || "",

    price: formation?.price || "",

    duration: formation?.duration || "",

    level: formation?.level || "Débutant",

    category: formation?.category || "",

    status: formation?.status || "active",

    image: null,
  });

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  /* ================================================= */
  /* ================= HANDLE CHANGE ================= */
  /* ================================================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /* ================================================= */
  /* ================= HANDLE IMAGE ================== */
  /* ================================================= */

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData({
      ...formData,

      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  /* ================================================= */
  /* ================= HANDLE SUBMIT ================= */
  /* ================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* VALIDATION */
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.duration ||
      !formData.category
    ) {
      return Swal.fire({
        icon: "error",

        title: "Erreur",

        text: "Veuillez remplir tous les champs obligatoires",
      });
    }

    try {
      setLoading(true);

      /* ================================================= */
      /* ================= FORMDATA ====================== */
      /* ================================================= */

      const data = new FormData();

      data.append("title", formData.title);

      data.append("description", formData.description);

      data.append("price", formData.price);

      data.append("duration", formData.duration);

      data.append("level", formData.level);

      data.append("category", formData.category);

      data.append("status", formData.status);

      if (formData.image) {
        data.append("image", formData.image);
      }

      /* ================================================= */
      /* ================= API =========================== */
      /* ================================================= */

      let result;

      /* ================================================= */
      /* ================= UPDATE ======================== */
      /* ================================================= */

      if (isEdit && formation?._id) {
        result = await dispatch(updateFormation(formation._id, data));
      } else {
        /* ================================================= */
        /* ================= CREATE ======================== */
        /* ================================================= */
        result = await dispatch(createFormation(data));
      }

      if (!result.success) {
        throw new Error(result.error);
      }

      /* ================================================= */
      /* ================= SUCCESS ======================= */
      /* ================================================= */

      await Swal.fire({
        icon: "success",

        title: "Succès",

        text: isEdit
          ? "Formation modifiée avec succès"
          : "Formation ajoutée avec succès",
      });

      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "Erreur",

        text: error.message || "Erreur serveur",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================================================= */
  /* ================= useEffect ================= */
  /* ================================================= */

  useEffect(() => {
    if (formation) {
      setFormData({
        title: formation.title || "",

        description: formation.description || "",

        price: formation.price || "",

        duration: formation.duration || "",

        level: formation.level || "Débutant",

        category: formation.category || "",

        status: formation.status || "active",

        image: null,
      });

      setPreview(
        formation.image ? `http://localhost:5000${formation.image}` : "",
      );
    }
  }, [formation]);

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        p-4
      ">
      {/* MODAL */}
      <div
        className="
          relative overflow-hidden
          bg-white
          w-full max-w-3xl
          rounded-[32px]
          border border-slate-200
          shadow-2xl
          max-h-[95vh]
          overflow-y-auto
        ">
        {/* BACKGROUND */}
        <div
          className="
            absolute -top-20 -right-20
            w-72 h-72
            bg-indigo-100
            rounded-full
            blur-3xl
            opacity-70
          "
        />

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="
            absolute top-5 right-5 z-20
            w-11 h-11
            rounded-2xl
            bg-slate-100
            hover:bg-red-500
            hover:text-white
            text-slate-600
            flex items-center justify-center
            transition-all duration-300
          ">
          <X size={20} />
        </button>

        {/* CONTENT */}
        <div className="relative z-10 p-6 md:p-8">
          {/* HEADER */}
          <div className="flex items-start gap-4 mb-8">
            <div
              className="
                w-16 h-16 rounded-3xl
                bg-gradient-to-br from-indigo-600 to-blue-600
                text-white
                flex items-center justify-center
                shadow-lg
                shrink-0
              ">
              <Sparkles size={30} />
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-800">
                {isEdit ? "Modifier la formation" : "Ajouter une formation"}
              </h2>

              <p className="text-slate-500 mt-2">
                {isEdit
                  ? "Modifiez les informations de la formation."
                  : "Créez une nouvelle formation et configurez toutes ses informations."}
              </p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}
            <div>
              <label
                className="
                  flex items-center gap-2
                  text-sm font-semibold
                  text-slate-700
                  mb-3
                ">
                <BookOpen size={18} />
                Nom de la formation
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: React JS Avancé"
                className="
                  w-full
                  bg-slate-50
                  border border-slate-200
                  rounded-2xl
                  px-5 py-4
                  outline-none
                  focus:bg-white
                  focus:border-indigo-500
                  focus:ring-4 focus:ring-indigo-100
                "
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label
                className="
                  flex items-center gap-2
                  text-sm font-semibold
                  text-slate-700
                  mb-3
                ">
                <FileText size={18} />
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez la formation..."
                className="
                  w-full resize-none
                  bg-slate-50
                  border border-slate-200
                  rounded-2xl
                  px-5 py-4
                  outline-none
                  focus:bg-white
                  focus:border-indigo-500
                  focus:ring-4 focus:ring-indigo-100
                "
              />
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* PRICE */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <DollarSign size={18} />
                  Prix
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="150000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* DURATION */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <Clock3 size={18} />
                  Durée
                </label>

                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="6 mois"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* LEVEL */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <GraduationCap size={18} />
                  Niveau
                </label>

                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100">
                  <option>Débutant</option>

                  <option>Intermédiaire</option>

                  <option>Avancé</option>
                </select>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <Layers3 size={18} />
                  Catégorie
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100">
                  <option value="">Sélectionner</option>

                  <option value="developpement-web">Développement Web</option>

                  <option value="design">Design</option>

                  <option value="marketing">Marketing</option>

                  <option value="data-science">Data Science</option>
                </select>
              </div>
            </div>

            {/* IMAGE */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <Image size={18} />
                Image de la formation
              </label>

              <label
                className="
                  relative flex flex-col
                  items-center justify-center
                  gap-4
                  w-full min-h-[220px]
                  border-2 border-dashed
                  border-slate-300
                  rounded-[28px]
                  bg-slate-50
                  hover:border-indigo-500
                  hover:bg-indigo-50
                  transition-all duration-300
                  cursor-pointer
                  overflow-hidden
                ">
                {/* PREVIEW */}
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="
                      absolute inset-0
                      w-full h-full
                      object-cover
                    "
                  />
                ) : (
                  <>
                    <div
                      className="
                        w-20 h-20
                        rounded-3xl
                        bg-indigo-100
                        text-indigo-600
                        flex items-center justify-center
                      ">
                      <Image size={36} />
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-bold text-slate-800">
                        Sélectionner une image
                      </h3>

                      <p className="text-sm text-slate-500 mt-2">
                        Cliquez pour importer une image
                      </p>
                    </div>
                  </>
                )}

                {/* INPUT */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* STATUS */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <Layers3 size={18} />
                Statut
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100">
                <option value="active">Active</option>

                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* ACTIONS */}
            <div
              className="
                flex flex-col sm:flex-row
                justify-end gap-3
                pt-4
              ">
              <button
                type="button"
                onClick={onClose}
                className="
                  px-6 py-4 rounded-2xl
                  border border-slate-200
                  bg-white
                  text-slate-700
                  font-semibold
                  hover:bg-slate-100
                  transition-all duration-300
                ">
                Annuler
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  px-6 py-4 rounded-2xl
                  bg-gradient-to-r from-indigo-600 to-blue-600
                  text-white
                  font-semibold
                  shadow-lg shadow-indigo-200
                  hover:shadow-xl
                  hover:scale-[1.02]
                  transition-all duration-300
                ">
                {loading
                  ? isEdit
                    ? "Modification..."
                    : "Ajout..."
                  : isEdit
                    ? "Modifier la formation"
                    : "Ajouter la formation"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
