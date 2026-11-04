"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { formatPrice } from "@/lib/format";
import { amountToPay, orderLink, type Order } from "@/lib/order";

interface OrderReceiptProps {
  order: Order;
  onDone: () => void;
}

/** Recibo que queda en pantalla después de enviar el pedido. */
export function OrderReceipt({ order, onDone }: OrderReceiptProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const method = order.payment;

  async function copy(id: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(id);
      window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 2000);
    } catch {
      // Sin permiso de portapapeles: el dato sigue visible para copiarlo a mano
    }
  }

  const copyButton = (id: string, value: string) => (
    <button
      type="button"
      onClick={() => copy(id, value)}
      className="shrink-0 rounded-full border border-grape-600/70 px-3 py-1.5 text-xs font-semibold text-cream-dim transition-colors hover:border-basil-400 hover:text-basil-300"
    >
      {copied === id ? "¡Copiado!" : "Copiar"}
    </button>
  );

  return (
    <div className="flex flex-col p-6 sm:p-8">
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-basil-400">Pedido enviado</span>
      <h2 id="pedido-titulo" className="font-display mt-2 text-4xl text-cream">
        Tu recibo
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-cream-dim">
        Abrimos WhatsApp con tu pedido. Dale <strong className="text-cream">enviar</strong> y te confirmamos el
        domicilio y el tiempo de entrega.
      </p>

      <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-basil-500/40 bg-basil-500/10 p-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-widest text-cream-dim">Referencia</p>
          <p className="font-display mt-1 text-2xl tracking-wider text-basil-300">{order.ref}</p>
        </div>
        {copyButton("ref", order.ref)}
      </div>

      <ul className="mt-5 flex flex-col gap-2 text-sm">
        {order.lines.map((line) => (
          <li key={line.name} className="flex justify-between gap-3 text-cream-dim">
            <span>
              {line.qty} × <span className="text-cream">{line.name}</span>
            </span>
            <span>{formatPrice(line.qty * line.price)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-baseline justify-between border-t border-grape-700/50 pt-3">
        <span className="text-sm text-cream-dim">Total pizzas</span>
        <span className="font-display text-2xl text-basil-300">{formatPrice(order.subtotal)}</span>
      </div>
      <p className="mt-1 text-right text-xs text-cream-dim">+ domicilio, te lo confirmamos.</p>

      <p className="mt-4 text-sm text-cream-dim">
        Entrega a <span className="text-cream">{order.name}</span> en{" "}
        <span className="text-cream">
          {order.address}, {order.barrio}
        </span>
        .
      </p>

      <div className="mt-6 rounded-2xl border border-grape-700/45 bg-ink-card/60 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-cream-dim">Cómo pagar</h3>
        {method.account ? (
          <>
            <ol className="mt-3 flex list-decimal flex-col gap-3 pl-5 text-sm leading-relaxed text-cream-dim marker:text-basil-400">
              <li>
                Transfiere <span className="font-semibold text-cream">{amountToPay(order)}</span> a {method.label} (
                {method.note.toLowerCase()}):
                <span className="mt-2 flex items-center justify-between gap-3">
                  <span className="font-display text-xl text-cream">{method.display}</span>
                  {copyButton("cuenta", method.account)}
                </span>
              </li>
              <li>
                Envía el comprobante al WhatsApp{" "}
                <span className="font-semibold text-cream">{site.phoneDisplay}</span> (el mismo chat del pedido) con la
                referencia <span className="font-semibold text-basil-300">{order.ref}</span>.
              </li>
            </ol>
          </>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-cream-dim">
            Pagas en <span className="font-semibold text-cream">efectivo</span> cuando recibas tu pedido
            {order.cashAmount ? (
              <>
                . Pagas con <span className="font-semibold text-cream">{formatPrice(order.cashAmount)}</span>; llevamos
                la devuelta
              </>
            ) : null}
            .
          </p>
        )}
      </div>

      <a
        href={orderLink(order)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 block w-full rounded-full border border-grape-600/60 px-6 py-3.5 text-center font-semibold text-cream transition-colors hover:border-basil-400 hover:text-basil-300"
      >
        No se abrió WhatsApp, abrir otra vez
      </a>
      <button
        type="button"
        onClick={onDone}
        className="mt-3 block w-full rounded-full bg-basil-500 px-6 py-3.5 text-center font-semibold text-ink transition-colors hover:bg-basil-400"
      >
        Listo
      </button>
    </div>
  );
}
