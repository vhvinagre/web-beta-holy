import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS, getDefaultImage } from "../data/products";
import { useCart } from "../context/CartContext";
import { Grain } from "./Grain";
import { Logo } from "./Logo";
import { SlotImage } from "./SlotImage";
import { MaskedLines } from "./Reveal";
import { scrollToId } from "../utils/scroll";

const N = PRODUCTS.length;

const slotOf = (index, active) => (index - active + N) % N; // 0 centro, 1 derecha, 2 atrás, 3 izquierda

const slotStyle = (slot, mobile) => {
    switch (slot) {
        case 0:
            return { left: "50%", scale: 1, opacity: 1, filter: "blur(0px)", zIndex: 30 };
        case 1:
            return { left: mobile ? "78%" : "73%", scale: mobile ? 0.5 : 0.6, opacity: 0.85, filter: "blur(2px)", zIndex: 20 };
        case 3:
            return { left: mobile ? "22%" : "27%", scale: mobile ? 0.5 : 0.6, opacity: 0.85, filter: "blur(2px)", zIndex: 20 };
        default:
            return { left: "50%", scale: 0.4, opacity: 0, filter: "blur(4px)", zIndex: 10 };
    }
};

const useIsMobile = () => {
    const [mobile, setMobile] = useState(() => window.innerWidth < 768);
    useEffect(() => {
        const onResize = () => setMobile(window.innerWidth < 768);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return mobile;
};

export const Hero = () => {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
    const mobile = useIsMobile();
    const reduced = useReducedMotion();
    const { addItem } = useCart();
    const ref = useRef(null);

    const product = PRODUCTS[active];

    const next = useCallback(() => setActive((a) => (a + 1) % N), []);
    const prev = useCallback(() => setActive((a) => (a - 1 + N) % N), []);

    useEffect(() => {
        PRODUCTS.forEach((p) => {
            const im = new Image();
            im.src = getDefaultImage(p);
        });
    }, []);

    useEffect(() => {
        if (reduced || paused) return;
        const id = setInterval(next, 5000);
        return () => clearInterval(id);
    }, [reduced, paused, next]);

    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const stageY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 150]);
    const stageOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

    const onMouseMove = (e) => {
        if (reduced || mobile) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        setTilt({ rx: -py * 4, ry: px * 6 });
    };

    const addActive = () => {
        addItem(product, product.flavors ? product.flavors[0] : null);
        toast.success(`${product.name}${product.flavors ? ` · ${product.flavors[0].name}` : ""} agregado al carrito`);
    };

    return (
        <section
            ref={ref}
            className="relative h-[100svh] min-h-[600px] overflow-hidden text-[#F6F1E7]"
            style={{ backgroundColor: product.color, transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
                setPaused(false);
                setTilt({ rx: 0, ry: 0 });
            }}
            onMouseMove={onMouseMove}
            data-testid="hero"
        >
            <Grain opacity={0.4} />

            <div className="pointer-events-none absolute inset-x-0 top-[8%] z-[1] flex justify-center md:top-[6%]" aria-hidden="true">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.2 }}>
                    <Logo className="text-[26vw] font-bold text-[#F6F1E7]/[0.14] md:text-[16vw]" />
                </motion.div>
            </div>

            <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[72vh] w-[72vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(246,241,231,0.22) 0%, transparent 62%)" }}
                aria-hidden="true"
            />

            <motion.div style={{ y: stageY, opacity: stageOpacity }} className="absolute inset-x-0 bottom-[13.5rem] z-[10] h-[36%] md:bottom-[12rem] md:h-[54%]">
                <motion.div
                    className="relative mx-auto h-full max-w-5xl"
                    style={{ transformPerspective: 1100 }}
                    animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                >
                    <div className="absolute -bottom-3 left-1/2 z-[15] h-7 w-[42%] -translate-x-1/2 rounded-[50%] bg-black/35 blur-xl" aria-hidden="true" />
                    {PRODUCTS.map((p, i) => {
                        const slot = slotOf(i, active);
                        const s = slotStyle(slot, mobile);
                        return (
                            <motion.div
                                key={p.slug}
                                className="absolute bottom-0 aspect-[3/4] h-full"
                                style={{ transformOrigin: "center bottom" }}
                                initial={false}
                                animate={{ left: s.left, x: "-50%", scale: s.scale, opacity: s.opacity, filter: s.filter, zIndex: s.zIndex }}
                                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                                onClick={() => (slot === 1 ? next() : slot === 3 ? prev() : null)}
                                data-testid={`hero-slide-${p.slug}`}
                            >
                                <SlotImage
                                    src={getDefaultImage(p)}
                                    alt={p.name}
                                    kind={p.kind}
                                    imgClassName="drop-shadow-[0_28px_36px_rgba(0,0,0,0.35)]"
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>

            <div className="absolute bottom-[8.75rem] left-1/2 z-[40] flex -translate-x-1/2 items-center gap-3 md:bottom-[7rem] md:gap-4">
                <button
                    type="button"
                    onClick={prev}
                    aria-label="Producto anterior"
                    data-testid="hero-prev-button"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F6F1E7]/70 transition-all duration-300 hover:scale-110 hover:bg-[#F6F1E7]/10"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    onClick={addActive}
                    data-testid="hero-add-button"
                    className="rounded-full bg-[#F6F1E7] px-7 py-2.5 text-sm font-bold uppercase tracking-wider text-[#2b2620] shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-105"
                >
                    Agregar
                </button>
                <button
                    type="button"
                    onClick={next}
                    aria-label="Siguiente producto"
                    data-testid="hero-next-button"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F6F1E7]/70 transition-all duration-300 hover:scale-110 hover:bg-[#F6F1E7]/10"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            <div className="absolute bottom-6 left-5 z-[40] max-w-[56%] md:bottom-10 md:left-10 md:max-w-md">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.22em] text-[#F6F1E7]/70 sm:text-[10px] md:text-xs md:tracking-[0.24em]"
                >
                    Productos hechos con dátil
                </motion.p>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.65, duration: 0.6 }}
                    className="my-2.5 h-px w-10 origin-left bg-[#F6F1E7]/60 md:my-3"
                    aria-hidden="true"
                />
                <h1 className="font-display text-2xl uppercase leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl" data-testid="hero-product-title">
                    <MaskedLines key={product.slug} lines={product.heroLines} />
                </h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-2 text-xs text-[#F6F1E7]/80 md:text-sm"
                >
                    Todo comienza con un dátil.
                </motion.p>
            </div>

            <motion.button
                type="button"
                onClick={() => scrollToId("productos")}
                data-testid="hero-cta-variedades"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="group absolute bottom-6 right-5 z-[40] text-right md:bottom-10 md:right-10"
                aria-label="Ver variedades — ir a la sección de productos"
            >
                <span className="flex items-center gap-3 font-display text-2xl uppercase leading-[0.92] tracking-tight sm:text-4xl lg:text-5xl">
                    <span>
                        Ver
                        <br />
                        variedades
                    </span>
                    <ArrowRight
                        className="h-7 w-7 transition-transform duration-300 group-hover:translate-x-2 sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                        strokeWidth={1.75}
                    />
                </span>
            </motion.button>
        </section>
    );
};
