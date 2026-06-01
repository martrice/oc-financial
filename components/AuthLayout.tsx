import Logo from "./Logo";

type AuthLayoutProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
};

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-bg-deep to-bg-deep" />
        <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-aqua/15 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-maize/10 blur-3xl" />

        <div className="relative z-10 max-w-md">
          <Logo size="lg" showTagline />
          <h2 className="mt-10 text-3xl font-semibold leading-tight text-white">
            Your money, your campus life — simplified.
          </h2>
          <p className="mt-4 text-slate-300 leading-relaxed">
            OC Financial gives college students a modern banking experience with
            AI-powered guidance from Ollie, your personal financial companion.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "No monthly fees for students",
              "Instant transfers & mobile deposit",
              "Smart budgeting with Ollie",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-slate-200">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-maize/20 text-maize text-xs">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-bg-deep">
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
