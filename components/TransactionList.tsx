import { MOCK_TRANSACTIONS, type Transaction } from "@/lib/mock-data";

function TransactionRow({ tx }: { tx: Transaction }) {
  const isCredit = tx.amount > 0;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-violet/40 last:border-0">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-deep/50 text-lg">
        {tx.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-white truncate">{tx.merchant}</p>
        <p className="text-sm text-slate-500">
          {tx.category} · {tx.date}
        </p>
      </div>
      <p
        className={`font-semibold tabular-nums ${
          isCredit ? "text-emerald" : "text-white"
        }`}
      >
        {isCredit ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
      </p>
    </div>
  );
}

export default function TransactionList() {
  return (
    <div className="rounded-2xl border border-violet/60 bg-violet/30 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
        <button className="text-sm font-medium text-aqua hover:text-maize transition-colors">
          View all
        </button>
      </div>
      <div>
        {MOCK_TRANSACTIONS.map((tx) => (
          <TransactionRow key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
}
