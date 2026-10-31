import { useState } from 'react'
import { event, payment } from '../data/event'
import { useReveal } from '../lib/useReveal'
import { Band } from './Band'
import { asset } from '../lib/asset'

// Google Forms serves a stripped-down version of the form at ?embedded=true.
const embedUrl = `${event.formUrl.split('?')[0]}?embedded=true`

const steps = [
  {
    n: '01',
    title: `Pay ${payment.fee} by ${payment.method}`,
    text: `Send the fee to the ${payment.merchantLabel} below and keep the transaction ID.`,
  },
  {
    n: '02',
    title: 'Fill in the form',
    text: 'Name, mobile, email, date of birth, gender, t-shirt size, your photo, and the last 4 digits of the transaction ID.',
  },
  {
    n: '03',
    title: 'Hit submit',
    text: 'Google confirms on screen and emails you a copy of your answers. The organisers receive your entry at the same moment.',
  },
]

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      onClick={copy}
      className="rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/25"
    >
      {copied ? '✓ Copied' : 'Copy number'}
    </button>
  )
}

export function Register() {
  const ref = useReveal()
  const [loaded, setLoaded] = useState(false)

  // The section must NOT clip its overflow: with overflow-hidden the browser
  // scrolls this box instead of the page when a #form link is clicked, so the
  // decorative layers get their own clipped wrapper below.
  return (
    <section id="register" className="relative">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900 via-forest-950 to-forest-950" />
        <div className="stripes absolute inset-0" />
        <div className="absolute -top-44 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-crimson-500/10 blur-3xl" />
      </div>

      <div className="relative">
        <Band />

        <div ref={ref} className="reveal mx-auto w-full max-w-6xl px-5 py-20 sm:py-24">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-crimson-400">Registration</p>
            <h2 className="display text-4xl text-white sm:text-6xl">Secure your BIB</h2>
            <div className="mx-auto mt-5 flex max-w-max items-center gap-3 text-crimson-400/60">
              <span className="h-px w-12 bg-crimson-500/40" />
              <span className="text-xs">★</span>
              <span className="h-px w-12 bg-crimson-500/40" />
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-slate-300">
              Registration closes on {event.registrationCloses} or once slots run out — whichever comes first.
            </p>
          </div>

          {/* three steps, joined by a dashed line on desktop */}
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-9 hidden border-t border-dashed border-white/15 sm:block" />
            <div className="relative grid gap-5 sm:grid-cols-3">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="rounded-2xl border border-white/10 bg-forest-950/80 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-crimson-500/40"
                >
                  <div className="display flex h-10 w-10 items-center justify-center rounded-full border border-crimson-500/50 bg-forest-950 text-lg text-crimson-400">
                    {s.n}
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* payment details, styled like a race BIB tear-off */}
          <div className="ticket-notch relative mt-8 rounded-3xl bg-gradient-to-r from-crimson-500 to-crimson-400 text-white shadow-2xl shadow-crimson-600/20">
            <div className="grid sm:grid-cols-[1.6fr_1fr]">
              <div className="p-7 sm:p-9">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">
                  {payment.merchantLabel}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <p className="display text-4xl sm:text-5xl">{payment.merchantNumber}</p>
                  <CopyButton value={payment.merchantNumber} />
                </div>
                <p className="mt-3 max-w-md text-sm font-medium text-white/90">{payment.note}</p>
              </div>

              <div className="relative flex flex-col items-center justify-center border-t-2 border-dashed border-forest-950/25 p-7 text-center sm:border-l-2 sm:border-t-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">Entry fee</p>
                <p className="display text-6xl leading-none">{payment.fee}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/80">
                  per participant
                </p>
              </div>
            </div>
          </div>

          {/* the form itself, framed like an official document.
              #form is the anchor every "register" button jumps to. */}
          <div id="form" className="relative mt-8">
            {/* red corner brackets */}
            <span className="pointer-events-none absolute -left-1 -top-1 h-8 w-8 rounded-tl-2xl border-l-2 border-t-2 border-crimson-500/70" />
            <span className="pointer-events-none absolute -right-1 -top-1 h-8 w-8 rounded-tr-2xl border-r-2 border-t-2 border-crimson-500/70" />
            <span className="pointer-events-none absolute -bottom-1 -left-1 h-8 w-8 rounded-bl-2xl border-b-2 border-l-2 border-crimson-500/70" />
            <span className="pointer-events-none absolute -bottom-1 -right-1 h-8 w-8 rounded-br-2xl border-b-2 border-r-2 border-crimson-500/70" />

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={asset("images/logo.jpg")}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-crimson-500/50"
                  />
                  <div>
                    <p className="display text-lg leading-none text-white">Official registration form</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {event.dateLabel} · hosted securely by Google Forms
                    </p>
                  </div>
                </div>
                <a
                  href={event.formUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-crimson-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-crimson-400"
                >
                  Open in a new tab ↗
                </a>
              </div>

              <div className="p-3 sm:p-5">
                <div className="relative overflow-hidden rounded-xl bg-white shadow-inner">
                  {!loaded && (
                    <div className="flex h-[520px] items-center justify-center text-sm text-slate-500">
                      Loading the registration form…
                    </div>
                  )}
                  {/* tune this height if your form gets longer or shorter */}
                  <iframe
                    src={embedUrl}
                    title="AGES Marathon registration form"
                    onLoad={() => setLoaded(true)}
                    className={`w-full ${loaded ? 'h-[760px]' : 'h-0'}`}
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                  >
                    Loading…
                  </iframe>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/10 px-5 py-4 text-xs text-slate-400">
                <span>🔒 Your details go straight to {event.organizer}</span>
                <span>📧 Google emails you a copy as proof</span>
                <span>👤 A free Gmail account is needed to upload your photo</span>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-7 max-w-2xl text-center text-sm text-slate-400">
            Trouble registering? Write to{' '}
            <a href={`mailto:${event.email}`} className="text-crimson-400 underline underline-offset-4">
              {event.email}
            </a>{' '}
            or call {event.phone}.
          </p>
        </div>

        <Band />
      </div>
    </section>
  )
}
