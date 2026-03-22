import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full px-6 py-4 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between"
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">L</span>
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          LockIn
        </span>
      </Link>

      {/* Navegación */}
      <nav className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="text-slate-300 hover:text-white text-sm transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-slate-500 text-sm">|</span>
            <span className="text-slate-400 text-sm">
              Hola,{" "}
              <span className="text-purple-400 font-medium">{user?.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-sm rounded-lg transition-all duration-200"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-slate-300 hover:text-white text-sm transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition-all duration-200"
            >
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </motion.header>
  );
}
