import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { orderPizzaLink } from "@/lib/whatsapp";
import type { Pizza } from "@/types/menu";

interface PizzaCardProps {
  pizza: Pizza;
  onOpen: (pizza: Pizza) => void;
}

export function PizzaCard({ pizza, onOpen }: PizzaCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-grape-700/45 bg-ink-card transition-all duration-300 hover:-translate-y-1.5 hover:border-grape-400/70 hover:shadow-[0_24px_60px_-18px_rgba(123,58,158,0.65)]">
      {pizza.featured && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-basil-500 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink">
          La favorita
        </span>
      )}

      {/* La foto abre el detalle; el botón invisible mantiene el foco accesible */}
      <button
        type="button"
        onClick={() => onOpen(pizza)}
        className="relative aspect-square w-full overflow-hidden bg-black"
        aria-label={`Ver detalles de la pizza ${pizza.name}`}
      >
        <Image
          src={pizza.image}
          alt={`Pizza ${pizza.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.07]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-card via-transparent to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="rounded-full bg-ink/85 px-4 py-1.5 text-xs font-semibold text-cream backdrop-blur">
            Ver detalles
          </span>
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl text-cream">{pizza.name}</h3>
          <span className="font-display shrink-0 rounded-full bg-grape-600/40 px-3 py-1 text-lg text-basil-300">
            {formatPrice(pizza.price)}
          </span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-cream-dim">{pizza.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {pizza.ingredients.slice(0, 3).map((item) => (
            <li
              key={item}
              className="rounded-full border border-grape-700/60 px-2.5 py-1 text-[0.7rem] text-cream-dim"
            >
              {item}
            </li>
          ))}
          {pizza.ingredients.length > 3 && (
            <li className="rounded-full border border-grape-700/60 px-2.5 py-1 text-[0.7rem] text-cream-dim">
              +{pizza.ingredients.length - 3}
            </li>
          )}
        </ul>

        <a
          href={orderPizzaLink(pizza)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 block rounded-full bg-basil-500 px-4 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:bg-basil-400"
        >
          Pedir por WhatsApp
        </a>
      </div>
    </article>
  );
}
