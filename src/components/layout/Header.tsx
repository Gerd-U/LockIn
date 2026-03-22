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
      className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center justify-between"
    >
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <img
          src="/LockIn.png"
          alt="LockIn logo"
          className="h-7 w-auto object-contain"
        />
        <span className="text-white font-bold text-base tracking-tight">
          LockIn
        </span>
      </Link>

      <nav className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <span className="hidden sm:block text-slate-400 text-sm">
              Hola,{" "}
              <span className="text-purple-400 font-medium">{user?.name}</span>
            </span>
            <Link
              to="/dashboard"
              className="hidden sm:block text-slate-300 hover:text-white text-sm transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs sm:text-sm rounded-lg transition-all duration-200"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-slate-300 hover:text-white text-sm transition-colors px-2"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </motion.header>
  );
}