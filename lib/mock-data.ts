export type Transaction = {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  icon: string;
};

export const MOCK_USER = {
  name: "Jordan Lee",
  email: "jordan.lee@university.edu",
  accountNumber: "****4821",
  routingNumber: "021000021",
  balance: 2847.63,
  cardLast4: "4821",
  cardExpiry: "09/28",
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    merchant: "Campus Bookstore",
    category: "Books",
    amount: -89.99,
    date: "May 30, 2026",
    icon: "📚",
  },
  {
    id: "2",
    merchant: "Direct Deposit — Work Study",
    category: "Income",
    amount: 450.0,
    date: "May 28, 2026",
    icon: "💼",
  },
  {
    id: "3",
    merchant: "Chipotle",
    category: "Food",
    amount: -12.45,
    date: "May 27, 2026",
    icon: "🌯",
  },
  {
    id: "4",
    merchant: "Spotify Student",
    category: "Subscription",
    amount: -5.99,
    date: "May 25, 2026",
    icon: "🎵",
  },
  {
    id: "5",
    merchant: "Venmo — Alex M.",
    category: "Transfer",
    amount: -25.0,
    date: "May 24, 2026",
    icon: "💸",
  },
  {
    id: "6",
    merchant: "Target",
    category: "Shopping",
    amount: -34.18,
    date: "May 22, 2026",
    icon: "🛒",
  },
];

export const OC_GREETING =
  "Hey Jordan! 👋 I'm OC, your financial companion. Ask me about your spending, budgeting tips, or anything money-related — I've got you.";

export function getOCResponse(input: string): string {
  const text = input.toLowerCase();

  if (text.includes("balance") || text.includes("how much")) {
    return `Your checking balance is **$${MOCK_USER.balance.toFixed(2)}**. You're in good shape — you've got about 2 weeks of typical spending covered.`;
  }
  if (text.includes("budget") || text.includes("spend")) {
    return "This month you've spent $142 on food and $89 on books. Your biggest category is dining — try the campus meal plan on Tuesdays to save ~$30/week. Want me to set a weekly food budget?";
  }
  if (text.includes("save") || text.includes("saving")) {
    return "Great mindset! With your work-study income, I'd suggest moving $50 each paycheck to savings. At that rate you'd hit $500 by fall break. Small steps add up fast in college.";
  }
  if (text.includes("transaction") || text.includes("recent")) {
    return "Your latest transactions: Campus Bookstore (-$89.99), Work Study deposit (+$450), and Chipotle (-$12.45). Your net this week is +$347.56 — nice work!";
  }
  if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
    return "Hey! Good to see you. How can I help with your finances today? I can check your balance, review spending, or help you plan ahead.";
  }
  if (text.includes("card") || text.includes("debit")) {
    return `Your OC debit card ending in ${MOCK_USER.cardLast4} is active and ready to use. Tap-to-pay is enabled. Need to lock your card or report something? Just say the word.`;
  }

  return "I'm here to help with budgeting, spending insights, savings goals, and account questions. Try asking about your balance, recent transactions, or how to save more this semester!";
}
