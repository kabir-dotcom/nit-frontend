import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        timestamp: new Date().toLocaleString(),
        website_origin: window.location.origin,
      };

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus("✅ Thank you! A practitioner will reply within 1 business day.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("❌ Sorry, something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-slate-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* ----- Left Side Info ----- */}
        <div className="space-y-6 text-slate-100">
          <h1 className="text-3xl font-semibold text-white">
            Book a Discovery Consult
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Share your story — our clinical director will review your case and map
            out the first steps including liver detox, bone marrow support, and
            immune balancing. You’ll hear back within 24 hours on weekdays.
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-6">
            <h2 className="text-lg font-semibold text-white">Clinic Hours</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>Mon–Thu: 9am – 6pm</li>
              <li>Fri: 9am – 3pm</li>
              <li>Virtual consults available worldwide</li>
              <li>Phone: +91 9800808595</li>
            </ul>
          </div>
        </div>

        {/* ----- Contact Form ----- */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-xl shadow-primary-100"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700"
              >
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm shadow-sm focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
                placeholder="Share your health goals or diagnosis..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Submit Inquiry"}
          </button>

          {status && (
            <p className="mt-4 text-center text-sm font-medium text-green-700">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
