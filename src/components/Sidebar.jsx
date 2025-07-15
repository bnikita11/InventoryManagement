import {
  MdDashboard,
  MdInventory,
  MdShoppingCart,
  MdReceipt,
  MdReport,
  MdSupportAgent,
  MdSettings,
  MdLogout,
  MdOutlineDashboard,
  MdOutlineInventory,
  MdOutlineShoppingCart,
  MdOutlineReceipt,
  MdOutlineReport,
  MdOutlineSupportAgent,
  MdOutlineSettings,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import LogOut from "./LogoutButton";
import { useSelector } from "react-redux";

export function Sidebar({ isSidebarOpen }) {
  const user = useSelector((state) => state.auth.userData);
  return (
    <div
      className={` bg-white shadow-md p-6 flex flex-col justify-between fixed top-0 left-0 h-full w-64 transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* User Profile Section */}
      <div className="flex items-center space-x-3 mb-8">
        <img
          src="https://via.placeholder.com/40" // Replace with actual user avatar
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-textDark">{user?.name || "None"}</p>
          <p className="text-sm text-gray-500">{user?.email || "None"}</p>
        </div>
      </div>

      <nav className="space-y-4 ml-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "flex items-center bg-blue-100 text-blue-800 rounded-md p-2"
              : "flex items-center hover:text-blue-500 rounded-md p-2"
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <MdDashboard /> : <MdOutlineDashboard />}
              <span className="ml-5"> Dashboard</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            isActive
              ? "flex items-center bg-blue-100 text-blue-800 rounded-md p-2"
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <MdInventory /> : <MdOutlineInventory />}
              <span className="ml-5">Inventory</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? "flex items-center bg-blue-100 text-blue-800 rounded-md p-2"
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <MdShoppingCart /> : <MdOutlineShoppingCart />}
              <span className="ml-5">Orders</span>
            </>
          )}
          {/*  <FontAwesomeIcon icon={faChevronDown} className="ml-auto h-3 w-3" /> {/* Added a dropdown indicator */}
        </NavLink>
        <NavLink
          to="/purchase"
          className={({ isActive }) =>
            isActive
              ? "flex items-center bg-blue-100 text-blue-800 rounded-md p-2"
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <MdReceipt /> : <MdOutlineReceipt />}
              <span className="ml-5">Purchase</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive
              ? "flex items-center bg-blue-100 text-blue-800 rounded-md p-2"
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <MdReport /> : <MdOutlineReport />}
              <span className="ml-5">Reporting</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/support"
          className={({ isActive }) =>
            isActive
              ? "flex items-center bg-blue-100 text-blue-800 rounded-md p-2"
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <MdSupportAgent /> : <MdOutlineSupportAgent />}
              <span className="ml-5"> Support</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "flex items-center bg-blue-100 text-blue-800 rounded-md p-2"
              : `flex items-center hover:text-blue-500 rounded-md p-2`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <MdSettings /> : <MdOutlineSettings />}
              <span className="ml-5"> Setting</span>
            </>
          )}
        </NavLink>
      </nav>
      <div className="mt-auto">
        <LogOut />
      </div>
    </div>
  );
}
