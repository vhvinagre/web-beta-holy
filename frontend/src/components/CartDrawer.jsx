import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Send, X } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { clp } from "../data/products";
import { SlotImage } from "./SlotImage";

const WHATSAPP_NUMBER = "56912345678"; // placeholder — reemplazar por +56 9 XXXX XXXX real
const CONTACT_EMAIL = "hola@holy.cl"; // placeholder

const buildOrderText = (items, total) =>
    [
        "Hola hōly, quiero coordinar un pedido:",
        ...items.map((i) => `• ${i.qty} × ${i.name}${i.flavor ? ` (${i.flavor})` : ""} — ${clp(i.price * i.qty)}`),
        `Total: ${clp(total)}`,
    ].join("\n");

export const CartDrawer = () => {
    const { items, changeQty, total, open, setOpen } = useCart();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, setOpen]);

    const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderText(items, total))}`;

    const sendMail = (e) => {
        e.preventDefault();
        const body = [
            buildOrderText(items, total),
            "",
            `Nombre: ${form.nombre}`,
            `Correo: ${form.email}`,
            form.mensaje ? `Mensaje: ${form.mensaje}` : "",
        ].join("\n");
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
            `Pedido hōly — ${form.nombre || "nuevo pedido"}`,
        )}&body=${encodeURIComponent(body)}`;
        toast.success("Abriendo tu correo para enviar el pedido");
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-[2px]"
                        onClick={() => setOpen(false)}
                        data-testid="cart-overlay"
                    />
                    <motion.aside
                        key="drawer"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Carrito de compras"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-[#1b1b1b] text-[#F6F1E7]"
                        data-testid="cart-drawer"
                    >
                        <div className="flex items-center justify-between border-b border-[#F6F1E7]/10 px-6 py-5">
                            <h2 className="font-display text-3xl lowercase tracking-tight" data-testid="cart-title">
                                carrito
                            </h2>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Cerrar carrito"
                                data-testid="cart-close-button"
                                className="rounded-full p-2 transition-all duration-300 hover:rotate-90 hover:bg-[#F6F1E7]/10"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-5">
                            {items.length === 0 ? (
                                <p className="mt-16 text-center text-[#9c8f79]" data-testid="cart-empty">
                                    Tu carrito está vacío.
                                </p>
                            ) : (
                                <ul className="space-y-5" data-testid="cart-items">
                                    {items.map((item) => (
                                        <li key={item.key} className="flex items-center gap-4" data-testid={`cart-item-${item.key}`}>
                                            <div className="flex h-16 w-14 shrink-0 items-center justify-center rounded-md bg-[#F6F1E7]/[0.06] p-1">
                                                <SlotImage src={item.image} alt={item.name} kind={item.kind} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold">
                                                    {item.name}
                                                    {item.flavor && <span className="text-[#9c8f79]"> · {item.flavor}</span>}
                                                </p>
                                                <p className="mt-0.5 text-xs text-[#8a7d68]">
                                                    {item.qty} × {clp(item.price)}
                                                </p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => changeQty(item.key, -1)}
                                                        aria-label={`Quitar una unidad de ${item.name}`}
                                                        data-testid={`cart-dec-${item.key}`}
                                                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#F6F1E7]/25 transition-colors duration-300 hover:border-[#B5652E] hover:text-[#B5652E]"
                                                    >
                                                        <Minus className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => changeQty(item.key, 1)}
                                                        aria-label={`Agregar una unidad de ${item.name}`}
                                                        data-testid={`cart-inc-${item.key}`}
                                                        className="flex h-7 w-7 items-center justify-center rounded-full border border-[#F6F1E7]/25 transition-colors duration-300 hover:border-[#B5652E] hover:text-[#B5652E]"
                                                    >
                                                        <Plus className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold">{clp(item.price * item.qty)}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="border-t border-[#F6F1E7]/10 px-6 py-5">
                                <div className="flex items-center justify-between text-lg">
                                    <span className="text-[#9c8f79]">Total</span>
                                    <span className="font-bold" data-testid="cart-total">
                                        {clp(total)}
                                    </span>
                                </div>
                                <a
                                    href={waHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="whatsapp-checkout-button"
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#B5652E] py-3.5 text-sm font-bold uppercase tracking-wider text-[#F6F1E7] transition-transform duration-300 hover:scale-[1.03]"
                                >
                                    Coordinar pedido
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setShowForm((s) => !s)}
                                    data-testid="toggle-contact-form"
                                    aria-expanded={showForm}
                                    className="mt-3 w-full text-center text-xs text-[#8a7d68] underline underline-offset-4 transition-colors hover:text-[#F6F1E7]"
                                >
                                    {showForm ? "Ocultar formulario" : "o coordina con un formulario"}
                                </button>
                                <AnimatePresence initial={false}>
                                    {showForm && (
                                        <motion.form
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                            className="overflow-hidden"
                                            onSubmit={sendMail}
                                            data-testid="cart-contact-form"
                                        >
                                            <div className="space-y-3 pt-4">
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="Tu nombre"
                                                    value={form.nombre}
                                                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                                    data-testid="contact-name-input"
                                                    className="w-full rounded-md border border-[#F6F1E7]/15 bg-transparent px-3 py-2.5 text-sm placeholder:text-[#6b6154] focus:border-[#B5652E] focus:outline-none"
                                                />
                                                <input
                                                    required
                                                    type="email"
                                                    placeholder="Tu correo"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                    data-testid="contact-email-input"
                                                    className="w-full rounded-md border border-[#F6F1E7]/15 bg-transparent px-3 py-2.5 text-sm placeholder:text-[#6b6154] focus:border-[#B5652E] focus:outline-none"
                                                />
                                                <textarea
                                                    rows="2"
                                                    placeholder="Mensaje (opcional): retiro, despacho, dudas…"
                                                    value={form.mensaje}
                                                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                                                    data-testid="contact-message-input"
                                                    className="w-full resize-none rounded-md border border-[#F6F1E7]/15 bg-transparent px-3 py-2.5 text-sm placeholder:text-[#6b6154] focus:border-[#B5652E] focus:outline-none"
                                                />
                                                <button
                                                    type="submit"
                                                    data-testid="contact-submit-button"
                                                    className="flex w-full items-center justify-center gap-2 rounded-full border border-[#F6F1E7]/30 py-3 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] hover:bg-[#F6F1E7] hover:text-[#1b1b1b]"
                                                >
                                                    <Send className="h-4 w-4" /> Enviar pedido por correo
                                                </button>
                                            </div>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};
