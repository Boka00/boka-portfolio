import React, { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Github,
  Linkedin,
  Loader2,
  RotateCcw,
  Send,
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { MagneticButton } from '../ui/MagneticButton';
import { SectionHeading } from '../ui/SectionHeading';

type ContactSubmissionFields = {
  name: string;
  email: string;
  message: string;
  _gotcha: string;
  _subject: string;
};

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
  /** Anti-bot honeypot field — must remain empty for legitimate humans */
  _gotcha: string;
}

const COOLDOWN_MS = 30_000;

const contactValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Please enter at least 2 characters.')
    .max(80, 'Name must be 80 characters or fewer.')
    .required('Your name is required.'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Your email address is required.'),
  message: Yup.string()
    .trim()
    .min(15, 'Please share a bit more detail (at least 15 characters).')
    .max(1500, 'Message must be 1500 characters or fewer.')
    .required('Please enter a message.'),
  _gotcha: Yup.string().max(0),
});

export const Contact: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [formspreeState, submitToFormspree, resetFormspree] =
    useForm<ContactSubmissionFields>(SITE_CONFIG.formspreeFormId);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [lastDraft, setLastDraft] = useState<ContactFormValues | null>(null);
  const [lastSubmitAt, setLastSubmitAt] = useState<number>(0);
  const [cooldownBlocked, setCooldownBlocked] = useState(false);
  const [honeypotDropped, setHoneypotDropped] = useState(false);

  const formik = useFormik<ContactFormValues>({
    initialValues: {
      name: '',
      email: '',
      message: '',
      _gotcha: '',
    },
    validationSchema: contactValidationSchema,
    onSubmit: async (values, helpers) => {
      setCooldownBlocked(false);

      // 1. Silently drop automated spam bots that populate the hidden honeypot
      if (values._gotcha.trim().length > 0) {
        setHoneypotDropped(true);
        helpers.setSubmitting(false);
        helpers.resetForm();
        return;
      }

      // 2. Client-side rate-limit cooldown guard (30s between dispatches)
      const now = Date.now();
      if (lastSubmitAt > 0 && now - lastSubmitAt < COOLDOWN_MS) {
        setCooldownBlocked(true);
        helpers.setSubmitting(false);
        return;
      }

      setLastDraft(values);

      // 3. Dispatch via official @formspree/react SDK (includes anti-bot session telemetry)
      await submitToFormspree({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        _gotcha: values._gotcha,
        _subject: `Portfolio Inquiry from ${values.name.trim()}`,
      });

      helpers.setSubmitting(false);
    },
  });

  // Reset controlled Formik inputs and stamp cooldown timestamp when Formspree succeeds
  useEffect(() => {
    if (formspreeState.succeeded) {
      setLastSubmitAt(Date.now());
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formspreeState.succeeded]);

  const handleSendAnother = () => {
    setHoneypotDropped(false);
    setCooldownBlocked(false);
    resetFormspree();
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONFIG.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      window.location.href = `mailto:${SITE_CONFIG.email}`;
    }
  };

  const buildMailtoFallback = (): string => {
    const source = lastDraft ?? formik.values;
    const subject = encodeURIComponent(
      `Portfolio Inquiry — ${source.name || 'Hello Boka'}`
    );
    const body = encodeURIComponent(
      `${source.message}\n\n— ${source.name} (${source.email})`
    );
    return `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
  };

  const isSubmitting = formik.isSubmitting || formspreeState.submitting;
  const isSuccess = formspreeState.succeeded || honeypotDropped;
  const hasServerError = Boolean(formspreeState.errors && !formspreeState.succeeded);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-heading"
          indexCode="05 // CONTACT"
          eyebrow="Initiate Collaboration"
          title="Let’s build something"
          highlight="great together."
          description="Hiring for a front-end role, scaling a React product, or need a reliable developer for a freelance build? Send a message below."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Direct Channels */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45 }}
            className="flex flex-col justify-between gap-6 lg:col-span-5"
          >
            <div className="glass-panel gradient-border-mask rounded-2xl p-6 sm:p-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Fast response · Usually within 24h</span>
              </div>

              <h3 className="mt-4 font-display text-xl font-bold text-slate-900 dark:text-white">
                Direct Channels
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                Prefer email or LinkedIn? Reach out directly anytime—I&apos;m open to full-time,
                freelance, and remote opportunities.
              </p>

              {/* Email Copy Card */}
              <div className="mt-6 rounded-xl border border-slate-200/90 bg-white/85 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                  EMAIL ADDRESS
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="truncate font-mono text-xs font-semibold text-slate-900 hover:text-violet-600 sm:text-sm dark:text-white dark:hover:text-cyan-300"
                  >
                    {SITE_CONFIG.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address to clipboard"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-[11px] font-medium text-slate-700 hover:border-violet-500/40 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={SITE_CONFIG.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-slate-200/90 bg-white/80 p-3.5 text-sm font-medium text-slate-800 hover:border-violet-500/50 hover:text-violet-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
                >
                  <span className="inline-flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 opacity-60" />
                </a>

                <a
                  href={SITE_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-slate-200/90 bg-white/80 p-3.5 text-sm font-medium text-slate-800 hover:border-violet-500/50 hover:text-violet-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
                >
                  <span className="inline-flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 opacity-60" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Formik + Yup + @formspree/react Hardened Contact Form */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-7"
          >
            {isSuccess ? (
              <div
                role="status"
                aria-live="polite"
                className="glass-panel gradient-border-mask flex h-full min-h-[360px] flex-col items-center justify-center rounded-2xl p-8 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold text-slate-900 dark:text-white">
                  Message transmitted!
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Thanks for reaching out—your message has been delivered securely and I&apos;ll
                  get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={handleSendAnother}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-300/90 bg-white/85 px-4 py-2.5 font-mono text-xs font-semibold text-slate-700 hover:border-violet-500/50 hover:text-violet-700 dark:border-white/15 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:text-cyan-300"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form
                onSubmit={formik.handleSubmit}
                noValidate
                className="glass-panel gradient-border-mask rounded-2xl p-6 sm:p-8"
              >
                <div className="mb-6 flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-white/[0.07]">
                  <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-200">
                    MESSAGE.DISPATCH // FORMSPREE + YUP
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    All fields required
                  </span>
                </div>

                {/* Anti-bot Honeypot Field (hidden from humans & screen readers; Formspree native _gotcha) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                >
                  <label htmlFor="contact-gotcha">Do not fill this field</label>
                  <input
                    id="contact-gotcha"
                    name="_gotcha"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formik.values._gotcha}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Doe"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      aria-invalid={Boolean(formik.touched.name && formik.errors.name)}
                      aria-describedby={
                        formik.touched.name && formik.errors.name ? 'contact-name-error' : undefined
                      }
                      className={`w-full rounded-xl border bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 dark:bg-[#0D0D16] dark:text-white dark:placeholder:text-slate-500 ${
                        formik.touched.name && formik.errors.name
                          ? 'border-rose-500/80 dark:border-rose-400/80'
                          : 'border-slate-300/90 focus:border-violet-500 dark:border-white/10 dark:focus:border-cyan-400'
                      }`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{formik.errors.name}</span>
                      </p>
                    )}
                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={formspreeState.errors}
                      className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@company.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      aria-invalid={Boolean(formik.touched.email && formik.errors.email)}
                      aria-describedby={
                        formik.touched.email && formik.errors.email
                          ? 'contact-email-error'
                          : undefined
                      }
                      className={`w-full rounded-xl border bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 dark:bg-[#0D0D16] dark:text-white dark:placeholder:text-slate-500 ${
                        formik.touched.email && formik.errors.email
                          ? 'border-rose-500/80 dark:border-rose-400/80'
                          : 'border-slate-300/90 focus:border-violet-500 dark:border-white/10 dark:focus:border-cyan-400'
                      }`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                      >
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{formik.errors.email}</span>
                      </p>
                    )}
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={formspreeState.errors}
                      className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="mt-5">
                  <div className="mb-1.5 flex items-center justify-between">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Message
                    </label>
                    <span className="font-mono text-[11px] text-slate-400">
                      {formik.values.message.length}/1500
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your team, project scope, or timeline..."
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(formik.touched.message && formik.errors.message)}
                    aria-describedby={
                      formik.touched.message && formik.errors.message
                        ? 'contact-message-error'
                        : undefined
                    }
                    className={`w-full resize-y rounded-xl border bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 dark:bg-[#0D0D16] dark:text-white dark:placeholder:text-slate-500 ${
                      formik.touched.message && formik.errors.message
                        ? 'border-rose-500/80 dark:border-rose-400/80'
                        : 'border-slate-300/90 focus:border-violet-500 dark:border-white/10 dark:focus:border-cyan-400'
                    }`}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                      <span>{formik.errors.message}</span>
                    </p>
                  )}
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={formspreeState.errors}
                    className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                  />
                </div>

                {/* Rate-Limit Cooldown Banner */}
                {cooldownBlocked && (
                  <div
                    role="alert"
                    className="mt-5 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-900 dark:text-amber-200"
                  >
                    <p className="font-semibold">
                      Please wait 30 seconds before sending another message.
                    </p>
                  </div>
                )}

                {/* Server / Formspree Error Banner with Mailto Fallback */}
                {hasServerError && (
                  <div
                    role="alert"
                    className="mt-5 rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs leading-relaxed text-rose-800 dark:text-rose-200"
                  >
                    <p className="font-semibold">Could not transmit message right now.</p>
                    <ValidationError
                      errors={formspreeState.errors}
                      className="mt-1 opacity-90"
                    />
                    <p className="mt-1.5 opacity-90">
                      Please try again or email me directly at{' '}
                      <a
                        href={buildMailtoFallback()}
                        className="font-mono underline underline-offset-2"
                      >
                        {SITE_CONFIG.email}
                      </a>
                      .
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-6 flex items-center justify-end">
                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-xl bg-accent-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
