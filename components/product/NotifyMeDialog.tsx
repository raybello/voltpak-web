"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/products";

type NotifyMeDialogProps = {
  product: Product;
  open: boolean;
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NotifyMeDialog({
  product,
  open,
  onClose,
}: NotifyMeDialogProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [website, setWebsite] = useState(""); // honeypot
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Reset state when the dialog opens / closes.
  useEffect(() => {
    if (open) {
      setEmail("");
      setStatus("idle");
      setErrorMsg(null);
      // Focus the email input on open.
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC closes.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      // Trap focus inside the dialog.
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), [href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value,
                    productSlug: product.slug,
          website,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(
          data?.error ??
            "Something went wrong. Please try again in a moment."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notify-dialog-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-popIn"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-ink-500 hover:text-ink-900 hover:bg-ink-100 transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === "success" ? (
          <SuccessState
            email={email}
            productName={product.name}
            onClose={onClose}
          />
        ) : (
          <FormState
            product={product}
            email={email}
            setEmail={(v) => {
              setEmail(v);
              if (status === "error") {
                setStatus("idle");
                setErrorMsg(null);
              }
            }}
            status={status}
            errorMsg={errorMsg}
            inputRef={inputRef}
            onSubmit={submit}
            website={website}
            setWebsite={setWebsite}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        :global(.animate-fadeIn) { animation: fadeIn 200ms ease-out forwards; }
        :global(.animate-popIn) { animation: popIn 240ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}</style>
    </div>
  );
}

function FormState({
  product,
  email,
  setEmail,
  status,
  errorMsg,
  inputRef,
  onSubmit,
  website,
  setWebsite,
}: {
  website: string;
  setWebsite: (v: string) => void;
  product: Product;
  email: string;
  setEmail: (v: string) => void;
  status: Status;
  errorMsg: string | null;
  inputRef: React.RefObject<HTMLInputElement>;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const submitting = status === "submitting";

  return (
    <div className="p-8 md:p-10">
      <div className="flex items-center gap-4 mb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 rounded-xl object-cover bg-ink-100 flex-shrink-0"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-hover mb-1">
            Coming soon
          </p>
          <h2
            id="notify-dialog-title"
            className="font-display font-bold text-xl text-ink-900 leading-tight"
          >
            {product.name}
          </h2>
        </div>
      </div>

      <p className="text-ink-500 text-sm leading-relaxed mb-6">
        Drop your email and you'll be the first to know when{" "}
        <span className="text-ink-900 font-medium">{product.name}</span> ships,
        plus get early-access pricing before it goes live.
      </p>

      <form onSubmit={onSubmit} noValidate>
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
        <label htmlFor="notify-email" className="sr-only">
          Email address
        </label>
        <input
          id="notify-email"
          ref={inputRef}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          disabled={submitting}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-invalid={status === "error"}
          aria-describedby={errorMsg ? "notify-error" : undefined}
          className={`w-full h-12 px-5 rounded-full border text-sm text-ink-900 placeholder:text-ink-500
            focus:outline-none transition disabled:opacity-60
            ${
              status === "error"
                ? "border-red-500 focus:border-red-500"
                : "border-ink-100 focus:border-ink-900"
            }`}
        />

        {errorMsg && (
          <p id="notify-error" className="mt-2 text-xs text-red-600">
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 w-full h-12 rounded-full bg-ink-900 text-white text-sm font-semibold
            hover:bg-ink-700 transition disabled:opacity-70 disabled:cursor-not-allowed
            inline-flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Spinner /> Sending confirmation…
            </>
          ) : (
            "Notify Me"
          )}
        </button>

        <p className="mt-4 text-[11px] text-ink-500 text-center leading-relaxed">
          We'll only email you about {product.name} availability and the
          occasional VoltPak launch update. No spam. Unsubscribe any time.
        </p>
      </form>
    </div>
  );
}

function SuccessState({
  email,
  productName,
  onClose,
}: {
  email: string;
  productName: string;
  onClose: () => void;
}) {
  return (
    <div className="p-8 md:p-10 text-center">
      <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-5">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="m5 12 4 4L19 7"
            stroke="#00A8CC"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h2 className="font-display font-bold text-2xl text-ink-900 mb-2">
        Check your inbox.
      </h2>

      <p className="text-ink-500 text-sm leading-relaxed mb-1">
        We sent a confirmation link to{" "}
        <span className="text-ink-900 font-medium break-all">{email}</span>
      </p>
      <p className="text-ink-500 text-sm leading-relaxed">
        Confirm it and we&apos;ll email you when{" "}
        <span className="text-ink-900">{productName}</span> is ready.
      </p>

      <button
        onClick={onClose}
        className="mt-8 w-full h-12 rounded-full bg-ink-900 text-white text-sm font-semibold hover:bg-ink-700 transition"
      >
        Done
      </button>
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
