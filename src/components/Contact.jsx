import { useState } from 'react'
import { motion } from 'framer-motion'
import { CONTACT, SERVICES } from '../lib/content'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Wire this up to your booking provider / backend of choice.
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-ink/5 px-6 py-28 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <h2 className="max-w-lg font-display font-extrabold uppercase text-display-md text-ink">{CONTACT.heading}</h2>
          <p className="mt-5 max-w-sm font-sans text-ink/60">{CONTACT.sub}</p>

          <div className="mt-14 flex flex-col gap-8">
            <div>
              <p className="font-sans text-xs uppercase tracking-wideish text-ink/70">Écrivez-nous</p>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block font-display font-extrabold text-3xl text-ink transition-colors hover:text-rose-deep sm:text-4xl"
              >
                {CONTACT.instagram}
              </a>
            </div>

            <div>
              <p className="font-sans text-xs uppercase tracking-wideish text-ink/70">Boutique</p>
              <p className="mt-2 max-w-sm font-sans text-ink">{CONTACT.address}</p>
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 font-sans text-sm text-rose-deep transition-colors hover:text-rose"
              >
                Itinéraire →
              </a>
            </div>

            <div>
              <p className="font-sans text-xs uppercase tracking-wideish text-ink/70">Horaires</p>
              <ul className="mt-2 flex flex-col gap-1">
                {CONTACT.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-8 font-sans text-ink">
                    <span className="text-ink/60">{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="rounded-[28px] bg-cream p-8 sm:p-10"
        >
          {submitted ? (
            <div className="flex h-full min-h-[320px] flex-col items-start justify-center gap-3">
              <p className="font-display font-extrabold text-3xl text-ink">Message envoyé.</p>
              <p className="font-sans text-ink/60">
                Nous vous répondrons par Instagram ou email sous un jour ouvré.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Nom" name="name" type="text" required />
                <Field label="Téléphone" name="phone" type="tel" required />
              </div>
              <Field label="Email" name="email" type="email" required />

              <div>
                <label htmlFor="service" className="font-sans text-sm text-ink/60">
                  Catégorie
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 font-sans text-ink outline-none focus:border-rose"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Que recherchez-vous ?
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="font-sans text-sm text-ink/60">
                  Que recherchez-vous exactement ?
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 font-sans text-ink outline-none focus:border-rose"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-rose-deep px-7 py-4 font-sans text-sm text-cream transition-colors duration-300 hover:bg-rose"
              >
                Envoyer la demande
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function Field({ label, name, type, required }) {
  return (
    <div>
      <label htmlFor={name} className="font-sans text-sm text-ink/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 font-sans text-ink outline-none focus:border-rose"
      />
    </div>
  )
}