import AppNav from "@/components/AppNav";
import DebitCard from "@/components/DebitCard";
import TransactionList from "@/components/TransactionList";
import { MOCK_USER } from "@/lib/mock-data";
import Link from "next/link";

export default function DashboardPage() {
  const formattedBalance = MOCK_USER.balance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="min-h-screen bg-bg-deep">
      <AppNav />

      <main>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <p className="text-sm text-slate-400">Good afternoon,</p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
              {MOCK_USER.name.split(" ")[0]} 👋
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-violet/60 bg-violet/30 p-6 sm:p-8 backdrop-blur-sm">
                <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                  Available Balance
                </p>
                <p className="mt-2 text-4xl sm:text-5xl font-bold text-white tabular-nums">
                  ${formattedBalance}
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Checking ·••• {MOCK_USER.accountNumber.slice(-4)}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {["Send", "Deposit", "Pay"].map((action) => (
                    <button
                      key={action}
                      className="rounded-xl border border-violet bg-bg-deep/40 px-5 py-2.5 text-sm font-medium text-white hover:border-aqua/40 hover:shadow-[0_0_12px_rgba(0,244,254,0.25)] transition-all"
                    >
                      {action}
                    </button>
                  ))}
                  <Link
                    href="/chat"
                    className="rounded-xl bg-maize/15 border border-maize/40 px-5 py-2.5 text-sm font-medium text-maize hover:bg-maize/25 transition-colors"
                  >
                    Ask Ollie
                  </Link>
                </div>
              </div>

              <TransactionList />
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-violet/60 bg-violet/30 p-6 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white mb-4">Your Card</h2>
                <DebitCard />
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg border border-violet py-2 text-xs font-medium text-slate-400 hover:text-white hover:border-aqua/40 transition-colors">
                    Lock card
                  </button>
                  <button className="flex-1 rounded-lg border border-violet py-2 text-xs font-medium text-slate-400 hover:text-white hover:border-aqua/40 transition-colors">
                    View details
                  </button>
                </div>
              </div>

              <Link
                href="/chat"
                className="block rounded-2xl border border-aqua/25 bg-gradient-to-br from-primary/40 to-transparent p-6 hover:border-aqua/50 hover:shadow-[0_0_20px_rgba(0,244,254,0.2)] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-[9px] shadow-[0_0_16px_rgba(0,244,254,0.4)] ring-1 ring-aqua/50">
                    Ollie
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-aqua transition-colors">
                      Chat with Ollie
                    </p>
                    <p className="text-sm text-slate-400">
                      Get personalized money advice
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
