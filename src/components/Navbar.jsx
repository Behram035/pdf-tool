import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FileBox, LogOut, LogIn, UserRoundPlus } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const tools = [
    {
      name: "Merge",
      path: "/merge",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Split",
      path: "/split",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Compress",
      path: "/compress",
      color: "from-pink-500 to-pink-600",
    },
    {
      name: "PDF to JPG",
      path: "/pdf-to-jpg",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "JPG to PDF",
      path: "/jpg-to-pdf",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Watermark",
      path: "/watermark",
      color: "from-cyan-500 to-blue-600",
    },
    {
      name: "Rotate",
      path: "/rotate",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Delete Pages",
      path: "/delete-pages",
      color: "from-red-500 to-orange-600",
    },
    {
      name: "Extract Pages",
      path: "/extract-pages",
      color: "from-indigo-500 to-purple-600",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 border-b border-slate-600 shadow-lg backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group hover:opacity-85 transition-opacity duration-200"
          >
            <div className="p-1.5 bg-linear-to-br from-blue-600 via-indigo-600 to-cyan-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
              <FileBox className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                PDF Tools
              </h1>
              <p className="text-xs text-gray-300 font-small">
                Professional Toolkit
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          {token && (
            <div className="hidden lg:flex items-center gap-2">
              {tools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="group relative flex items-center gap-1 px-2 py-1.5 rounded-lg text-gray-700 font-medium text-sm transition-all duration-300 hover:bg-gray-500 hover:shadow-md"
                >
                  <span className="bg-linear-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent group-hover:from-gray-900 group-hover:to-black">
                    {tool.name}
                  </span>
                  <div
                    className={`absolute bottom-0 left-0 h-1 rounded-full w-0 group-hover:w-full bg-linear-to-r ${tool.color} transition-all duration-300`}
                  ></div>
                </Link>
              ))}
            </div>
          )}

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-3">
            {token ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-600 to-red-700 text-white font-medium text-sm rounded-lg hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white font-medium text-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 transform cursor-pointer"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <UserRoundPlus className="w-4 h-4" /> Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-cyan-700 hover:bg-gray-200 transition-colors"
          >
            <span
              className={`w-5 h-0.5 bg-linear-to-r from-white to-gray-200 rounded-full transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-linear-to-r from-white to-gray-200 rounded-full transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-linear-to-r from-white to-gray-200 rounded-full transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-2 space-y-2 border-t border-gray-100 pt-3 animate-in fade-in slide-in-from-top-4 duration-300">
            {token ? (
              <>
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    onClick={() => setIsOpen(false)}
                    className="items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:bg-linear-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 font-medium block w-full group"
                  >
                    <span className="group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:bg-clip-text transition-all">
                      {tool.name}
                    </span>
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 bg-linear-to-r from-red-600 to-red-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-100 transition-all duration-300 font-medium w-full cursor-pointer"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white font-medium transition-all duration-300 hover:shadow-lg w-full cursor-pointer"
                >
                  <UserRoundPlus className="w-4 h-4" /> Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
