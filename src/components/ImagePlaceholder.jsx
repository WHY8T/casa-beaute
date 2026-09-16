export default function ImagePlaceholder({ className = '', src, alt = '' }) {
    if (src) {
        return (
            <img
                src={src}
                alt={alt}
                className={`h-full w-full object-cover ${className}`}
            />
        )
    }

    return (
        <div className={`flex items-center justify-center bg-peach ${className}`}>
            <svg
                width="15%"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                className="text-ink/25"
                aria-hidden="true"
            >
                <rect x="2.5" y="4.5" width="19" height="15" rx="1.5" />
                <circle cx="8" cy="10" r="1.5" />
                <path d="M21.5 16.5 16 11 6.5 19" />
            </svg>
        </div>
    )
}