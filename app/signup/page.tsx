"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 600);
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join thousands of students banking smarter"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
            Full name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jordan Lee"
            className="input-brand w-full rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
            School email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@university.edu"
            className="input-brand w-full rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="input-brand w-full rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none transition-all"
          />
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          By creating an account, you agree to OC Financial&apos;s Terms of Service
          and Privacy Policy. Student accounts are free — no hidden fees.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full rounded-xl py-3.5 text-sm"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-maize hover:text-aqua">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
