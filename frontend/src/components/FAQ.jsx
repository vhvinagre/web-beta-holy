import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, MaskedLines } from "./Reveal";

const FAQS = [
    {
        q: "¿Qué hace especial al dátil?",
        a: "Es una fruta naturalmente dulce y rica en fibra. La usamos como base de todo en lugar de azúcar refinada.",
    },
    {
        q: "¿Los productos hōly tienen azúcar añadida?",
        a: "No. Toda la dulzura viene del dátil y de ingredientes naturales, sin endulzantes artificiales.",
    },
    {
        q: "¿Son aptos para toda la familia?",
        a: "Sí. Están pensados para colaciones, snacks y el día a día de grandes y chicos.",
    },
    {
        q: "¿Dónde puedo comprar hōly?",
        a: "Puedes armar tu pedido desde esta página y coordinarlo con nosotros (ver el carrito).",
    },
    {
        q: "¿Hacen despacho?",
        a: "Sí, coordinamos despacho al confirmar tu pedido.",
    },
];

export const FAQ = () => {
    const [openIdx, setOpenIdx] = useState(0);

    return (
        <section id="dudas" className="bg-[#F6F1E7] py-24 md:py-32" data-testid="faq-section">
            <div className="mx-auto max-w-[720px] px-5">
                <Reveal>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B5652E]">Preguntas</p>
                </Reveal>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#2b2620] md:text-4xl">
                    <MaskedLines inView lines={["¿Tienes dudas?"]} />
                </h2>

                <Reveal delay={0.15}>
                    <div className="mt-10 divide-y divide-[#2b2620]/10 border-y border-[#2b2620]/10">
                        {FAQS.map((f, i) => {
                            const isOpen = openIdx === i;
                            return (
                                <div key={i}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenIdx(isOpen ? -1 : i)}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-panel-${i}`}
                                        data-testid={`faq-question-${i}`}
                                        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300 hover:text-[#B5652E]"
                                    >
                                        <span className="font-semibold text-[#2b2620]">{f.q}</span>
                                        <span className="shrink-0 font-light text-2xl leading-none text-[#B5652E]" aria-hidden="true">
                                            {isOpen ? "−" : "+"}
                                        </span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                id={`faq-panel-${i}`}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pb-6 pr-10 leading-relaxed text-[#6b6154]" data-testid={`faq-answer-${i}`}>
                                                    {f.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
