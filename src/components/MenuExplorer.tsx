"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useMemo, useState } from "react";
import { PizzaCard } from "@/components/PizzaCard";
import { PizzaDialog } from "@/components/PizzaDialog";
import { Reveal } from "@/components/ui/Reveal";
import { categories, pizzas } from "@/data/menu";
import { normalize } from "@/lib/text";
import type { CategoryId, Pizza } from "@/types/menu";

type Filter = CategoryId | "todas";

const filters: { id: Filter; label: string; blurb: string }[] = [
  { id: "todas", label: "Todas", blurb: "Todo nuestro menú, de la clásica a la más cargada." },
  ...categories.map((c) => ({ id: c.id as Filter, label: c.label, blurb: c.blurb })),
];

export function MenuExplorer() {
  const [filter, setFilter] = useState<Filter>("todas");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Pizza | null>(null);

  const counts = useMemo(() => {
    const base: Record<Filter, number> = { todas: pizzas.length, clasicas: 0, especiales: 0 };
    for (const pizza of pizzas) base[pizza.category] += 1;
    return base;
  }, []);

  const visible = useMemo(() => {
    const term = normalize(query.trim());
    return pizzas.filter((pizza) => {
      if (filter !== "todas" && pizza.category !== filter) return false;
      if (!term) return true;
      const haystack = normalize(`${pizza.name} ${pizza.tagline} ${pizza.ingredients.join(" ")}`);
      return haystack.includes(term);
    });
  }, [filter, query]);

  const activeBlurb = filters.find((f) => f.id === filter)?.blurb ?? "";

  return (
    <section id="menu" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-basil-400">Nuestro menú</p>
          <h2 className="font-display text-brand-gradient mt-3 text-[clamp(2.5rem,7vw,4rem)] leading-none">
            Elige tu favorita
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-cream-dim">{activeBlurb}</p>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start" role="tablist" aria-label="Categorías">
              {filters.map((item) => {
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(item.id)}
                    className={`relative isolate rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                      active
                        ? "border-transparent text-cream"
                        : "border-grape-700/60 text-cream-dim hover:border-grape-400/70 hover:text-cream"
                    }`}
                  >
                    {/* La píldora morada se desliza hasta la categoría elegida */}
                    {active && (
                      <m.span
                        layoutId="filtro-activo"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-grape-500 shadow-lg shadow-grape-700/40"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {item.label}
                    <span className={`ml-2 text-xs ${active ? "text-cream/70" : "text-cream-dim/70"}`}>
                      {counts[item.id]}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative sm:w-64">
              <label htmlFor="buscar" className="sr-only">
                Buscar en el menú
              </label>
              <input
                id="buscar"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar ingrediente…"
                className="w-full rounded-full border border-grape-700/60 bg-ink-card px-5 py-2.5 text-sm text-cream placeholder:text-cream-dim/60 focus:border-basil-400 focus:outline-none"
              />
            </div>
          </div>
        </Reveal>

        {visible.length > 0 ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Al filtrar, las tarjetas que quedan se reacomodan y las demás se desvanecen */}
            <AnimatePresence mode="popLayout">
              {visible.map((pizza, index) => (
                <m.li
                  key={pizza.slug}
                  layout
                  initial={{ opacity: 0, y: 32, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                    layout: { type: "spring", stiffness: 350, damping: 32 },
                  }}
                  className="h-full"
                >
                  <PizzaCard pizza={pizza} onOpen={setSelected} />
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <p className="mt-16 text-center text-cream-dim">
            No encontramos pizzas con «{query}».{" "}
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("todas");
              }}
              className="font-semibold text-basil-300 underline underline-offset-4"
            >
              Ver todo el menú
            </button>
          </p>
        )}
      </div>

      <PizzaDialog pizza={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
