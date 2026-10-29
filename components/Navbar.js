"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Academics", href: "/academics" },
  { name: "Results", href: "/results" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white shadow-md py-3"
        : "bg-white/95 backdrop-blur border-b border-slate-100 py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Punjab Public High School — Home">
          <Image
            src="/school-logo.jpeg"
            alt="Punjab Public High School crest"
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-lg bg-white object-contain p-0.5 shadow-sm"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-lg text-pphs-navy">
              Punjab Public
            </span>
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-600">
              High School
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                isActive(link.href)
                  ? "text-amber-600 font-semibold"
                  : "text-slate-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/admissions" 
            className="bg-pphs-navy text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-pphs-gold hover:text-pphs-navy transition-all shadow-sm"
          >
            Admissions
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-full transition-all ${isOpen ? "rotate-45 translate-y-2" : "bg-pphs-navy"}`} />
            <span className={`h-0.5 w-full transition-all ${isOpen ? "opacity-0" : "bg-pphs-navy"}`} />
            <span className={`h-0.5 w-full transition-all ${isOpen ? "-rotate-45 -translate-y-2" : "bg-pphs-navy"}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={`absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-lg font-medium transition-colors ${
                isActive(link.href)
                  ? "text-amber-600 font-semibold"
                  : "text-slate-700 hover:text-amber-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/admissions" 
            className="bg-pphs-navy text-white text-center py-3 rounded-xl font-bold"
            onClick={() => setIsOpen(false)}
          >
            Admissions Open
          </Link>
        </div>
      </div>
    </nav>
  );
}
