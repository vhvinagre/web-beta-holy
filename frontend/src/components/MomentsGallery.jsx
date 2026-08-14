import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { Reveal, MaskedLines } from "./Reveal";
import { SlotSilhouette } from "./SlotImage";

const SLOTS = [
    { type: "img", src: "/img/consumo-01.jpg", label: "oficina", ratio: "aspect-[4/5]" },
    { type: "img", src: "/img/consumo-02.jpg", label: "post-entreno", ratio: "aspect-square" },
    { type: "video", src: "/media/consumo-03.mp4", label: "colación", ratio: "aspect-[4/5]" },
    { type: "img", src: "/img/consumo-04.jpg", label: "desayuno", ratio: "aspect-[3/4]" },
    { type: "video", src: "/media/consumo-05.mp4", label: "media tarde", ratio: "aspect-square" },
    { type: "img", src: "/img/consumo-06.jpg", label: "después de correr", ratio: "aspect-[4/5]" },
    { type: "img", src: "/img/consumo-07.jpg", label: "gimnasio", ratio: "aspect-[3/4]" },
    { type: "img", src: "/img/consumo-08.jpg", label: "colegio", ratio: "aspect-square" },
    { type: "video", src: "/media/consumo-09.mp4", label: "fin de semana", ratio: "aspect-[3/4]" },
    { type: "img", src: "/img/consumo-10.jpg", label: "on the go", ratio: "aspect-[4/5]" },
];

const TINTS = ["#4B4FA0", "#B5652E", "#A9862F", "#6E4423"];

const SlotMedia = ({ slot, index, onReady }) => {
    const [failed, setFailed] = useState(false);
    const reduced = useReducedMotion();

    if (failed) {
        return (
            <div
                className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#2b2620]/55"
                role="img"
                aria-label={`Espacio reservado para ${slot.src.split("/").pop()}`}
                data-testid={`gallery-slot-${index}`}
            >
                <SlotSilhouette kind={slot.type === "video" ? "video" : "photo"} className="h-10 w-10" />
                <span className="font-mono text-[10px] tracking-wide opacity-80">{slot.src.split("/").pop()}</span>
            </div>
        );
    }

    const cls = "h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105";

    return slot.type === "video" ? (
        <video
            src={slot.src}
            muted
            loop
            playsInline
            preload="metadata"
            autoPlay={!reduced}
            onLoadedData={() => onReady(index)}
            onError={() => setFailed(true)}
            className={cls}
            aria-label={`hōly — ${slot.label}`}
        />
    ) : (
        <img
            src={slot.src}
            alt={`hōly — ${slot.label}`}
            loading="lazy"
            onLoad={() => onReady(index)}
            onError={() => setFailed(true)}
            className={cls}
        />
    );
};

export const MomentsGallery = () => {
    const [available, setAvailable] = useState(() => new Set());
    const [lightbox, setLightbox] = useState(null);

    const markReady = (i) => setAvailable((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));

    return (
        <section id="momentos" className="bg-[#F6F1E7] py-24 md:py-32" data-testid="moments-section">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="max-w-2xl">
                    <Reveal>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B5652E]">hōly en tu día</p>
                    </Reveal>
                    <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#2b2620] md:text-4xl">
                        <MaskedLines inView lines={["Cualquier momento es", "un buen momento."]} />
                    </h2>
                </div>

                <div className="mt-12 columns-2 gap-4 md:columns-3">
                    {SLOTS.map((slot, i) => (
                        <Reveal key={slot.src} delay={(i % 3) * 0.08} className="mb-4 break-inside-avoid">
                            <button
                                type="button"
                                onClick={() => available.has(i) && setLightbox(slot)}
                                aria-label={available.has(i) ? `Ver ${slot.label} en grande` : `Espacio para ${slot.src.split("/").pop()}`}
                                data-testid={`gallery-tile-${i}`}
                                className={`group relative block w-full overflow-hidden rounded-lg ${slot.ratio}`}
                                style={{ backgroundColor: `${TINTS[i % TINTS.length]}14` }}
                            >
                                <SlotMedia slot={slot} index={i} onReady={markReady} />
                                <span className="absolute bottom-2.5 left-2.5 rounded-full bg-[#2b2620]/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F6F1E7] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                                    {slot.label}
                                </span>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-5 backdrop-blur-sm"
                        onClick={() => setLightbox(null)}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Vista ampliada: ${lightbox.label}`}
                        data-testid="gallery-lightbox"
                    >
                        <button
                            type="button"
                            onClick={() => setLightbox(null)}
                            aria-label="Cerrar vista ampliada"
                            data-testid="lightbox-close-button"
                            className="absolute right-5 top-5 rounded-full border border-[#F6F1E7]/40 p-2.5 text-[#F6F1E7] transition-transform duration-300 hover:rotate-90"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <motion.div
                            initial={{ scale: 0.94, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="max-h-[82vh] max-w-4xl overflow-hidden rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {lightbox.type === "video" ? (
                                <video src={lightbox.src} controls autoPlay muted loop playsInline className="max-h-[82vh] w-auto" />
                            ) : (
                                <img src={lightbox.src} alt={`hōly — ${lightbox.label}`} className="max-h-[82vh] w-auto object-contain" />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
