"use client";

import { useState } from "react";

type Errors = { name?: string; email?: string; message?: string };

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Enter a valid email address.";
    }
    if (values.message.trim().length < 10) {
      next.message = "Message should be at least 10 characters.";
    }
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // No backend is connected yet — wire this up to your form handler,
      // e.g. an API route, Formspree, or a serverless function.
      setSubmitted(true);
      setValues({ name: "", email: "", message: "" });
    }
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-moss/30 bg-moss/5 p-6">
        <p className="font-serif text-lg font-semibold text-moss-dark">
          Thanks for reaching out.
        </p>
        <p className="mt-2 text-sm text-bark/80">
          We read every message and reply within a few days.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-medium text-moss underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          className="w-full rounded-sm border border-bark/20 bg-paper px-4 py-2.5 text-sm focus:border-moss focus:outline-none"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-1 text-xs text-clay-dark">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          className="w-full rounded-sm border border-bark/20 bg-paper px-4 py-2.5 text-sm focus:border-moss focus:outline-none"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-1 text-xs text-clay-dark">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className="w-full rounded-sm border border-bark/20 bg-paper px-4 py-2.5 text-sm focus:border-moss focus:outline-none"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1 text-xs text-clay-dark">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="self-start rounded-sm bg-moss px-6 py-2.5 text-sm font-medium text-paper hover:bg-moss-dark"
      >
        Send message
      </button>
    </form>
  );
}
