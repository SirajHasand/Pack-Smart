import { useMemo, useState } from "react";
import { FiTrash2, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Item from "./Item";

export default function PackingList({ items, onDeleteItem, onToggleItem, onClear }) {
  const [sortBy, setSortBy] = useState("createdAt");
  const [open, setOpen] = useState(true);

  const sorted = useMemo(() => {
    const cloned = [...items];
    if (sortBy === "packed") {
      return cloned.sort((a, b) => Number(a.packed) - Number(b.packed));
    }
    if (sortBy === "description") {
      return cloned.sort((a, b) => a.description.localeCompare(b.description));
    }
    if (sortBy === "quantity") {
      return cloned.sort((a, b) => a.quantity - b.quantity);
    }
    return cloned.sort((a, b) => a.createdAt - b.createdAt);
  }, [items, sortBy]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Packing list
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {items.length ? `${items.length} item${items.length > 1 ? "s" : ""}` : "No items yet"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sorting select */}
          <select
            className="rounded-xl border border-slate-200 dark:border-slate-700 
                       bg-white/80 dark:bg-slate-950/60 px-3 py-2 text-sm 
                       text-slate-800 dark:text-slate-200
                       outline-none focus:ring-4 ring-indigo-500/20 
                       focus:border-indigo-500 transition w-full sm:w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Sort: Added</option>
            <option value="description">Sort: A → Z</option>
            <option value="quantity">Sort: Quantity</option>
            <option value="packed">Sort: Unpacked first</option>
          </select>

          {/* Collapse/Expand button */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 
                       rounded-xl px-3 py-2 text-sm font-medium 
                       border border-slate-200 dark:border-slate-700 
                       bg-white/80 dark:bg-slate-950/60 
                       text-slate-800 dark:text-slate-200
                       hover:shadow transition"
          >
            {open ? <FiChevronUp /> : <FiChevronDown />}
            {open ? "Collapse" : "Expand"}
          </button>

          {/* Clear all button */}
          <button
            onClick={onClear}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 
                       rounded-xl px-3 py-2 text-sm font-medium 
                       border border-rose-200 dark:border-rose-900/60 
                       bg-rose-50/80 dark:bg-rose-900/20 
                       text-rose-700 dark:text-rose-300 
                       hover:bg-rose-100 dark:hover:bg-rose-900/30 transition"
          >
            <FiTrash2 />
            Clear all
          </button>
        </div>
      </header>

      {/* List */}
      {open && (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sorted.map((item) => (
            <Item
              key={item.id}
              item={item}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
