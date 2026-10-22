/**
 * Wires the Contact form (markup owned by the Contact section) to src/lib/form.
 * States live on `form[data-state]`: idle · sending · success · error.
 */
import {
  MIN_FILL_MS,
  readForm,
  submitInquiry,
  validate,
  type FieldName,
} from '../lib/form';

export function initForm() {
  const form = document.querySelector<HTMLFormElement>(
    'form[data-form="inquiry"]',
  );
  if (!form) return;

  // "Discuss a similar project" links preselect the matching solution.
  document.querySelectorAll<HTMLElement>('[data-need]').forEach((link) =>
    link.addEventListener('click', () => {
      const select = form.querySelector<HTMLSelectElement>(
        'select[name="need"]',
      );
      if (select && link.dataset.need) select.value = link.dataset.need;
    }),
  );

  const accessKey = form.dataset.accessKey;
  if (!accessKey) return; // Not enabled yet: markup already shows the email/phone fallback.

  const status = document.getElementById(
    form.getAttribute('aria-describedby') ?? '',
  );
  const msg = form.dataset;
  let firstTouch = 0;
  form.addEventListener('input', () => (firstTouch ||= performance.now()));

  const setFieldError = (name: FieldName, invalid: boolean) => {
    const field = form.elements.namedItem(name) as HTMLInputElement | null;
    const error = document.getElementById(`${name}-error`);
    if (!field || !error) return;
    field.setAttribute('aria-invalid', String(invalid));
    error.hidden = !invalid;
  };

  const setState = (
    state: 'idle' | 'sending' | 'success' | 'error',
    text = '',
  ) => {
    form.dataset.state = state;
    form.setAttribute('aria-busy', String(state === 'sending'));
    if (status) status.textContent = text;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.dataset.state === 'sending') return;

    const raw = readForm(form);
    const fields: FieldName[] = [
      'name',
      'email',
      'company',
      'need',
      'message',
      'consent',
    ];

    // Honeypot filled → a bot. Pretend success, send nothing.
    if (raw.botcheck) return setState('success', msg.success);
    // Submitted faster than a person can type → ask to try again (no send).
    const tooFast = !firstTouch || performance.now() - firstTouch < MIN_FILL_MS;

    const result = validate(raw);
    fields.forEach((f) =>
      setFieldError(f, !result.ok && result.fields.includes(f)),
    );
    if (!result.ok) {
      setState('error', msg.invalid);
      (
        form.elements.namedItem(result.fields[0]) as HTMLElement | null
      )?.focus();
      return;
    }
    if (tooFast) {
      setState('error', msg.tooFast);
      return;
    }

    const select = form.querySelector<HTMLSelectElement>('select[name="need"]');
    setState('sending', msg.sending);
    try {
      await submitInquiry(result.data, {
        accessKey,
        needLabel: select?.selectedOptions[0]?.text ?? result.data.need,
        subject: msg.subject ?? 'New inquiry',
        fromName: msg.fromName ?? 'Website',
      });
      form.reset();
      firstTouch = 0;
      setState('success', msg.success);
    } catch {
      setState('error', msg.failed);
    }
  });
}
