import { useLocation, useNavigate } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { Grain } from "./Grain";
import { Logo } from "./Logo";
import { scrollToId } from "../utils/scroll";

const TikTokIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M9 12a4 4 0 1 0 4 4V4c.6 2.5 2.4 4.4 5 5" />
    </svg>
);

const NAV = [
    { label: "Productos", id: "productos" },
    { label: "Sobre nosotros", id: "nosotros" },
    { label: "¿Por qué dátil?", id: "por-que-datil" },
    { label: "Preguntas", id: "dudas" },
];

const SOCIALS = [
    { name: "Instagram", href: "https://instagram.com/holy", icon: Instagram },
    { name: "Facebook", href: "https://facebook.com/holy", icon: Facebook },
    { name: "TikTok", href: "https://tiktok.com/@holy", icon: TikTokIcon },
];

export const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const go = (id) => {
        if (location.pathname !== "/") navigate("/", { state: { scrollTo: id } });
        else scrollToId(id);
    };

    return (
        <footer className="relative overflow-hidden bg-[#2b2620] text-[#F6F1E7]" data-testid="footer">
            <Grain opacity={0.12} />
            <div className="relative z-10 mx-auto max-w-7xl px-5 pb-10 pt-20 md:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Logo className="text-4xl font-bold tracking-tight" data-testid="footer-logo" />
                        <p className="mt-4 text-sm text-[#9c8f79]">Todo comienza con un dátil.</p>
                        <p className="mt-6 text-xs text-[#6b6154]">hōly® es una marca registrada.</p>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a7d68]">Dónde estamos</h3>
                        <ul className="mt-5 space-y-2.5 text-sm text-[#c9bfae]">
                            <li>Región Metropolitana, Chile</li>
                            <li>
                                <a href="mailto:hola@holy.cl" data-testid="footer-email" className="transition-colors hover:text-[#B5652E]">
                                    hola@holy.cl
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/56912345678"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-testid="footer-whatsapp"
                                    className="transition-colors hover:text-[#B5652E]"
                                >
                                    +56 9 XXXX XXXX
                                </a>
                            </li>
                        </ul>
                    </div>

                    <nav aria-label="Navegación del sitio">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a7d68]">Navegación</h3>
                        <ul className="mt-5 space-y-2.5 text-sm">
                            {NAV.map((n) => (
                                <li key={n.id}>
                                    <button
                                        type="button"
                                        onClick={() => go(n.id)}
                                        data-testid={`footer-nav-${n.id}`}
                                        className="text-[#c9bfae] transition-colors hover:text-[#B5652E]"
                                    >
                                        {n.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a7d68]">Síguenos</h3>
                        <div className="mt-5 flex gap-3">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`hōly en ${s.name}`}
                                    data-testid={`footer-social-${s.name.toLowerCase()}`}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F6F1E7]/20 text-[#c9bfae] transition-all duration-300 hover:scale-110 hover:border-[#B5652E] hover:text-[#B5652E]"
                                >
                                    <s.icon className="h-[18px] w-[18px]" />
                                </a>
                            ))}
                        </div>
                        <p className="mt-4 text-xs text-[#6b6154]">@holy en todas partes</p>
                    </div>
                </div>

                <div className="mt-16 flex flex-col gap-3 border-t border-[#F6F1E7]/10 pt-6 text-xs text-[#8a7d68] md:flex-row md:items-center md:justify-between">
                    <p data-testid="footer-legal">© 2026 hōly®. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" data-testid="footer-terms" className="transition-colors hover:text-[#F6F1E7]">
                            Términos y condiciones
                        </a>
                        <a href="#" data-testid="footer-privacy" className="transition-colors hover:text-[#F6F1E7]">
                            Política de privacidad
                        </a>
                    </div>
                </div>
            </div>
            <div className="pointer-events-none relative z-0 -mb-[4vw] flex justify-center" aria-hidden="true">
                <Logo className="text-[24vw] font-bold leading-none text-[#F6F1E7]/[0.05]" />
            </div>
        </footer>
    );
};
