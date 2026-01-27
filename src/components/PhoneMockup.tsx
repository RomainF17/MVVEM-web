type PhoneMockupProps = {
  src: string;
  alt: string;
  /** Largeur du téléphone (ex: "w-[320px] md:w-[360px]") */
  className?: string;
};

/**
 * Mockup iPhone (coque verte + bezel + Dynamic Island) avec ratio d'écran
 * proche iPhone (9:19.5). Conçu pour afficher des screenshots iOS sans bandes.
 */
export function PhoneMockup({ src, alt, className }: PhoneMockupProps) {
  return (
    <div className={["relative max-w-full", className ?? ""].join(" ").trim()}>
      {/* Outer green case */}
      <div className="relative rounded-[3.25rem] bg-gradient-to-b from-emerald-950 to-emerald-800 p-[10px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]">
        {/* Subtle highlight */}
        <div className="pointer-events-none absolute inset-0 rounded-[3.25rem] bg-gradient-to-b from-white/10 to-transparent" />

        {/* Bezel */}
        <div className="rounded-[2.85rem] bg-transparent">
          {/* Screen */}
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.55rem]">
            {/* Screenshot */}
            <img
              src={src}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
            />

            {/* Dynamic Island (smaller on mobile, unchanged on desktop) */}
            <div className="pointer-events-none absolute left-1/2 top-[10px] h-[16px] w-[72px] -translate-x-1/2 rounded-full bg-black/95 shadow-[0_10px_24px_-18px_rgba(0,0,0,0.8)] md:h-[20px] md:w-[96px]" />

            {/* Screen glass */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

