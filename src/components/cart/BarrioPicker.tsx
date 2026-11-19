"use client";

import { useId, useMemo, useRef, useState } from "react";
import { barrios } from "@/data/barrios";
import { formatPrice } from "@/lib/format";
import { normalize } from "@/lib/text";

interface BarrioPickerProps {
  /** Barrio elegido; vacío mientras no haya uno. */
  value: string;
  onChange: (barrio: string) => void;
  /** Clases del campo de texto, para que se vea igual a los demás. */
  inputClassName: string;
  label: React.ReactNode;
}

/**
 * Buscador de barrios: el cliente escribe y ve solo los barrios que coinciden
 * (sin importar tildes ni mayúsculas). Si el suyo no está, lo puede usar tal
 * como lo escribió.
 */
export function BarrioPicker({ value, onChange, inputClassName, label }: BarrioPickerProps) {
  const id = useId();
  const listId = `${id}-lista`;
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const term = normalize(query.trim());
  const matches = useMemo(
    () => (term ? barrios.filter((b) => normalize(b.name).includes(term)) : barrios),
    [term],
  );

  // Si lo escrito no coincide con ningún barrio, se ofrece usarlo tal cual
  const typed = query.trim();
  const options = typed && matches.length === 0 ? [{ name: typed, fee: null }] : matches;
  const customIndex = typed && matches.length === 0 ? 0 : -1;

  function choose(barrio: string) {
    onChange(barrio);
    setQuery(barrio);
    setOpen(false);
    inputRef.current?.setCustomValidity("");
  }

  function handleInput(text: string) {
    setQuery(text);
    setOpen(true);
    setActive(0);
    if (value) onChange("");
    // Evita enviar el pedido con un barrio escrito pero sin elegir
    inputRef.current?.setCustomValidity(text.trim() ? "Elige tu barrio de la lista" : "");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, options.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" && open && options[active]) {
      event.preventDefault();
      choose(options[active].name);
    } else if (event.key === "Escape" && open) {
      // Cierra la lista sin cerrar todo el pedido (el panel ignora el Escape ya atendido)
      event.preventDefault();
      setOpen(false);
    }
  }

  const showList = open && options.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>

      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 stroke-cream-dim/70"
          fill="none"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          id={id}
          type="text"
          required
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList ? `${listId}-${active}` : undefined}
          autoComplete="off"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={handleKeyDown}
          placeholder="Busca tu barrio…"
          className={`${inputClassName} pl-11 ${value ? "pr-11" : ""}`}
        />
        {value && (
          <span
            aria-hidden="true"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-basil-400"
          >
            ✓
          </span>
        )}
      </div>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Barrios"
          className="max-h-56 overflow-y-auto rounded-2xl border border-grape-700/60 bg-ink-card p-1.5"
        >
          {options.map((option, index) => {
            const isCustom = index === customIndex;
            const highlighted = index === active;
            return (
              <li
                key={isCustom ? "__escrito__" : option.name}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={option.name === value}
                // mousedown en vez de click: elige antes de que el campo pierda el foco
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(option.name);
                }}
                onMouseEnter={() => setActive(index)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  highlighted ? "bg-grape-600/50 text-cream" : "text-cream-dim"
                }`}
              >
                {isCustom ? (
                  <span>
                    Usar <span className="font-semibold text-cream">«{option.name}»</span>
                    <span className="block text-xs text-cream-dim/70">
                      Mi barrio no está en la lista · domicilio por confirmar
                    </span>
                  </span>
                ) : (
                  <>
                    <span>{option.name}</span>
                    <span className="shrink-0 text-xs font-semibold text-basil-300">
                      {option.fee !== null ? formatPrice(option.fee) : "Por confirmar"}
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
