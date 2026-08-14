import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Logo } from "./Logo";

export const Header = () => {
    const { count, setOpen } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const goHome = () => {
        if (location.pathname !== "/") navigate("/");
        else if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <header
            className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${
                scrolled
                    ? "bg-[#F6F1E7]/90 text-[#2b2620] shadow-[0_1px_0_rgba(43,38,32,0.08)] backdrop-blur-md"
                    : "bg-transparent text-[#F6F1E7]"
            }`}
            data-testid="header"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
                <button
                    type="button"
                    onClick={goHome}
                    aria-label="hōly — ir al inicio"
                    data-testid="header-logo"
                    className="transition-transform duration-300 hover:scale-105"
                >
                    <Logo className="text-[26px] font-bold tracking-tight" />
                </button>
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label={count > 0 ? `Abrir carrito, ${count} productos` : "Abrir carrito"}
                    data-testid="header-cart-button"
                    className="relative rounded-full p-2 transition-transform duration-300 hover:scale-110"
                >
                    <ShoppingBag className="h-6 w-6" strokeWidth={1.75} />
                    {count > 0 && (
                        <span
                            data-testid="header-cart-count"
                            className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B5652E] px-1 text-[11px] font-bold text-[#F6F1E7]"
                        >
                            {count}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
};
