import { storeClientConfig } from '@/lib/commerce';
import { LeadForm } from '@/components/kit/LeadForm';

/**
 * Shown instead of a price and a buy button while the store cannot take a
 * payment. Names and emails land in the owner's Tyashin Leads inbox, tagged
 * as launch-list sign-ups.
 */
export function LaunchList({ context }: { context?: string }) {
  const { origin, apiKey } = storeClientConfig();
  return (
    <div className="grid gap-4">
      <p className="lead">Not on sale yet. Leave your name and email and we will tell you first.</p>
      <LeadForm apiUrl={origin} apiKey={apiKey} variant="launch-list" context={context} />
    </div>
  );
}
