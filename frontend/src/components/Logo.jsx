export const Logo = ({ className = "", ...props }) => (
    <span className={`relative inline-flex items-baseline lowercase leading-none ${className}`} {...props}>
        <span>h</span>
        <span className="relative inline-block">
            o
            <span
                aria-hidden="true"
                className="absolute left-1/2 block -translate-x-1/2 -rotate-6 rounded-[50%] border-[0.075em] border-current"
                style={{ top: "-0.36em", width: "0.62em", height: "0.3em" }}
            />
        </span>
        <span>ly</span>
        <span className="ml-[0.05em] align-super text-[0.36em] font-semibold">®</span>
    </span>
);
