/**
 * Inquiry form → Web3Forms (D18). Browser-side JSON POST; the access key is public by design.
 * Validation uses zod/mini (~2 KB) to keep the JS budget for motion (MOTION §6).
 */
import * as z from 'zod/mini';

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
/** Humans take longer than this from first interaction to submit; faster = bot. */
export const MIN_FILL_MS = 3000;
export const TIMEOUT_MS = 10_000;

export const inquirySchema = z.object({
  name: z
    .string()
    .check(z.trim(), z.minLength(1, 'name'), z.maxLength(120, 'name')),
  email: z.email('email'),
  company: z.optional(z.string().check(z.trim(), z.maxLength(160, 'company'))),
  need: z.string().check(z.minLength(1, 'need')),
  message: z
    .string()
    .check(z.trim(), z.minLength(10, 'message'), z.maxLength(5000, 'message')),
  consent: z.literal('on', 'consent'),
});
export type Inquiry = z.infer<typeof inquirySchema>;
export type FieldName = keyof Inquiry;

export function readForm(form: HTMLFormElement): Record<string, string> {
  const data = new FormData(form);
  const out: Record<string, string> = {};
  for (const [k, v] of data.entries()) if (typeof v === 'string') out[k] = v;
  return out;
}

/** Returns the invalid field names (in form order), or the parsed inquiry. */
export function validate(
  raw: Record<string, string>,
): { ok: true; data: Inquiry } | { ok: false; fields: FieldName[] } {
  const result = inquirySchema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };
  const fields = [
    ...new Set(result.error.issues.map((i) => i.path[0] as FieldName)),
  ];
  return { ok: false, fields };
}

export async function submitInquiry(
  data: Inquiry,
  opts: {
    accessKey: string;
    needLabel: string;
    subject: string;
    fromName: string;
  },
): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: opts.accessKey,
        subject: opts.subject,
        from_name: opts.fromName,
        name: data.name,
        email: data.email,
        company: data.company || '—',
        need: opts.needLabel,
        message: data.message,
        consent: 'Yes — agreed to the privacy notice',
        botcheck: '',
      }),
      signal: controller.signal,
    });
    const body = (await res.json().catch(() => ({}))) as { success?: boolean };
    if (!res.ok || !body.success) throw new Error(`Web3Forms ${res.status}`);
  } finally {
    clearTimeout(timer);
  }
}
