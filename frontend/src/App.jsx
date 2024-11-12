import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for mobile menu toggle
import logo from "./assets/Logo.png";

function App() {
  const [menuOpen, setMenuOpen] = useState(false); // State for toggling menu
  const location = useLocation();

  return (
    <>
      <nav className="flex justify-between items-center p-4 sm:p-8 bg-gray-800 text-white">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-12 w-auto" />

        {/* Hamburger Icon for Mobile */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Nav Links */}
        <ul
          className={`flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-lg sm:text-xl transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          } sm:flex`}
        >
          <li>
            <Link
              to="/"
              style={{ color: location.pathname === "/" ? "red" : "inherit" }}
              onClick={() => setMenuOpen(false)} // Close menu on link click
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/movies"
              style={{
                color: location.pathname === "/movies" ? "red" : "inherit",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              to="/movies/edit"
              style={{
                color: location.pathname === "/movies/edit" ? "red" : "inherit",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Edit
            </Link>
          </li>
          <li>
            <Link
              to="/addmovies"
              style={{
                color: location.pathname === "/addmovies" ? "red" : "inherit",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Add Movies
            </Link>
          </li>
        </ul>
      </nav>

      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
