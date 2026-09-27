import React from "react";
import { Link } from "react-router-dom";
import useLogOut from "../hooks/useLogOut";
import { useAuthContext } from "../../context/authContext";

const Navbar = ({ onOpenAddTransaction }) => {
  const { logOut, loading } = useLogOut();
  const { authUser } = useAuthContext();

  const handleLogout = async () => {
    await logOut();
  };

  const displayName = authUser?.user?.fullname || "User";
  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-full">
      <div className="navbar py-5 z-50 bg-gray-950 shadow-2xl px-4 sm:px-8 flex justify-between items-center border-b border-slate-900">

        <Link to="/" className="navbar-start flex items-center gap-2">
          <img
            src="/webLogo.png"
            alt="Spendly Logo"
            className="w-10 h-10 object-contain"
          />
          <span className="btn btn-ghost text-xl font-bold tracking-tight text-white hover:bg-transparent px-0">
            Spendly
          </span>
        </Link>

        {/* Right Section Actions */}
        <div className="navbar-end flex items-center justify-end gap-3 w-auto">
          <button
            type="button"
            onClick={onOpenAddTransaction}
            className="btn btn-sm sm:btn-md bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold border-none rounded-xl"
          >
            + Add Transaction
          </button>

          {/* Conditional Auth UI */}
          {authUser ? (
            <div className="dropdown dropdown-end">
              {/* Avatar / Profile Trigger */}
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-slate-700 hover:border-slate-500"
              >
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-sm font-semibold text-sky-400">
                  {initials}
                </div>
              </div>

              {/* Profile Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-2xl bg-slate-900 border border-slate-800 rounded-2xl w-48 text-slate-200"
              >
                <li className="menu-title px-3 py-1.5 text-xs text-slate-400">
                  Welcome
                  <span className="text-white font-semibold block truncate">
                    {displayName}
                  </span>
                </li>
                <div className="divider my-1 border-slate-800"></div>
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={loading}
                    className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 font-semibold"
                  >
                    {loading ? "Logging out..." : "Logout"}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm sm:btn-md btn-outline border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600 rounded-xl"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
