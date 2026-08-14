import { useNavigate } from "react-router-dom";
import { ArrowRight, Cookie, Droplet, Nut, Zap } from "lucide-react";
import { Grain } from "./Grain";
import { Reveal, MaskedLines } from "./Reveal";

const CATS = [
    { name: "galletas y snacks", slug: "galletas", icon: Cookie },
    { name: "barritas de energía", slug: "barritas", icon: Zap },
    { name: "untables", slug: "pasta-avellana", icon: Nut },
    { name: "jarabes", slug: "jarabe", icon: Droplet },
];

export const Categories = () => {
    const navigate = useNavigate();

    return (
        <section id="categorias" className="relative overflow-hidden bg-[#2b2620] py-24 text-[#F6F1E7] md:py-32" data-testid="categories-section">
            <Grain opacity={0.16} />
            <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
                <Reveal>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B5652E]">Encuentra el tuyo</p>
                </Reveal>
                <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                    <MaskedLines inView lines={["No importa el momento del día,", "hay un hōly para ti."]} />
                </h2>

                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                    {CATS.map((c, i) => (
                        <Reveal key={c.slug} delay={i * 0.08} className="h-full">
                            <button
                                type="button"
                                onClick={() => navigate(`/producto/${c.slug}`)}
                                data-testid={`category-card-${c.slug}`}
                                className="group flex h-full w-full flex-col rounded-lg bg-[#382f26] p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-[#453a2e] md:p-7"
                            >
                                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B5652E]/40 transition-colors duration-300 group-hover:border-[#B5652E]">
                                    <c.icon className="h-5 w-5 text-[#B5652E]" strokeWidth={1.5} aria-hidden="true" />
                                </span>
                                <span className="mt-10 font-display text-xl lowercase leading-tight tracking-tight md:mt-14 md:text-2xl">
                                    {c.name}
                                </span>
                                <span className="mt-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8a7d68] transition-colors duration-300 group-hover:text-[#F6F1E7]">
                                    explorar
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
