const ITEMS = ["TODO COMIENZA CON UN DÁTIL", "100% NATURAL", "SIN AZÚCAR AÑADIDA", "ALTO EN FIBRA", "HŌLY®"];

const Row = () => (
    <div className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12">
        {ITEMS.map((t, i) => (
            <span key={i} className="flex items-center gap-8 md:gap-12">
                <span className="font-display text-lg uppercase tracking-wide text-[#F6F1E7]/90 md:text-2xl">{t}</span>
                <span className="h-1.5 w-1.5 rotate-45 bg-[#B5652E]" aria-hidden="true" />
            </span>
        ))}
    </div>
);

export const Marquee = () => (
    <div className="overflow-hidden border-y border-[#F6F1E7]/10 bg-[#2b2620] py-4 md:py-5" aria-hidden="true" data-testid="marquee">
        <div className="marquee-track flex w-max">
            <Row />
            <Row />
        </div>
    </div>
);
