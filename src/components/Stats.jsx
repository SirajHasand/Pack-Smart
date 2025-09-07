// src/components/Stats.jsx
import { useMemo } from "react";
import { FiPercent, FiPieChart, FiPackage } from "react-icons/fi";

export default function Stats({ items }) {
  const { total, packed, percent } = useMemo(() => {
    const total = items.length;
    const packed = items.filter((i) => i.packed).length;
    const percent = total ? Math.round((packed / total) * 100) : 0;
    return { total, packed, percent };
  }, [items]);

  return (
    <div className="space-y-4">
      <header className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
          <FiPieChart className="text-lg text-slate-700 dark:text-slate-200" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Trip stats
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Progress at a glance</p>
        </div>
      </header>

      <div>
        <div className="flex items-center justify-between text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          <span className="inline-flex items-center gap-2">
            <FiPackage /> {packed}/{total} packed
          </span>
          <span className="inline-flex items-center gap-2">
            <FiPercent /> {percent}%
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-200/70 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Tip: click the circle on any item to toggle packed.
      </p>
    </div>
  );
}
