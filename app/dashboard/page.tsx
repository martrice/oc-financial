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
    <div className="min-h-screen bg-navy-950">
      <AppNav />

      <main>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Greeting */}
          <div className="mb-8">
            <p className="text-sm text-slate-400">Good afternoon,</p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
              {MOCK_USER.name.split(" ")[0]} 👋
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Balance & quick actions */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-navy-700/50 bg-gradient-to-br from-navy-800/80 to-navy-900/80 p-6 sm:p-8 backdrop-blur-sm">
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
                      className="rounded-xl bg-navy-700/60 border border-navy-600/50 px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-600/60 hover:border-gold-500/30 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                  <Link
                    href="/chat"
                    className="rounded-xl bg-gold-500/10 border border-gold-500/30 px-5 py-2.5 text-sm font-medium text-gold-400 hover:bg-gold-500/20 transition-colors"
                  >
                    Ask OC
                  </Link>
                </div>
              </div>

              <TransactionList />
            </div>

            {/* Debit card & OC promo */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-navy-700/50 bg-navy-900/60 p-6 backdrop-blur-sm">
                <h2 className="text-lg font-semibold text-white mb-4">Your Card</h2>
                <DebitCard />
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-lg border border-navy-600 py-2 text-xs font-medium text-slate-400 hover:text-white hover:border-navy-500 transition-colors">
                    Lock card
                  </button>
                  <button className="flex-1 rounded-lg border border-navy-600 py-2 text-xs font-medium text-slate-400 hover:text-white hover:border-navy-500 transition-colors">
                    View details
                  </button>
                </div>
              </div>

              <Link
                href="/chat"
                className="block rounded-2xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-transparent p-6 hover:border-gold-500/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-bold text-sm">
                    OC
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-gold-400 transition-colors">
                      Chat with OC
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
