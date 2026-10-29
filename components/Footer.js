import Link from "next/link";
import Image from "next/image";
import { schoolData } from "@/lib/school-data";

export default function Footer() {
  return (
    <footer className="bg-pphs-navy text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-6" aria-label="Punjab Public High School — Home">
            <Image
              src="/school-logo.jpeg"
              alt="Punjab Public High School crest"
              width={44}
              height={44}
              className="h-11 w-11 rounded-lg bg-white object-contain p-1"
            />
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
              <span>{schoolData.contact.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-pphs-gold">📞</span>
              <a
                href={`tel:${schoolData.contact.phoneInternational}`}
                className="hover:text-pphs-gold transition-colors"
              >
                {schoolData.contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-pphs-gold">✉️</span>
              <a
                href={`mailto:${schoolData.contact.email}`}
                className="hover:text-pphs-gold transition-colors break-all"
              >
                {schoolData.contact.email}
              </a>
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
          © Punjab Public High School. All rights reserved.
        </p>
        <div className="flex gap-6 text-slate-500 text-xs">
          <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          <Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link>
        </div>
      </div>
    </footer>
  );
}
