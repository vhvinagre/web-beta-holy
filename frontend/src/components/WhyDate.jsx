import { Leaf, ListChecks, Wheat, Zap } from "lucide-react";
import { Grain } from "./Grain";
import { Reveal, MaskedLines } from "./Reveal";

const REASONS = [
    { n: "01", icon: Leaf, title: "Dulzor natural", text: "El dátil endulza solo. Por eso no llevamos azúcar añadida." },
    { n: "02", icon: Wheat, title: "Alto en fibra", text: "Ayuda a que la energía dure y caiga suave." },
    { n: "03", icon: Zap, title: "Energía real", text: "Ideal antes o después de entrenar, o para el bajón de las 4 pm." },
    { n: "04", icon: ListChecks, title: "Sin culpa", text: "Ingredientes que sabes leer y pronunciar." },
];

export const WhyDate = () => (
    <section id="por-que-datil" className="relative overflow-hidden bg-[#2b2620] py-24 text-[#F6F1E7] md:py-32" data-testid="why-date-section">
        <Grain opacity={0.16} />
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
            <Reveal>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B5652E]">¿Por qué dátil?</p>
            </Reveal>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                <MaskedLines inView lines={["La base de todo lo que hacemos."]} />
            </h2>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {REASONS.map((r, i) => (
                    <Reveal key={r.n} delay={i * 0.08} className="h-full">
                        <article
                            className="group flex h-full flex-col rounded-lg bg-[#382f26] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#453a2e] md:p-7"
                            data-testid={`why-card-${r.n}`}
                        >
                            <div className="flex items-start justify-between">
                                <span className="font-display text-4xl text-[#F6F1E7]/20 transition-colors duration-300 group-hover:text-[#B5652E]/60">
                                    {r.n}
                                </span>
                                <r.icon className="h-6 w-6 text-[#B5652E]" strokeWidth={1.5} aria-hidden="true" />
                            </div>
                            <h3 className="mt-8 text-lg font-semibold">{r.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-[#9c8f79]">{r.text}</p>
                        </article>
                    </Reveal>
                ))}
            </div>

            <div className="mt-20 text-center md:mt-28">
                <h3 className="font-display text-4xl uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl" data-testid="why-date-statement">
                    <MaskedLines inView lines={["TODO COMIENZA", "CON UN DÁTIL."]} />
                </h3>
            </div>
        </div>
    </section>
);
