import { MOCK_USER } from "@/lib/mock-data";

function CardChip() {
  return (
    <svg
      width="48"
      height="38"
      viewBox="0 0 48 38"
      fill="none"
      aria-hidden
      className="drop-shadow-sm"
    >
      <rect x="1" y="1" width="46" height="36" rx="6" fill="#FFEC7C" fillOpacity="0.95" />
      <rect x="1" y="1" width="46" height="36" rx="6" stroke="#C9B84A" strokeWidth="1" />
      <line x1="12" y1="1" x2="12" y2="37" stroke="#C9B84A" strokeWidth="0.75" opacity="0.6" />
      <line x1="24" y1="1" x2="24" y2="37" stroke="#C9B84A" strokeWidth="0.75" opacity="0.6" />
      <line x1="36" y1="1" x2="36" y2="37" stroke="#C9B84A" strokeWidth="0.75" opacity="0.6" />
      <line x1="1" y1="12" x2="47" y2="12" stroke="#C9B84A" strokeWidth="0.75" opacity="0.6" />
      <line x1="1" y1="24" x2="47" y2="24" stroke="#C9B84A" strokeWidth="0.75" opacity="0.6" />
    </svg>
  );
}

export default function DebitCard() {
  return (
    <div
      className="debit-card relative w-full max-w-[340px] mx-auto rounded-[18px] overflow-hidden shadow-2xl shadow-black/50"
      style={{ aspectRatio: "85.6 / 53.98" }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#226397] via-[#2d5480] to-[#4E4463]" />

      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.15) 2px,
            rgba(255,255,255,0.15) 4px
          )`,
        }}
      />

      {/* Shine sweep */}
      <div className="debit-card-shine absolute inset-0 pointer-events-none" />

      {/* Aqua accent glow */}
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-aqua/15 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-maize/10 blur-xl" />

      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        {/* Top row: logo */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/15 text-[10px] font-bold text-maize ring-1 ring-white/20">
                OC
              </div>
              <span className="text-sm font-semibold tracking-wide text-white">
                OC Financial
              </span>
            </div>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-white/50">
              Student Debit
            </p>
          </div>
        </div>

        {/* Chip */}
        <div className="mt-2">
          <CardChip />
        </div>

        {/* Card number */}
        <div className="mt-auto pt-3">
          <p className="font-mono text-lg sm:text-xl tracking-[0.25em] text-white drop-shadow-sm">
            ••••&nbsp;&nbsp;••••&nbsp;&nbsp;••••&nbsp;&nbsp;{MOCK_USER.cardLast4}
          </p>
        </div>

        {/* Bottom row */}
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] uppercase tracking-wider text-white/50">
              Cardholder
            </p>
            <p className="text-xs sm:text-sm font-medium text-white uppercase tracking-wide truncate">
              {MOCK_USER.name}
            </p>
          </div>

          <div className="text-center shrink-0 px-2">
            <p className="text-[9px] uppercase tracking-wider text-white/50">
              Valid thru
            </p>
            <p className="text-xs sm:text-sm font-medium text-white tabular-nums">
              {MOCK_USER.cardExpiry}
            </p>
          </div>

          <div className="text-right shrink-0">
            <p
              className="text-xl sm:text-2xl font-bold italic tracking-tight text-white"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              VISA
            </p>
            <p className="text-[9px] uppercase tracking-wider text-white/50">
              Debit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
