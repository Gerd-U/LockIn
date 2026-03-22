import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/layout/Layout";

const ADMIN_STATS = [
  { label: "Usuarios totales", value: "1,284", icon: "👥" },
  { label: "Sesiones hoy", value: "342", icon: "📊" },
  { label: "Ingresos", value: "$12,400", icon: "💰" },
  { label: "Reportes", value: "8 nuevos", icon: "📋" },
];

const USER_STATS = [
  { label: "Tu plan", value: "Free", icon: "⭐" },
  { label: "Sesiones", value: "12", icon: "📊" },
  { label: "Último acceso", value: "Hoy", icon: "🕐" },
  { label: "Notificaciones", value: "3 nuevas", icon: "🔔" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const stats = isAdmin ? ADMIN_STATS : USER_STATS;

  return (
    <Layout>
      <div className="w-full max-w-4xl py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-1">
            Hola, {user?.name} 👋
          </h1>
          <p className="text-slate-400">
            Bienvenido a tu dashboard —{" "}
            <span
              className={`font-medium ${
                isAdmin ? "text-yellow-400" : "text-purple-400"
              }`}
            >
              {isAdmin ? "👑 Administrador" : "👤 Usuario"}
            </span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition-all duration-200"
            >
              <span className="text-2xl">{stat.icon}</span>
              <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
              <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 mb-6"
          >
            <h2 className="text-yellow-400 font-bold text-lg mb-4">
              👑 Panel de Administrador
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {["Gestionar usuarios", "Ver reportes", "Configuración"].map(
                (action) => (
                  <button
                    key={action}
                    className="px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-yellow-300 text-sm rounded-xl transition-all duration-200 text-left"
                  >
                    {action} →
                  </button>
                ),
              )}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isAdmin ? 0.6 : 0.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
        >
          <h2 className="text-white font-bold text-lg mb-4">
            📌 Actividad reciente
          </h2>
          <div className="space-y-3">
            {[
              {
                text: "Inicio de sesión exitoso",
                time: "Hace 2 min",
                color: "bg-green-400",
              },
              {
                text: "Perfil actualizado",
                time: "Hace 1 hora",
                color: "bg-blue-400",
              },
              {
                text: "Contraseña cambiada",
                time: "Hace 3 días",
                color: "bg-purple-400",
              },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-slate-300 text-sm flex-1">
                  {item.text}
                </span>
                <span className="text-slate-500 text-xs">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
