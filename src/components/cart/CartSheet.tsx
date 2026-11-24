"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BarrioPicker } from "@/components/cart/BarrioPicker";
import { OrderReceipt } from "@/components/cart/OrderReceipt";
import { QtyStepper } from "@/components/cart/QtyStepper";
import { site } from "@/config/site";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { deliveryFee } from "@/data/barrios";
import { ASAP, deliverySlots, storeStatus } from "@/lib/hours";
import { createOrderRef, orderLink, type Order } from "@/lib/order";
import { useNow } from "@/lib/useStoreStatus";

const field =
  "w-full rounded-2xl border border-grape-700/60 bg-ink-card px-4 py-3 text-sm text-cream placeholder:text-cream-dim/60 focus:border-basil-400 focus:outline-none";
const label = "text-xs font-semibold uppercase tracking-widest text-cream-dim";

/** Panel del pedido: pizzas, datos de entrega en Yumbo, pago y recibo con referencia. */
export function CartSheet() {
  const { lines, count, subtotal, setQty, clear, isOpen, close } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [barrio, setBarrio] = useState("");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState("");
  const [cash, setCash] = useState("");
  const [when, setWhen] = useState("");
  const now = useNow();
  /** Pedido ya enviado; mientras exista se muestra el recibo. */
  const [sent, setSent] = useState<Order | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  // Si vacían el carrito sin haber enviado, se cierra solo
  useEffect(() => {
    if (isOpen && count === 0 && !sent) close();
  }, [isOpen, count, sent, close]);

  // Abiertos: "lo antes posible" por defecto. Cerrados: hay que elegir hora de la próxima apertura.
  const status = now ? storeStatus(now) : null;
  const slots = now ? deliverySlots(now) : [];
  const chosenSlot =
    slots.find((s) => s.value === when) ?? (status?.open ? slots.find((s) => s.value === ASAP) : undefined);

  const isCash = payment === "efectivo";
  const cashAmount = isCash ? Number(cash.replace(/\D/g, "")) || null : null;
  // El domicilio sale del barrio elegido; sin barrio (o sin precio) queda por confirmar
  const fee = barrio ? deliveryFee(barrio) : null;
  const total = subtotal + (fee ?? 0);
  const cashTooLow = cashAmount !== null && cashAmount < total;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const method = site.payments.find((m) => m.id === payment);
    if (cashTooLow || !method || !chosenSlot) return;

    const order: Order = {
      ref: createOrderRef(),
      lines: lines.map((line) => ({ name: line.pizza.name, qty: line.qty, price: line.pizza.price })),
      subtotal,
      deliveryFee: fee,
      when: chosenSlot.label,
      scheduled: chosenSlot.value !== ASAP,
      name: name.trim(),
      address: address.trim(),
      barrio,
      notes: notes.trim(),
      payment: method,
      cashAmount,
    };
    const link = orderLink(order);

    // Pestaña nueva para WhatsApp; la página se queda aquí con el recibo.
    // (Con "noopener" window.open siempre devuelve null, por eso se corta a mano.)
    const tab = window.open(link, "_blank");
    if (tab) tab.opener = null;
    else window.location.href = link;

    // El pedido ya salió: carrito y formulario quedan limpios para la próxima
    clear();
    setName("");
    setAddress("");
    setBarrio("");
    setNotes("");
    setPayment("");
    setCash("");
    setWhen("");
    setSent(order);
  }

  return (
    // El recibo es solo para el momento: se borra cuando termina de cerrarse el panel
    <AnimatePresence onExitComplete={() => setSent(null)}>
      {isOpen && (
        <m.div
          key="cart-sheet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pedido-titulo"
          onClick={close}
        >
          <m.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl border border-grape-600/50 bg-ink-soft sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink/80 text-xl text-cream backdrop-blur transition-colors hover:bg-grape-600"
              aria-label="Cerrar pedido"
            >
              ×
            </button>

            {sent ? (
              <OrderReceipt order={sent} onDone={close} />
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col p-6 sm:p-8">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-basil-400">
                  Domicilio en {site.city}
                </span>
                <h2 id="pedido-titulo" className="font-display mt-2 text-4xl text-cream">
                  Tu pedido
                </h2>

                {status && !status.open && (
                  <p className="mt-4 rounded-2xl border border-crust/40 bg-crust/10 p-4 text-sm leading-relaxed text-cream-dim">
                    <span className="font-semibold text-crust">Ahora estamos cerrados.</span> Abrimos {status.opensDay} a
                    las {status.opensAt}: deja tu pedido programado y te lo llevamos a la hora que elijas.
                  </p>
                )}

                <ul className="mt-6 flex flex-col gap-3">
                  {lines.map(({ pizza, qty }) => (
                    <li
                      key={pizza.slug}
                      className="flex items-center gap-3 rounded-2xl border border-grape-700/45 bg-ink-card/60 p-3"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-black">
                        <Image src={pizza.image} alt="" fill sizes="56px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display truncate text-lg text-cream">{pizza.name}</p>
                        <p className="text-xs text-cream-dim">{formatPrice(qty * pizza.price)}</p>
                      </div>
                      <div className="w-24 shrink-0">
                        <QtyStepper
                          size="sm"
                          qty={qty}
                          name={pizza.name}
                          onChange={(value) => setQty(pizza.slug, value)}
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                <dl className="mt-5 flex flex-col gap-1.5 border-t border-grape-700/50 pt-4 text-sm text-cream-dim">
                  <div className="flex justify-between gap-3">
                    <dt>Pizzas</dt>
                    <dd>{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt>Domicilio{barrio ? ` a ${barrio}` : ""}</dt>
                    <dd>{!barrio ? "Elige tu barrio" : fee === null ? "Por confirmar" : formatPrice(fee)}</dd>
                  </div>
                  <div className="mt-1 flex items-baseline justify-between gap-3">
                    <dt>Total</dt>
                    <dd className="font-display text-3xl text-basil-300">
                      {formatPrice(total)}
                      {barrio && fee === null ? <span className="text-base"> + domicilio</span> : null}
                    </dd>
                  </div>
                </dl>

                <fieldset className="mt-8 flex flex-col gap-4">
                  <legend className="font-display mb-4 text-2xl text-cream">¿A dónde lo llevamos?</legend>

                  <label className="flex flex-col gap-2">
                    <span className={label}>Nombre</span>
                    <input
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="¿A nombre de quién?"
                      className={field}
                    />
                  </label>

                  <BarrioPicker
                    value={barrio}
                    onChange={setBarrio}
                    inputClassName={field}
                    label={<span className={label}>Barrio en {site.city}</span>}
                  />

                  <label className="flex flex-col gap-2">
                    <span className={label}>Dirección</span>
                    <input
                      required
                      autoComplete="street-address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ej: Calle 5 # 4-20, casa 3"
                      className={field}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className={label}>
                      Indicaciones <span className="normal-case tracking-normal text-cream-dim/70">(opcional)</span>
                    </span>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Punto de referencia, apartamento, sin cebolla…"
                      className={`${field} resize-none`}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className={label}>{status?.open ? "¿Cuándo lo quieres?" : "¿Para qué hora?"}</span>
                    <select
                      required
                      value={chosenSlot?.value ?? ""}
                      onChange={(e) => setWhen(e.target.value)}
                      className={`${field} ${chosenSlot ? "" : "text-cream-dim/60"}`}
                    >
                      {!chosenSlot && (
                        <option value="" disabled>
                          Elige la hora de entrega
                        </option>
                      )}
                      {slots.map((slot) => (
                        <option key={slot.value} value={slot.value} className="text-cream">
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </fieldset>

                <fieldset className="mt-8">
                  <legend className="font-display mb-4 text-2xl text-cream">¿Cómo pagas?</legend>
                  <div className="grid grid-cols-3 gap-2">
                    {site.payments.map((method) => {
                      const active = payment === method.id;
                      return (
                        <label
                          key={method.id}
                          className={`cursor-pointer rounded-2xl border px-2 py-3 text-center text-sm font-semibold transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-basil-400 ${
                            active
                              ? "border-grape-500 bg-grape-500 text-cream shadow-lg shadow-grape-700/40"
                              : "border-grape-700/60 text-cream-dim hover:border-grape-400/70 hover:text-cream"
                          }`}
                        >
                          <input
                            type="radio"
                            name="pago"
                            required
                            value={method.id}
                            checked={active}
                            onChange={() => setPayment(method.id)}
                            className="sr-only"
                          />
                          {method.label}
                        </label>
                      );
                    })}
                  </div>

                  {payment && !isCash && (
                    <p className="mt-3 text-xs leading-relaxed text-cream-dim">
                      Transfiere a {site.payments.find((m) => m.id === payment)?.label}{" "}
                      <span className="font-semibold text-cream">
                        {site.payments.find((m) => m.id === payment)?.display}
                      </span>{" "}
                      y envíanos el comprobante por el mismo chat.
                    </p>
                  )}

                  {isCash && (
                    <label className="mt-4 flex flex-col gap-2">
                      <span className={label}>
                        ¿Con cuánto pagas? <span className="normal-case tracking-normal text-cream-dim/70">(opcional, para la devuelta)</span>
                      </span>
                      <input
                        inputMode="numeric"
                        value={cash}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "");
                          setCash(digits ? formatPrice(Number(digits)) : "");
                        }}
                        placeholder={`Ej: ${formatPrice(Math.ceil(total / 50000) * 50000 || 50000)}`}
                        className={field}
                        aria-invalid={cashTooLow}
                      />
                      {cashTooLow && (
                        <span className="text-xs text-crust">Debe ser igual o mayor al total ({formatPrice(total)}).</span>
                      )}
                    </label>
                  )}
                </fieldset>

                <div className="mt-8 flex items-baseline justify-between border-t border-grape-700/50 pt-4">
                  <span className="text-sm text-cream-dim">{barrio ? "Total a pagar" : "Total sin domicilio"}</span>
                  <span className="font-display text-2xl text-basil-300">
                    {formatPrice(total)}
                    {barrio && fee === null ? <span className="text-sm"> + domicilio</span> : null}
                  </span>
                </div>

                <button
                  type="submit"
                  className="mt-4 block w-full rounded-full bg-basil-500 px-6 py-3.5 text-center font-semibold text-ink transition-colors hover:bg-basil-400"
                >
                  Confirmar pedido
                </button>
                <p className="mt-3 text-center text-xs text-cream-dim">
                  Te mostramos el recibo con la referencia y se abre WhatsApp con el pedido listo para enviar.
                </p>
              </form>
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
