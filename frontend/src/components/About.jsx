import { Reveal, MaskedLines } from "./Reveal";
import { SlotImage } from "./SlotImage";
import { Grain } from "./Grain";

export const About = () => (
    <section id="nosotros" className="bg-[#F6F1E7] py-24 text-[#2b2620] md:py-32" data-testid="about-section">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
            <div>
                <Reveal>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B5652E]">Nuestra historia</p>
                </Reveal>
                <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                    <MaskedLines inView lines={["Un snack rico también", "puede estar bien hecho."]} />
                </h2>
                <Reveal delay={0.15}>
                    <p className="mt-6 max-w-xl leading-relaxed text-[#6b6154]">
                        hōly nació de una idea simple: que un snack rico también puede estar bien hecho. Partimos del dátil —una fruta que
                        endulza sola, sin necesidad de azúcar añadida— y construimos alrededor de él galletas, barritas, untables y jarabes.
                        Somos una marca chilena, transparente con lo que ponemos dentro y obsesionada con los detalles. Nada de letra
                        chica: lo que ves es lo que hay.
                    </p>
                </Reveal>
                <Reveal delay={0.25}>
                    <p className="mt-8 font-display text-xl uppercase tracking-tight text-[#B5652E]">— Todo comienza con un dátil.</p>
                </Reveal>
            </div>
            <Reveal delay={0.1} className="relative">
                <div className="relative rotate-2 overflow-hidden rounded-2xl bg-[#2b2620] p-3 shadow-2xl shadow-[#2b2620]/25 transition-transform duration-500 hover:rotate-0">
                    <Grain opacity={0.2} />
                    <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-dashed border-[#F6F1E7]/25">
                        <SlotImage src="/img/sobre-nosotros.jpg" alt="El equipo hōly entre dátiles" kind="photo" imgClassName="object-cover" />
                    </div>
                </div>
            </Reveal>
        </div>
    </section>
);
