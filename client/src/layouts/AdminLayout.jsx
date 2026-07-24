import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();

  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const [notifications, setNotifications] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login", {
      replace: true,
    });
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Inscriptions",
      path: "/admin/inscriptions",
      icon: Users,
    },

    {
      name: "Formations",
      path: "/admin/formations",
      icon: GraduationCap,
    },

    {
      name: "Reports",
      path: "/admin/reports",
      icon: FileText,
    },
  ];

  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("SOCKET CONNECTÉ");
    });

    socket.on("new_admin_notification", (data) => {
      console.log("NOTIFICATION :", data);

      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
                EduAdmin
              </h1>

              <p className="text-slate-400 text-sm mt-1">
                Administration plateforme
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
            <div className="flex items-center justify-between gap-4">
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
                    Tableau de bord
                  </h2>

                  <p className="text-slate-500 mt-1">
                    Gérez votre plateforme efficacement
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-4">
                {/* SEARCH */}
                <div
                  className="
                    hidden md:flex
                    items-center gap-3
                    px-5 py-3
                    rounded-2xl
                    bg-white/90
                    border border-slate-200
                    shadow-sm
                    min-w-[280px]
                  ">
                  <Search size={18} className="text-slate-400" />

                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="
                      bg-transparent
                      outline-none
                      text-sm
                      w-full
                      placeholder:text-slate-400
                    "
                  />
                </div>

                {/* NOTIFICATION */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="
      relative
      p-3.5 rounded-2xl
      bg-white
      border border-slate-200
      shadow-sm
    ">
                    <Bell size={20} className="text-slate-700" />

                    {notifications.length > 0 && (
                      <span
                        className="
          absolute -top-1 -right-1
          min-w-[20px]
          h-5
          px-1
          rounded-full
          bg-red-500
          text-white
          text-[11px]
          flex items-center justify-center
          font-bold
        ">
                        {notifications.length}
                      </span>
                    )}
                  </button>

                  {/* DROPDOWN */}
                  {showNotifications && (
                    <div
                      className="
        absolute right-0 mt-3
        w-80
        bg-white
        rounded-2xl
        border border-slate-200
        shadow-xl
        z-50
        overflow-hidden
      ">
                      <div className="p-4 border-b">
                        <h3 className="font-bold text-slate-800">
                          Notifications
                        </h3>
                      </div>

                      <div className="max-h-[350px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="p-4 text-sm text-slate-500">
                            Aucune notification
                          </p>
                        ) : (
                          notifications.map((notif, index) => (
                            <div
                              key={index}
                              className="
                p-4 border-b border-slate-100
                hover:bg-slate-50
              ">
                              <p className="font-semibold text-slate-800">
                                {notif.message}
                              </p>

                              <p className="text-sm text-slate-500 mt-1">
                                {notif.email}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

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
                    <p className="font-bold text-slate-800">Administrateur</p>

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
