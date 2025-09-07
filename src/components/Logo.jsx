// src/components/Logo.jsx
import { FiMapPin } from "react-icons/fi";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow">
        <FiMapPin className="text-2xl" />
      </div>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          PackSmart
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Your minimalist trip packer
        </p>
      </div>
    </div>
  );
}
