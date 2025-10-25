import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded-md hover:bg-gray-800 ${
      isActive ? "bg-gray-800 text-blue-400" : "text-gray-300"
    }`;

  return (
    <aside className="w-60 bg-gray-900 text-white h-screen p-4 flex flex-col gap-2">
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={navItemClass}>
          Dashboard
        </NavLink>
        <NavLink to="/historical" className={navItemClass}>
          Historical Data
        </NavLink>
        <NavLink to="/machines" className={navItemClass}>
          Machines Overview
        </NavLink>
        <NavLink to="/settings" className={navItemClass}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
