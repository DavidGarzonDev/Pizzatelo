import { site } from "@/config/site";

const phrases = [
  "Masa artesanal",
  "Horneada al momento",
  `Domicilio en ${site.city}`,
  "Ingredientes frescos",
  "Pide en un toque",
  "Cocina oculta",
];

/** Cinta inclinada con frases de la marca que corre sin parar entre el inicio y el menú. */
export function Marquee() {
  // El contenido va dos veces para que el bucle no tenga cortes
  const items = [...phrases, ...phrases];

  return (
    <div aria-hidden="true" className="relative overflow-hidden py-8">
      <div className="-mx-4 -rotate-2 border-y border-basil-600/60 bg-basil-500 py-3 shadow-[0_12px_40px_-12px_rgba(124,174,42,0.55)]">
        <div className="animate-marquee flex w-max">
          {items.map((phrase, index) => (
            <span key={index} className="font-display flex items-center gap-6 pr-6 text-xl text-ink sm:text-2xl">
              {phrase}
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-grape-700" aria-hidden="true">
                <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
