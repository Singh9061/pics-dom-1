import { useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { FiCalendar, FiUser, FiPhone, FiMapPin, FiMessageSquare } from "react-icons/fi";

const WHATSAPP_NUMBER = "919235513863";

const EVENT_TYPES = [
  "Wedding",
  "Engagement",
  "Pre-wedding",
  "Reception",
  "Sangeet / Mehendi",
  "Destination wedding",
  "Other",
];

export default function ReserveDate() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    eventType: "Wedding",
    eventDate: "",
    city: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Name required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
      er.phone = "Valid phone required";
    if (!form.eventDate) er.eventDate = "Date required";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const buildWhatsAppText = () => {
    const lines = [
      "*Pics Dom — Reserve Date Request*",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Event: ${form.eventType}`,
      `Date: ${form.eventDate}`,
      form.city.trim() ? `City / Venue: ${form.city.trim()}` : null,
      form.message.trim() ? `Message: ${form.message.trim()}` : null,
      "",
      "Sent from picsdom.com/reserve",
    ].filter(Boolean);
    return lines.join("\n");
  };

  const whatsappUrl = (text) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const text = buildWhatsAppText();
    setSent(true);
    window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
  };

  const quickChatUrl = whatsappUrl(
    "Hello Pics Dom! I would like to reserve a date for photography."
  );

  const inputClass =
    "w-full border border-gold/20 bg-bg px-4 py-3 text-sm text-text outline-none transition focus:border-gold/50 focus:ring-1 focus:ring-gold/30";
  const labelClass =
    "mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-text-muted";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg px-6 py-24 text-text sm:px-10 md:px-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-4 block text-[10px] font-medium uppercase tracking-[0.4em] text-gold">
            Book Your Day
          </span>
          <h1 className="font-serif text-3xl font-light tracking-wide sm:text-4xl md:text-5xl">
            Reserve <span className="italic text-gold">Date</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm font-light leading-7 text-text-muted">
            Fill the form below. On submit, WhatsApp opens with your details —
            our team replies on WhatsApp.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 border border-gold/15 bg-card/40 p-6 sm:p-8 lg:col-span-3"
          >
            <div>
              <label className={labelClass} htmlFor="name">
                <FiUser size={12} className="text-gold" /> Your name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Full name"
                className={inputClass}
                autoComplete="name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className={labelClass} htmlFor="phone">
                <FiPhone size={12} className="text-gold" /> Phone / WhatsApp
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
                placeholder="10-digit mobile"
                className={inputClass}
                autoComplete="tel"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="eventType">
                  Event type
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={form.eventType}
                  onChange={onChange}
                  className={inputClass}
                >
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="eventDate">
                  <FiCalendar size={12} className="text-gold" /> Event date
                </label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={form.eventDate}
                  onChange={onChange}
                  className={inputClass}
                />
                {errors.eventDate && (
                  <p className="mt-1 text-xs text-red-500">{errors.eventDate}</p>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="city">
                <FiMapPin size={12} className="text-gold" /> City / venue
              </label>
              <input
                id="city"
                name="city"
                value={form.city}
                onChange={onChange}
                placeholder="Raebareli / Lucknow / destination…"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="message">
                <FiMessageSquare size={12} className="text-gold" /> Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={onChange}
                placeholder="Tell us about your day, package interest, guest count…"
                className={`${inputClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-3 bg-[#25D366] text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#1ebe5d]"
            >
              <FaWhatsapp size={18} />
              Send on WhatsApp
            </button>

            {sent && (
              <p className="text-center text-xs text-text-muted">
                WhatsApp should open with your details. If it didn&apos;t,{" "}
                <a
                  href={whatsappUrl(buildWhatsAppText())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold underline"
                >
                  tap here
                </a>
                .
              </p>
            )}
          </form>

          {/* WhatsApp panel */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="flex flex-1 flex-col border border-gold/15 bg-[#0b141a] p-6 text-white">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]">
                  <FaWhatsapp size={22} />
                </div>
                <div>
                  <p className="text-sm font-medium">Pics Dom</p>
                  <p className="text-[11px] text-white/50">WhatsApp · typically replies soon</p>
                </div>
              </div>

              <div className="mb-6 flex-1 rounded-lg bg-[#182229] p-4 text-sm leading-relaxed text-white/80">
                <p className="mb-2 text-[10px] uppercase tracking-widest text-white/40">
                  Preview message
                </p>
                <p className="whitespace-pre-wrap font-light">
                  {form.name || form.eventDate
                    ? buildWhatsAppText()
                    : "Fill the form — your booking message will appear here, then open in WhatsApp."}
                </p>
              </div>

              <a
                href={quickChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center gap-2 border border-[#25D366]/40 text-[11px] uppercase tracking-[0.2em] text-[#25D366] transition hover:bg-[#25D366]/10"
              >
                <FaWhatsapp size={16} />
                Open chat directly
              </a>
            </div>

            <p className="text-center text-[11px] text-text-muted">
              Or email{" "}
              <a
                href="mailto:picsdomrbl@gmail.com"
                className="text-gold underline-offset-2 hover:underline"
              >
                picsdomrbl@gmail.com
              </a>
              <br />
              <Link to="/contact" className="mt-2 inline-block text-text-muted hover:text-gold">
                ← Back to contact
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
