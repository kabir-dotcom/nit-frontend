import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import nitLogo from '../assets/photo/NIT white.png';


const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Our Therapies', to: '/diseases' },
  { label: 'Why Choose NIT', to: '/boosters' },
  { label: 'Pages', to: '/blog' },
];

const contactDetails = [
  { label: 'Headquarters', value: 'Kolkata, India' },
  { label: 'Helpline', value: '+91 9800808595' },
  { label: 'Email', value: 'info@nit.care', href: 'mailto:info@nit.care' },
  { label: 'Website', value: 'www.nit.care', href: 'https://www.nit.care' },
];

const socialEntries = [
  { label: 'Facebook', href: '#', Icon: FaFacebookF },
  { label: 'Instagram', href: '#', Icon: FaInstagram },
  { label: 'LinkedIn', href: '#', Icon: FaLinkedinIn },
  { label: 'YouTube', href: '#', Icon: FaYoutube },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#212121] text-white">
      <div className="mx-auto max-w-[1180px] px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr,1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={nitLogo}
                alt="Natural Immunotherapy logo"
                className="h-12 w-auto object-contain"
                loading="lazy"
                draggable="false"
              />
            </div>
            <p className="mt-6 text-sm text-white/70 font-poppins gap-4">
              <span className="text-[#ACFF37] text-xl font-semibold ">Let's begin your natural healing journey</span>. We are here to listen, guide, and help you rebuild your health - naturally.
            </p>
          </div>

          <div>
            <h6 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d1f274] font-song">
              More
            </h6>
            <ul className="mt-6 space-y-4 text-sm text-white/80 font-poppins">
              {footerLinks.map(link => (
                <li key={link.label} className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#d1f274] text-[#144d11]">
                    <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M3 6h6M6 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <Link to={link.to} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h6 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#d1f274] font-song">
              Contact Us
            </h6>
            <ul className="mt-6 space-y-3 text-sm text-white/80 font-poppins">
              {contactDetails.map(item => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-[#d1f274]">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                      {item.label === 'Headquarters' && <path d="M8 15s5-4.35 5-7.5A5 5 0 0 0 8 2a5 5 0 0 0-5 5.5C3 10.65 8 15 8 15Z" />}
                      {item.label === 'Helpline' && <path d="M3.5 3.5 6 6m4 4 2.5 2.5M4 2h2l1 3-1.5 1.5a8 8 0 0 0 4 4L11 9l3 1v2a1.5 1.5 0 0 1-1.5 1.5 11 11 0 0 1-9.5-9.5A1.5 1.5 0 0 1 4 2Z" />}
                      {item.label === 'Email' && <path d="m2.5 4.5 5.5 4 5.5-4v7a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-7Z" />}
                      {item.label === 'Website' && (
                        <>
                          <circle cx="8" cy="8" r="5" />
                          <path d="M3.5 8h9M8 3c1.5 2 1.5 8 0 10-1.5-2-1.5-8 0-10Z" />
                        </>
                      )}
                    </svg>
                  </span>
                  <div>
                    <span className="block font-semibold text-white/90 font-song">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="transition hover:text-white font-poppins">
                        {item.value}
                      </a>
                    ) : (
                      <span className="font-poppins">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-3">
              {socialEntries.map(entry => (
                <a
                  key={entry.label}
                  href={entry.href}
                  className="inline-grid h-9 w-9 place-items-center rounded-full border border-white/25 text-xs font-semibold uppercase tracking-wide text-white/80 transition hover:bg-white/10 hover:text-white font-montserrat"
                  aria-label={entry.label}
                >
                  <entry.Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/15 pt-6 text-center text-xs text-white/60 font-montserrat">
          &copy; {year} Natural Immunotherapy (NIT) | Healing through nature, not chemicals.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
