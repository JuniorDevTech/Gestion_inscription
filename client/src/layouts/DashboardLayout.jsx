import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Menu,
  X,
  Bell,
  LogOut,
} from "lucide-react";

import { useState } from "react";

export default function DashboardLayout() {
  const location = useLocation();

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login", {
      replace: true,
    });
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Formations",
      path: "/dashboard/formations",
      icon: GraduationCap,
    },

    {
      name: "Documents",
      path: "/dashboard/documents",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50 flex">
      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="
            fixed inset-0 z-40
            bg-black/40 backdrop-blur-sm
            lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          h-screen w-[290px]
          backdrop-blur-2xl
          bg-[#0f172acc]
          border-r border-white/10
          shadow-2xl
          transition-all duration-300
          transform flex flex-col

          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}>
        {/* LOGO */}
        <div className="px-6 py-7 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="
                  text-3xl font-black
                  bg-gradient-to-r from-indigo-400 to-cyan-400
                  bg-clip-text text-transparent
                ">
                EduSpace
              </h1>

              <p className="text-slate-400 text-sm mt-1">
                Plateforme E-learning
              </p>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white transition">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          {menuItems.map(({ name, path, icon: Icon }, index) => {
            const isActive = location.pathname === path;

            return (
              <NavLink
                key={index}
                to={path}
                className={`
                  group relative overflow-hidden
                  flex items-center gap-4
                  px-4 py-4 rounded-2xl
                  transition-all duration-300

                  ${
                    isActive
                      ? `
                        bg-gradient-to-r
                        from-indigo-600
                        to-blue-600
                        text-white
                        shadow-lg shadow-indigo-950/40
                        scale-[1.02]
                      `
                      : `
                        text-slate-300
                        hover:bg-white/5
                        hover:text-white
                      `
                  }
                `}>
                {/* ICON */}
                <div
                  className={`
                    p-3 rounded-2xl
                    transition-all duration-300

                    ${
                      isActive
                        ? "bg-white/10"
                        : "bg-slate-800/80 group-hover:bg-slate-700"
                    }
                  `}>
                  <Icon size={20} />
                </div>

                {/* TEXT */}
                <span className="font-semibold tracking-wide">{name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center justify-center gap-3
              py-4 rounded-2xl
              bg-gradient-to-r from-red-500 to-red-600
              hover:scale-[1.02]
              text-white font-semibold
              transition-all duration-300
              shadow-lg shadow-red-950/40
            ">
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header
          className="
            sticky top-0 z-30
            backdrop-blur-xl
            bg-white/70
            border-b border-white/40
          ">
          <div className="px-4 lg:px-8 py-5">
            <div className="flex items-center justify-between">
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="
                    lg:hidden
                    p-3 rounded-2xl
                    bg-white
                    border border-slate-200
                    shadow-sm
                    hover:scale-105
                    transition
                  ">
                  <Menu size={22} />
                </button>

                <div>
                  <h2 className="text-3xl font-black text-slate-800">
                    Dashboard
                  </h2>

                  <p className="text-slate-500 mt-1">
                    Gérez vos formations et documents
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">
                {/* NOTIFICATION */}
                <button
                  className="
                    relative
                    p-3.5 rounded-2xl
                    bg-white
                    border border-slate-200
                    shadow-sm
                    hover:scale-105
                    transition-all
                  ">
                  <Bell size={20} className="text-slate-700" />

                  <span
                    className="
                      absolute top-2 right-2
                      w-2.5 h-2.5
                      rounded-full
                      bg-red-500 animate-pulse
                    "
                  />
                </button>

                {/* USER */}
                <div
                  className="
                    flex items-center gap-3
                    bg-white/90
                    border border-slate-200
                    px-4 py-2.5
                    rounded-3xl
                    shadow-sm
                  ">
                  {/* AVATAR */}
                  <div
                    className="
                      w-12 h-12 rounded-2xl
                      bg-gradient-to-br
                      from-indigo-600
                      to-cyan-500
                      flex items-center justify-center
                      text-white
                      font-black uppercase
                      shadow-lg
                    ">
                    {user?.email?.charAt(0)}
                  </div>

                  {/* INFO */}
                  <div className="hidden md:block">
                    <p className="font-bold text-slate-800">Utilisateur</p>

                    <p className="text-sm text-slate-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div
            className="
              min-h-full
              rounded-[32px]
              bg-white/80
              backdrop-blur-xl
              border border-white/50
              shadow-xl
              p-5 md:p-8
            ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
