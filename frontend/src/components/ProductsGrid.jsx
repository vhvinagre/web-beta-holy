import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS, QUALITY_CHIPS, clp, getDefaultImage } from "../data/products";
import { Reveal, MaskedLines } from "./Reveal";
import { SlotImage } from "./SlotImage";

export const ProductsGrid = () => (
    <section id="productos" className="bg-[#F6F1E7] py-24 md:py-32" data-testid="products-section">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="text-center">
                <Reveal>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B5652E]">hōly®</p>
                </Reveal>
                <h2 className="mt-4 font-display text-4xl uppercase tracking-tight text-[#2b2620] sm:text-5xl lg:text-6xl">
                    <MaskedLines inView lines={["NUESTROS PRODUCTOS"]} />
                </h2>
                <Reveal delay={0.15}>
                    <p className="mx-auto mt-4 max-w-md text-[#6b6154]">Cuatro familias, una sola base: el dátil.</p>
                </Reveal>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {PRODUCTS.map((p, i) => (
                    <Reveal key={p.slug} delay={i * 0.07} className="h-full">
                        <Link
                            to={`/producto/${p.slug}`}
                            data-testid={`product-card-${p.slug}`}
                            className="group flex h-full flex-col rounded-xl border border-[#2b2620]/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2b2620]/10"
                            style={{ backgroundColor: `${p.color}12` }}
                        >
                            <div className="relative flex h-44 w-full items-center justify-center md:h-52">
                                {p.isNew && (
                                    <span className="absolute left-0 top-0 z-10 rounded-full bg-[#B5652E] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#F6F1E7]">
                                        Nuevo
                                    </span>
                                )}
                                <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
                                    <SlotImage src={getDefaultImage(p)} alt={p.name} kind={p.kind} tone="dark" />
                                </div>
                            </div>
                            <h3 className="mt-5 text-lg font-semibold text-[#2b2620]">{p.name}</h3>
                            <div className="mt-2.5 flex flex-wrap gap-1.5">
                                {QUALITY_CHIPS.map((chip) => (
                                    <span
                                        key={chip}
                                        className="rounded-full border border-[#2b2620]/25 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#6b6154]"
                                    >
                                        {chip}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-5">
                                <span className="text-sm text-[#6b6154]">
                                    desde <span className="font-bold text-[#2b2620]">{clp(p.price)}</span>
                                </span>
                                <span className="flex items-center gap-1 text-sm font-semibold text-[#B5652E]">
                                    Ver variedades
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </span>
                            </div>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
