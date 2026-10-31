import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  UserRound,
} from "lucide-react";

const Sidebar = () => {
  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "All Tasks",
      path: "/tasks",
      icon: ClipboardList,
    },
    {
      name: "Create Task",
      path: "/tasks/create",
      icon: PlusCircle,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: UserRound,
    },
  ];

  return (
    <aside className="hidden min-h-[calc(100vh-64px)] w-64 shrink-0 border-r border-gray-200 bg-white px-4 py-6 md:block">
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Workspace
      </p>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                }`
              }
            >
              <Icon size={19} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-10 rounded-xl bg-indigo-50 p-4">
        <h3 className="text-sm font-semibold text-indigo-900">
          Stay organized!
        </h3>

        <p className="mt-2 text-xs leading-5 text-indigo-700">
          Keep track of your tasks and achieve your daily goals.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;