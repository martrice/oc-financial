import { MOCK_USER } from "@/lib/mock-data";

export default function DebitCard() {
  return (
    <div className="relative w-full max-w-sm aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
      <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950" />
      <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-gold-500/20 blur-2xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-gold-500/10 blur-xl" />

      <div className="relative flex h-full flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-gold-400/80">
              OC Financial
            </p>
            <p className="mt-1 text-sm text-slate-400">Student Checking</p>
          </div>
          <div className="flex h-8 w-12 items-center justify-center rounded-md bg-gradient-to-br from-gold-400 to-gold-600">
            <div className="h-5 w-7 rounded-sm border border-gold-600/50 bg-gold-500/30" />
          </div>
        </div>

        <div>
          <p className="font-mono text-lg tracking-[0.2em] text-white">
            •••• •••• •••• {MOCK_USER.cardLast4}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Cardholder
            </p>
            <p className="text-sm font-medium text-white uppercase tracking-wide">
              {MOCK_USER.name}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              Expires
            </p>
            <p className="text-sm font-medium text-white">{MOCK_USER.cardExpiry}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gold-400">VISA</p>
            <p className="text-[10px] text-slate-500">Debit</p>
          </div>
        </div>
      </div>
    </div>
  );
}
