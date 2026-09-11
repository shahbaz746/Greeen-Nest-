"use client";

import { useState } from "react";

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setStatus("error");
      return;
    }
    // No backend is wired up yet — this simply confirms the input was valid.
    setStatus("success");
    setEmail("");
  }

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="you@example.com"
          className={`w-full rounded-sm border px-4 py-2.5 text-sm focus:outline-none ${
            isDark
              ? "border-paper/20 bg-transparent text-paper placeholder:text-paper/50 focus:border-paper"
              : "border-bark/20 bg-paper text-ink placeholder:text-bark/40 focus:border-moss"
          }`}
          aria-invalid={status === "error"}
          aria-describedby="newsletter-status"
        />
        <button
          type="submit"
          className={`whitespace-nowrap rounded-sm px-5 py-2.5 text-sm font-medium transition-colors ${
            isDark
              ? "bg-paper text-moss-dark hover:bg-cream"
              : "bg-moss text-paper hover:bg-moss-dark"
          }`}
        >
          Subscribe
        </button>
      </div>
      <p
        id="newsletter-status"
        role="status"
        className={`mt-2 text-xs ${isDark ? "text-paper/70" : "text-bark/60"}`}
      >
        {status === "success" &&
          "You're on the list — look for a confirmation soon."}
        {status === "error" && "Enter a valid email address to subscribe."}
        {status === "idle" && "One email a week. No spam, unsubscribe anytime."}
      </p>
    </form>
  );
}
