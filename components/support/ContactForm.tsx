"use client";

import { useState } from "react";

const SUBJECTS = [
  "Order or shipping question",
  "Warranty claim",
  "Return or refund",
  "Technical issue",
  "Mod / hardware question",
  "Press or partnerships",
  "Other",
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [serialNumber, setSerialNumber] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, subject, serialNumber, message, website }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-ink-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[320px]">
        <div className="w-12 h-12 rounded-full bg-ink-900 flex items-center justify-center mb-4">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M4 11.5L9 16.5L18 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="font-semibold text-ink-900 text-lg mb-2">Message sent</h2>
        <p className="text-sm text-ink-500 leading-relaxed max-w-xs">
          We&apos;ll get back to you at <span className="text-ink-700 font-medium">{email}</span> within 24 hours on business days.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-ink-100 rounded-2xl p-8">
      <h2 className="font-semibold text-ink-900 mb-5">Send a message</h2>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Honeypot - hidden from people and assistive tech; bots fill it. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="cf-first" className="block text-xs font-semibold text-ink-700 mb-1">
              First name
            </label>
            <input id="cf-first" autoComplete="given-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="cf-last" className="block text-xs font-semibold text-ink-700 mb-1">
              Last name
            </label>
            <input id="cf-last" autoComplete="family-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:border-accent"
            />
          </div>
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-xs font-semibold text-ink-700 mb-1">
            Email <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input id="cf-email" autoComplete="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="cf-subject" className="block text-xs font-semibold text-ink-700 mb-1">
            Subject
          </label>
          <select id="cf-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 focus:outline-none focus:border-accent"
          >
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-serial" className="block text-xs font-semibold text-ink-700 mb-1">
            Serial number (if applicable)
          </label>
          <input id="cf-serial"
            type="text"
            placeholder="VP1000-XXXXXX"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="w-full h-10 rounded-lg border border-ink-100 bg-white px-3 text-sm text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="cf-message" className="block text-xs font-semibold text-ink-700 mb-1">
            Message <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <textarea id="cf-message"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm text-ink-900 focus:outline-none focus:border-accent resize-none"
          />
        </div>

        {status === "error" && (
          <p role="alert" className="text-sm text-red-500">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full h-11 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
