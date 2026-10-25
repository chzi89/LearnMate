import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pphs-navy text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-pphs-gold rounded-lg flex items-center justify-center text-pphs-navy font-bold text-xl">
              P
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg">Punjab Public</span>
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-400">
                High School
              </span>
            </div>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            Providing a premium educational journey from Playgroup to Matric, 
            dedicated to academic excellence, discipline, and character development.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link href="/about" className="text-slate-400 hover:text-pphs-gold transition-colors text-sm">About Us</Link></li>
            <li><Link href="/academics" className="text-slate-400 hover:text-pphs-gold transition-colors text-sm">Academics</Link></li>
            <li><Link href="/results" className="text-slate-400 hover:text-pphs-gold transition-colors text-sm">Student Results</Link></li>
            <li><Link href="/gallery" className="text-slate-400 hover:text-pphs-gold transition-colors text-sm">School Gallery</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-pphs-gold">📍</span>
              <span>Verified Address Pending Review</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-pphs-gold">📞</span>
              <span>Contact Number Pending Review</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-pphs-gold">✉️</span>
              <span>Email Pending Review</span>
            </li>
          </ul>
        </div>

        {/* Admissions CTA */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Admissions</h4>
          <p className="text-slate-400 text-sm mb-6">
            Enrolling students for the new academic session from Playgroup to Matric.
          </p>
          <Link 
            href="/admissions" 
            className="block w-full text-center bg-pphs-gold text-pphs-navy font-bold py-3 rounded-lg hover:bg-white transition-colors"
          >
            Enquire Now
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-slate-500 text-xs">
          © {typeof window !== "undefined" ? new Date().getFullYear() : "2026"} Punjab Public High School. All rights reserved.
        </p>
        <div className="flex gap-6 text-slate-500 text-xs">

          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
