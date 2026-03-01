interface ChevronIconProps {
    className?: string;
    direction: "left" | "right";
}

export default function ChevronIcon({className = "w-5 h-5", direction}: ChevronIconProps) {
    return (
        <svg
            className={`${direction === "left" ? "rotate-180" : ""} ${className}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M9.29 6.71a1 1 0 0 1 1.42 0l4.58 4.58a1 1 0 0 1 0 1.42l-4.58 4.58a1 1 0 0 1-1.42-1.42L13.17 12 9.29 7.71a1 1 0 0 1 0-1z"/>
        </svg>
    );
}
