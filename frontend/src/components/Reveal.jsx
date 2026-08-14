import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 32, className = "" }) => {
    const reduced = useReducedMotion();
    if (reduced) return <div className={className}>{children}</div>;
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}
        >
            {children}
        </motion.div>
    );
};

export const MaskedLines = ({ lines, className = "", lineClassName = "", delay = 0, inView = false }) => {
    const reduced = useReducedMotion();
    const ref = useRef(null);
    const seen = useInView(ref, { once: true, margin: "-60px" });
    const show = reduced || !inView || seen;

    return (
        <span ref={ref} className={`block ${className}`}>
            {lines.map((line, i) => (
                <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
                    <motion.span
                        className={`block ${lineClassName}`}
                        initial={reduced ? false : { y: "115%" }}
                        animate={show ? { y: "0%" } : { y: "115%" }}
                        transition={{ duration: 0.85, delay: delay + i * 0.09, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {line}
                    </motion.span>
                </span>
            ))}
        </span>
    );
};
