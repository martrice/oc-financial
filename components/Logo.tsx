import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
};

const sizes = {
  sm: { icon: "h-8 w-8 text-sm", title: "text-lg", tagline: "text-xs" },
  md: { icon: "h-10 w-10 text-base", title: "text-xl", tagline: "text-sm" },
  lg: { icon: "h-12 w-12 text-lg", title: "text-2xl", tagline: "text-sm" },
};

export default function Logo({ size = "md", showTagline = false }: LogoProps) {
  const s = sizes[size];

  return (
    <Link href="/dashboard" className="flex items-center gap-3 group">
      <div
        className={`${s.icon} flex items-center justify-center rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 font-bold text-navy-950 shadow-lg shadow-gold-500/20 transition-transform group-hover:scale-105`}
      >
        OC
      </div>
      <div>
        <span className={`${s.title} font-semibold tracking-tight text-white`}>
          OC Financial
        </span>
        {showTagline && (
          <p className={`${s.tagline} text-slate-400`}>
            Banking built for students
          </p>
        )}
      </div>
    </Link>
  );
}
