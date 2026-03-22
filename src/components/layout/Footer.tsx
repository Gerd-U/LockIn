import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="w-full px-6 py-4 bg-white/5 backdrop-blur-md border-t border-white/10 text-center"
    >
      <p className="text-slate-500 text-xs">
        © {new Date().getFullYear()} LockIn — Hecho con 💜 para el portafolio
      </p>
    </motion.footer>
  );
}