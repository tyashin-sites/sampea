import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import {
  siteConfig,
  FULL_ADDRESS,
  MAILTO_URL,
  MAPS_EMBED_URL,
  TEL_URL,
  TYASHIN_API_ORIGIN,
  WHATSAPP_URL,
} from '@/config/site';
import { LeadForm } from './LeadForm';
import { SectionHeading } from './SectionHeading';

export interface ContactProps {
  eyebrow?: string;
  headline: string;
  body?: string;
  showMap?: boolean;
  /**
   * Opt-in enquiry form that sends leads to the owner's Tyashin inbox. Off by
   * default so Studio-generated sites render exactly as before.
   */
  form?: boolean;
  /** h1 when this is the first section of the page, h2 otherwise. */
  headingLevel?: 'h1' | 'h2';
}

interface Row {
  icon: typeof MapPin;
  label: string;
  value: string;
  href: string | null;
}

/** Contact facts straight from siteConfig — rows only appear for facts that exist. */
export function Contact({
  eyebrow,
  headline,
  body,
  showMap = true,
  form = false,
  headingLevel = 'h1',
}: ContactProps) {
  const rows: Row[] = [];
  if (FULL_ADDRESS) rows.push({ icon: MapPin, label: 'Address', value: FULL_ADDRESS, href: null });
  if (siteConfig.contact.phoneDisplay)
    rows.push({
      icon: Phone,
      label: 'Phone',
      value: siteConfig.contact.phoneDisplay,
      href: TEL_URL,
    });
  if (WHATSAPP_URL)
    rows.push({
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Message us on WhatsApp',
      href: WHATSAPP_URL,
    });
  if (siteConfig.contact.email)
    rows.push({ icon: Mail, label: 'Email', value: siteConfig.contact.email, href: MAILTO_URL });
  if (siteConfig.hours.summary)
    rows.push({ icon: Clock, label: 'Hours', value: siteConfig.hours.summary, href: null });
  const map = showMap && MAPS_EMBED_URL ? MAPS_EMBED_URL : null;
  if (form) return <ContactWithForm {...{ eyebrow, headline, body, headingLevel, rows, map }} />;
  return (
    <section className="section">
      <div className={`container-x grid gap-12 ${map ? 'lg:grid-cols-12' : ''}`}>
        <div className={map ? 'lg:col-span-5' : 'max-w-2xl'}>
          <SectionHeading eyebrow={eyebrow} title={headline} lead={body} as={headingLevel} />
          <ContactRows rows={rows} />
        </div>
        {map ? (
          <div className="lg:col-span-7" data-fx="rise">
            <iframe
              title={`Map showing ${FULL_ADDRESS}`}
              src={map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-border h-[420px] w-full rounded-lg border"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ContactRows({ rows }: { rows: Row[] }) {
  return (
    <ul className="mt-10 space-y-6" data-fx="stagger">
      {rows.map((r) => (
        <li key={r.label} className="flex gap-4">
          <span className="bg-primary/10 text-primary inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
            <r.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <div>
            <p className="text-muted text-xs uppercase tracking-[0.18em]">{r.label}</p>
            {r.href ? (
              <a
                href={r.href}
                className="mt-1 block font-medium underline-offset-4 hover:underline"
                {...(r.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {r.value}
              </a>
            ) : (
              <p className="mt-1 font-medium">{r.value}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * The form layout: details left, form right, map (when any) full width below.
 * Read here, on the server, and handed to the client form: TYASHIN_API_KEY is
 * in every Tyashin site's build and runtime env. TYASHIN_API_URL is NOT set for
 * Studio sites, so the origin the site was rendered for (site.ts) is the
 * fallback; without it the form would render disabled on the live site.
 */
function ContactWithForm({
  eyebrow,
  headline,
  body,
  headingLevel,
  rows,
  map,
}: {
  eyebrow?: string;
  headline: string;
  body?: string;
  headingLevel: 'h1' | 'h2';
  rows: Row[];
  map: string | null;
}) {
  const reach = [
    siteConfig.contact.phoneDisplay && `call ${siteConfig.contact.phoneDisplay}`,
    siteConfig.contact.email && `email ${siteConfig.contact.email}`,
  ].filter(Boolean);
  const fallback = reach.length ? `Please ${reach.join(' or ')}.` : undefined;
  return (
    <section className="section">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={eyebrow} title={headline} lead={body} as={headingLevel} />
          <ContactRows rows={rows} />
        </div>
        <div className="lg:col-span-7" data-fx="rise">
          <LeadForm
            apiUrl={process.env.TYASHIN_API_URL || TYASHIN_API_ORIGIN}
            apiKey={process.env.TYASHIN_API_KEY ?? ''}
            fallback={fallback}
          />
        </div>
        {map ? (
          <div className="lg:col-span-12">
            <iframe
              title={`Map showing ${FULL_ADDRESS}`}
              src={map}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-border h-[420px] w-full rounded-lg border"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
