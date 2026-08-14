import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { CartProvider } from "./context/CartContext";
import { Header } from "./components/Header";
import { CartDrawer } from "./components/CartDrawer";
import { Footer } from "./components/Footer";
import Landing from "./pages/Landing";
import ProductPage from "./pages/ProductPage";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

const LenisRoot = () => {
    const reduced = usePrefersReducedMotion();
    useEffect(() => {
        if (reduced) return undefined;
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        window.__lenis = lenis;
        let raf;
        const loop = (t) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            window.__lenis = null;
        };
    }, [reduced]);
    return null;
};

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

export default function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <LenisRoot />
                <ScrollToTop />
                <Header />
                <CartDrawer />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/producto/:slug" element={<ProductPage />} />
                    <Route path="*" element={<Landing />} />
                </Routes>
                <Footer />
                <Toaster
                    position="bottom-center"
                    toastOptions={{ style: { background: "#1b1b1b", color: "#F6F1E7", border: "1px solid rgba(246,241,231,0.12)" } }}
                />
            </BrowserRouter>
        </CartProvider>
    );
}
