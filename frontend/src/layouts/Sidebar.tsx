import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  History,
  Settings,
  HardDrive,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center ${
      isOpen ? "gap-3 justify-start px-4" : "justify-center"
    } py-2 rounded-md transition-all duration-150 ${
      isActive
        ? "bg-indigo-600 text-gray-100 hover:text-white font-medium shadow-md"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside
      className={`${
        isOpen ? "w-60" : "w-16"
      } bg-gray-900 text-white h-screen p-4 flex flex-col gap-2 transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div
        className={`flex items-center ${
          isOpen ? "justify-end pr-0" : "justify-center"
        } mb-4`}
      >
        <button
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white transition-transform"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={navItemClass}>
          <LayoutDashboard size={20} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/historical" className={navItemClass}>
          <History size={20} />
          {isOpen && <span>Historical Data</span>}
        </NavLink>

        <NavLink to="/machines" className={navItemClass}>
          <HardDrive size={20} />
          {isOpen && <span>Machines Overview</span>}
        </NavLink>

        <NavLink to="/settings" className={navItemClass}>
          <Settings size={20} />
          {isOpen && <span>Settings</span>}
        </NavLink>
      </nav>
    </aside>
  );
}
