import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { QUALITY_CHIPS, clp, getProduct } from "../data/products";
import { useCart } from "../context/CartContext";
import { Grain } from "../components/Grain";
import { Logo } from "../components/Logo";
import { SlotImage } from "../components/SlotImage";
import { MaskedLines } from "../components/Reveal";

export default function ProductPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const product = getProduct(slug);
    const [flavor, setFlavor] = useState(null);

    useEffect(() => {
        setFlavor(product && product.flavors ? product.flavors[0] : null);
    }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!product) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#F6F1E7] px-5 text-center text-[#2b2620]">
                <h1 className="font-display text-4xl uppercase tracking-tight">Producto no encontrado</h1>
                <Link to="/" data-testid="not-found-home-link" className="rounded-full bg-[#B5652E] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#F6F1E7]">
                    Volver al inicio
                </Link>
            </main>
        );
    }

    const accent = flavor ? flavor.accent : "#F6F1E7";
    const image = flavor ? flavor.image : product.image;

    const add = () => {
        addItem(product, flavor);
        toast.success(`${product.name}${flavor ? ` · ${flavor.name}` : ""} agregado al carrito`);
    };

    return (
        <main
            className="relative min-h-screen overflow-hidden text-[#F6F1E7]"
            style={{ backgroundColor: product.color, transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)" }}
            data-testid="product-page"
        >
            <Grain opacity={0.35} />
            <div className="pointer-events-none absolute -right-[8vw] top-[12%] z-[1]" aria-hidden="true">
                <Logo className="text-[22vw] font-bold text-[#F6F1E7]/[0.08]" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-24 md:px-8 md:pt-28">
                <button
                    type="button"
                    onClick={() => navigate("/", { state: { scrollTo: "productos" } })}
                    data-testid="product-back-button"
                    className="inline-flex items-center gap-2 rounded-full border border-[#F6F1E7]/50 px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:bg-[#F6F1E7]/10"
                >
                    <ArrowLeft className="h-4 w-4" /> Volver
                </button>

                <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="relative flex items-center justify-center">
                        <div
                            className="absolute h-[72%] w-[72%] rounded-full blur-3xl transition-all duration-700"
                            style={{ background: `radial-gradient(circle, ${accent}66 0%, transparent 65%)` }}
                            aria-hidden="true"
                        />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={image}
                                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                                className="relative aspect-[3/4] w-full max-w-xs sm:max-w-sm md:max-w-md"
                            >
                                <SlotImage
                                    src={image}
                                    alt={`${product.name}${flavor ? ` sabor ${flavor.name}` : ""}`}
                                    kind={product.kind}
                                    imgClassName="drop-shadow-[0_36px_48px_rgba(0,0,0,0.4)]"
                                />
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute bottom-[6%] left-1/2 h-6 w-[46%] -translate-x-1/2 rounded-[50%] bg-black/30 blur-xl" aria-hidden="true" />
                    </div>

                    <div>
                        {product.isNew && (
                            <span className="mb-4 inline-block rounded-full bg-[#F6F1E7] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#2b2620]">
                                Nuevo lanzamiento
                            </span>
                        )}
                        <h1 className="font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl" data-testid="product-title">
                            <MaskedLines key={product.slug} lines={product.heroLines} />
                        </h1>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {QUALITY_CHIPS.map((chip) => (
                                <span
                                    key={chip}
                                    className="rounded-full border border-[#F6F1E7]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F6F1E7]/90"
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>

                        <p className="mt-6 max-w-lg leading-relaxed text-[#F6F1E7]/85">{product.description}</p>

                        {product.flavors && (
                            <div className="mt-8">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F6F1E7]/60">Elige tu variedad</p>
                                <div className="mt-3 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Variedades de sabor">
                                    {product.flavors.map((f) => {
                                        const selected = flavor && flavor.id === f.id;
                                        return (
                                            <button
                                                key={f.id}
                                                type="button"
                                                role="radio"
                                                aria-checked={selected}
                                                onClick={() => setFlavor(f)}
                                                data-testid={`flavor-chip-${f.id}`}
                                                className="rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105"
                                                style={{
                                                    borderColor: selected ? f.accent : "rgba(246,241,231,0.35)",
                                                    backgroundColor: selected ? `${f.accent}2e` : "transparent",
                                                    color: "#F6F1E7",
                                                }}
                                            >
                                                {f.name}
                                            </button>
                                        );
                                    })}
                                </div>
                                <AnimatePresence mode="wait">
                                    {flavor && (
                                        <motion.p
                                            key={flavor.id}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="mt-3 flex items-center gap-2 text-sm text-[#F6F1E7]/75"
                                            data-testid="flavor-blurb"
                                        >
                                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: flavor.accent }} aria-hidden="true" />
                                            {flavor.blurb}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        <div className="mt-8 flex flex-wrap items-center gap-5">
                            <span className="text-3xl font-bold tracking-tight" data-testid="product-price">
                                {clp(product.price)}
                            </span>
                            <button
                                type="button"
                                onClick={add}
                                data-testid="product-add-button"
                                className="rounded-full bg-[#F6F1E7] px-7 py-3 text-sm font-bold uppercase tracking-wider text-[#2b2620] shadow-lg shadow-black/25 transition-transform duration-300 hover:scale-105"
                            >
                                Agregar al carrito
                            </button>
                        </div>

                        <div className="mt-12 grid gap-10 border-t border-[#F6F1E7]/15 pt-8 sm:grid-cols-2">
                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F6F1E7]/60">Ingredientes</h2>
                                <ul className="mt-4 space-y-2" data-testid="product-ingredients">
                                    {product.ingredients.map((ing) => (
                                        <li key={ing} className="flex items-start gap-2.5 text-sm text-[#F6F1E7]/85">
                                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
                                            {ing}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#F6F1E7]/60">Info nutricional</h2>
                                <dl className="mt-4" data-testid="product-nutrition">
                                    {product.nutrition.map(([k, v]) => (
                                        <div key={k} className="flex items-center justify-between border-b border-[#F6F1E7]/10 py-1.5 text-sm">
                                            <dt className="text-[#F6F1E7]/70">{k}</dt>
                                            <dd className="font-semibold">{v}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
