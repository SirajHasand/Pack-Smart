import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import Logo from "../components/Logo";
import Form from "../components/Form";
import PackingList from "../components/PackingList";
import Stats from "../components/Stats";

function Trip() {
  const [items, setItems] = useState([]);
  const [dark, setDark] = useState(false);

  // Apply dark mode to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  // Initialize dark mode based on localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.theme;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemDark)) {
      setDark(true);
    }
  }, []);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function onClear() {
    const confirmed = window.confirm("Are you sure you want to delete all items?");
    if (confirmed) setItems([]);
  }

  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800">
        <div className=" mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between">
          <Logo />
          <button
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm font-medium shadow-sm hover:shadow transition-all active:scale-[0.98] bg-white/70 dark:bg-slate-900/70"
          >
            {dark ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
            <span className="hidden sm:inline">{dark ? "Light" : "Dark"} mode</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-4 md:p-6 shadow-sm">
            <Form onAddItems={handleAddItems} />
          </section>

          <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-4 md:p-6 shadow-sm">
            <Stats items={items} />
          </section>
        </div>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-4 md:p-6 shadow-sm">
          <PackingList
            items={items}
            onDeleteItem={handleDeleteItem}
            onToggleItem={handleToggleItem}
            onClear={onClear}
          />
        </section>
      </main>
    </div>
  );
}

export default Trip;