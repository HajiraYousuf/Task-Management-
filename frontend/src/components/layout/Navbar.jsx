import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  UserRound,
  LogOut,
  X,
  LogOut as LogoutIcon,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-indigo-600"
        >
          TaskFlow
        </Link>

        {/* Search */}
        <div className="mx-8 hidden max-w-md flex-1 items-center gap-3 rounded-xl bg-gray-100 px-4 py-2.5 md:flex">
          <Search size={19} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="relative text-gray-500 transition hover:text-indigo-600"
            aria-label="Notifications"
          >
            <Bell size={21} />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <div className="flex items-center gap-3 border-l border-gray-200 pl-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <UserRound size={19} />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-500">Account</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            title="Logout"
            aria-label="Logout"
            className="text-gray-500 transition hover:text-red-500"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <LogoutIcon size={24} />
              </div>

              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="text-gray-400 transition hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Logout from TaskFlow?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to log out of your account?
              You will need to sign in again to access your workspace.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;