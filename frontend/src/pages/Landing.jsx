import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { About } from "../components/About";
import { WhyDate } from "../components/WhyDate";
import { ProductsGrid } from "../components/ProductsGrid";
import { MomentsGallery } from "../components/MomentsGallery";
import { Categories } from "../components/Categories";
import { FAQ } from "../components/FAQ";
import { scrollToId } from "../utils/scroll";

export default function Landing() {
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.scrollTo) {
            const id = location.state.scrollTo;
            const t = setTimeout(() => scrollToId(id), 80);
            window.history.replaceState({}, "");
            return () => clearTimeout(t);
        }
    }, [location.state]);

    return (
        <main>
            <Hero />
            <Marquee />
            <About />
            <WhyDate />
            <ProductsGrid />
            <MomentsGallery />
            <Categories />
            <FAQ />
        </main>
    );
}
