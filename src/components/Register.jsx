import { useState } from 'react'
import { event, payment } from '../data/event'
import { useReveal } from '../lib/useReveal'

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

export function Register() {
  const ref = useReveal()
  const [loaded, setLoaded] = useState(false)

  return (
    <section id="register" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-950" />
      <div className="absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />

      <div ref={ref} className="reveal relative mx-auto w-full max-w-6xl px-5">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-gold-500">Registration</p>
          <h2 className="display text-4xl text-white sm:text-5xl">Secure your BIB</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Registration closes on {event.registrationCloses} or once slots run out — whichever comes first.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="display text-3xl text-gold-500/70">{s.n}</div>
              <h3 className="mt-2 font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
            </div>
          ))}
        </div>

        {/* payment details */}
        <div className="mt-6 flex flex-col items-center justify-between gap-5 rounded-2xl border border-gold-500/40 bg-gold-500/10 p-6 sm:flex-row">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              {payment.merchantLabel}
            </p>
            <p className="display mt-1 text-3xl text-white">{payment.merchantNumber}</p>
            <p className="mt-2 max-w-md text-sm text-slate-300">{payment.note}</p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Entry fee</p>
            <p className="display text-5xl text-white">{payment.fee}</p>
            <p className="text-xs text-slate-300">per participant</p>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-2 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3">
            <span className="text-sm font-medium text-slate-300">
              Official registration form · hosted securely by Google Forms
            </span>
            <a
              href={event.formUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gold-500 px-5 py-2 text-sm font-bold text-navy-950 transition hover:bg-gold-400"
            >
              Open in a new tab ↗
            </a>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white">
            {!loaded && (
              <div className="flex h-[600px] items-center justify-center text-sm text-slate-500">
                Loading the registration form…
              </div>
            )}
            <iframe
              src={embedUrl}
              title="AGES Marathon registration form"
              onLoad={() => setLoaded(true)}
              className={`w-full ${loaded ? 'h-[1600px]' : 'h-0'}`}
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
            >
              Loading…
            </iframe>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-slate-400">
          The form asks you to upload a photo, so Google will ask you to sign in with any free Gmail account. Trouble
          registering? Write to{' '}
          <a href={`mailto:${event.email}`} className="text-gold-400 underline underline-offset-4">
            {event.email}
          </a>{' '}
          or call {event.phone}.
        </p>
      </div>
    </section>
  )
}
