import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Users } from "lucide-react";

import { getUsers } from "../../features/auth/authService";

export default function RecentUsersTable() {
  const dispatch = useDispatch();

  const { users, usersLoading } = useSelector((state) => state.auth);

  /* ================================================= */
  /* ================= FETCH ========================= */
  /* ================================================= */

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  /* ================================================= */
  /* ================= LOADING ======================= */
  /* ================================================= */

  if (usersLoading) {
    return <div className="bg-white rounded-[28px] p-6">Chargement...</div>;
  }

  return (
    <div
      className="
        bg-white
        rounded-[28px]
        border border-slate-200
        shadow-sm
        p-6
      ">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Utilisateurs inscrits
          </h2>

          <p className="text-slate-500 mt-1">
            Liste des utilisateurs récemment inscrits
          </p>
        </div>

        <div
          className="
            w-12 h-12
            rounded-2xl
            bg-indigo-100
            flex items-center justify-center
          ">
          <Users size={22} className="text-indigo-600" />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-4 text-slate-500 text-sm font-semibold">
                Utilisateur
              </th>

              <th className="text-left py-4 text-slate-500 text-sm font-semibold">
                Email
              </th>

              <th className="text-left py-4 text-slate-500 text-sm font-semibold">
                Date
              </th>

              <th className="text-left py-4 text-slate-500 text-sm font-semibold">
                Rôle
              </th>
            </tr>
          </thead>

          <tbody>
            {(users || []).map((item) => (
              <tr key={item._id} className="border-b border-slate-100">
                {/* USER */}
                <td className="py-4">
                  <div>
                    <p className="font-semibold text-slate-800">
                      {item.firstName || "Utilisateur"} {item.lastName || ""}
                    </p>
                  </div>
                </td>

                {/* EMAIL */}
                <td className="py-4 text-slate-600">{item.email}</td>

                {/* DATE */}
                <td className="py-4 text-slate-500 text-sm">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("fr-FR")
                    : "N/A"}
                </td>

                {/* ROLE */}
                <td className="py-4">
                  <span
                    className="
                      px-3 py-1
                      rounded-full
                      text-xs font-semibold
                      bg-indigo-100
                      text-indigo-700
                    ">
                    {item.role || "Utilisateur"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* EMPTY */}
        {users?.length === 0 && (
          <div className="text-center py-10 text-slate-500">
            Aucun utilisateur trouvé
          </div>
        )}
      </div>
    </div>
  );
}
