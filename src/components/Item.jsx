// src/components/Item.jsx
import { FiCheckCircle, FiCircle, FiTrash2 } from "react-icons/fi";

export default function Item({ item, onToggleItem, onDeleteItem }) {
  return (
    <li
      className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-950/60 px-3 py-3 hover:shadow-sm transition-all"
    >
      <button
        onClick={() => onToggleItem(item.id)}
        className="shrink-0 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        aria-label={item.packed ? "Mark as unpacked" : "Mark as packed"}
        title={item.packed ? "Mark as unpacked" : "Mark as packed"}
      >
        {item.packed ? (
          <FiCheckCircle className="text-2xl text-emerald-600" />
        ) : (
          <FiCircle className="text-2xl text-slate-400 group-hover:text-slate-500" />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate font-medium ${
            item.packed ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-900 dark:text-slate-100"
          }`}
        >
          {item.description}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Qty: {item.quantity}
        </p>
      </div>

      <button
        onClick={() => onDeleteItem(item.id)}
        className="shrink-0 inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition"
        aria-label="Delete item"
        title="Delete item"
      >
        <FiTrash2 className="text-lg" />
      </button>
    </li>
  );
}
