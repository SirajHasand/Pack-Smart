// src/components/Form.jsx
import { useState } from "react";
import { FiPlus, FiBriefcase, FiTag } from "react-icons/fi";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    const desc = description.trim();
    if (!desc) return;

    const newItem = {
      id: crypto.randomUUID(),
      description: desc,
      quantity: Number(quantity) || 1,
      packed: false,
      createdAt: Date.now(),
    };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <header className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
          <FiBriefcase className="text-lg text-slate-700 dark:text-slate-200" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Add item
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Keep it short & sweet.
          </p>
        </div>
      </header>

      <div className="grid sm:grid-cols-[1fr,120px,auto] gap-3">
        <label className="sr-only" htmlFor="desc">Item</label>
        <div className="relative">
          <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="desc"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Passport"
            className="w-full pl-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-950/60 py-3 outline-none focus:ring-4 ring-indigo-500/20 focus:border-indigo-500 transition"
          />
        </div>

        <label className="sr-only" htmlFor="qty">Qty</label>
        <input
          id="qty"
          type="number"
          min={1}
          max={99}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-950/60 py-3 px-3 outline-none focus:ring-4 ring-indigo-500/20 focus:border-indigo-500 transition"
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium border border-transparent bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-600/90 shadow ring-1 ring-inset ring-black/5 transition"
        >
          <FiPlus className="text-lg" />
          Add
        </button>
      </div>
    </form>
  );
}
