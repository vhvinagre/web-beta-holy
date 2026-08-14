import { useState } from "react";

const SHAPES = {
    box: (
        <>
            <rect x="14" y="8" width="20" height="30" rx="2" />
            <rect x="19" y="16" width="10" height="14" rx="1" strokeDasharray="2.5 2.5" />
        </>
    ),
    bar: <rect x="6" y="18" width="36" height="12" rx="6" />,
    jar: (
        <>
            <rect x="15" y="8" width="18" height="6" rx="2" />
            <path d="M14 17c0-1.8 1-3 2.4-3h15.2c1.4 0 2.4 1.2 2.4 3v16a5 5 0 0 1-5 5H19a5 5 0 0 1-5-5z" />
        </>
    ),
    bottle: (
        <>
            <rect x="19.5" y="4" width="9" height="6" rx="1.5" />
            <path d="M21 10h6l3.5 6.5V34a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5V16.5z" />
        </>
    ),
    photo: (
        <>
            <rect x="6" y="8" width="36" height="28" rx="3" />
            <circle cx="16" cy="17" r="3" />
            <path d="M6 32l10-9 8 7 8-6 10 8" />
        </>
    ),
    video: (
        <>
            <rect x="6" y="10" width="36" height="26" rx="3" />
            <path d="M21 17.5l11 5.5-11 5.5z" />
        </>
    ),
};

export const SlotSilhouette = ({ kind = "box", className = "h-14 w-14" }) => (
    <svg
        viewBox="0 0 48 48"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        {SHAPES[kind] || SHAPES.box}
    </svg>
);

export const SlotImage = ({ src, alt, kind = "box", className = "", imgClassName = "", tone = "light", label }) => {
    const [error, setError] = useState(false);
    const name = label || (src ? src.split("/").pop() : "slot");

    if (src && !error) {
        return (
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onError={() => setError(true)}
                className={`h-full w-full object-contain ${imgClassName}`}
                data-testid={`img-${name}`}
            />
        );
    }

    return (
        <div
            className={`flex h-full w-full flex-col items-center justify-center gap-3 ${tone === "dark" ? "text-[#2b2620]/55" : "text-[#F6F1E7]/70"} ${className}`}
            role="img"
            aria-label={`${alt} (espacio reservado para ${name})`}
            data-testid={`slot-${name}`}
        >
            <SlotSilhouette kind={kind} className="h-[30%] max-h-40 w-auto" />
            <span className="font-mono text-[10px] tracking-wide opacity-80 md:text-xs">{name}</span>
        </div>
    );
};
