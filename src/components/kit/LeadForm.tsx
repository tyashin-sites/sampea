'use client';

import { useEffect, useRef, useState } from 'react';

export interface LeadFormProps {
  /** Tyashin API origin (read by the server parent; see Contact.tsx). */
  apiUrl: string;
  /** The site's public project key (process.env.TYASHIN_API_KEY). */
  apiKey: string;
  /** Shown when the form can't take the lead (limit reached, network error). */
  fallback?: string;
}

type State = 'idle' | 'sending' | 'sent' | 'error' | 'limit';

/** The path the contact-form plugin serves (aapastech-backend routes/contact.ts). */
export const LEAD_SUBMIT_PATH = '/api/v1/contact/public/submit';

const field =
  'border-border bg-background focus:border-primary w-full rounded-md border px-3 py-2.5 outline-none transition-colors';

/**
 * Sends the enquiry to Tyashin (POST /api/v1/contact/public/submit), where it
 * lands in the owner's Leads inbox. Honeypot + renderedAt feed the server's
 * spam gates. The button stays disabled until hydration, so a click before
 * the script runs can never fall back to a native GET that puts the visitor's
 * name and email in the URL. Without env (local dev) the form renders disabled.
 */
export function LeadForm({ apiUrl, apiKey, fallback }: LeadFormProps) {
  const renderedAt = useRef(0);
  const sentRef = useRef<HTMLParagraphElement>(null);
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<State>('idle');
  useEffect(() => {
    renderedAt.current = Date.now();
    setReady(true);
  }, []);
  useEffect(() => {
    if (state === 'sent') sentRef.current?.focus();
  }, [state]);
  const configured = Boolean(apiUrl && apiKey);
  const reach = fallback ? ` ${fallback}` : '';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!configured || state === 'sending') return;
    const form = new FormData(e.currentTarget);
    const get = (k: string) => String(form.get(k) ?? '').trim();
    setState('sending');
    try {
      const res = await fetch(`${apiUrl.replace(/\/+$/, '')}${LEAD_SUBMIT_PATH}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _apiKey: apiKey,
          name: get('name'),
          email: get('email'),
          phone: get('phone') || undefined,
          message: get('message'),
          pageUrl: window.location.href.slice(0, 500),
          source: 'contact-form',
          company_website: String(form.get('company_website') ?? ''),
          renderedAt: renderedAt.current,
        }),
      });
      if (res.ok) return setState('sent');
      // 429 is also the per-IP rate limit; only the plan cap means "no more online".
      const code =
        res.status === 429
          ? await res
              .json()
              .then((b: { error?: { code?: string } }) => b?.error?.code)
              .catch(() => undefined)
          : undefined;
      setState(code === 'LEAD_LIMIT_REACHED' ? 'limit' : 'error');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent')
    return (
      <p
        ref={sentRef}
        tabIndex={-1}
        role="status"
        className="bg-surface rounded-lg p-8 font-medium outline-none"
      >
        Thank you. Your message has been sent.
      </p>
    );

  return (
    <form
      method="post"
      onSubmit={onSubmit}
      aria-busy={state === 'sending'}
      className="bg-surface grid gap-5 rounded-lg p-6 sm:p-8"
    >
      <label className="grid gap-1.5 text-sm">
        <span>Name</span>
        <input name="name" required maxLength={100} autoComplete="name" className={field} />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span>Email</span>
        <input
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          className={field}
        />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span>Phone (optional)</span>
        <input name="phone" type="tel" maxLength={30} autoComplete="tel" className={field} />
      </label>
      <label className="grid gap-1.5 text-sm">
        <span>Message</span>
        <textarea name="message" rows={5} maxLength={5000} className={field} />
      </label>
      <div aria-hidden="true" className="hidden">
        <label>
          Leave this empty
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button
        type="submit"
        disabled={!ready || !configured || state === 'sending'}
        className="btn btn-primary justify-self-start disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      <p role="status" className="text-muted text-sm">
        {!configured && 'The form is available on the live site.'}
        {state === 'error' && `Your message could not be sent.${reach}`}
        {state === 'limit' && `We can’t take more messages online right now.${reach}`}
      </p>
    </form>
  );
}
