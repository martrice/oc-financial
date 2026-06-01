import Logo from "./Logo";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
};

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-navy-900 items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950" />
        <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-gold-500/5 blur-3xl" />

        <div className="relative z-10 max-w-md">
          <Logo size="lg" showTagline />
          <h2 className="mt-10 text-3xl font-semibold leading-tight text-white">
            Your money, your campus life — simplified.
          </h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            OC Financial gives college students a modern banking experience with
            AI-powered guidance from OC, your personal financial companion.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "No monthly fees for students",
              "Instant transfers & mobile deposit",
              "Smart budgeting with OC AI",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-300">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-navy-950">
        <div className="lg:hidden mb-8">
          <Logo size="md" showTagline />
        </div>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            <p className="mt-2 text-slate-400">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
