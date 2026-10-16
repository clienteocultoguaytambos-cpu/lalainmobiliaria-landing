"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden border border-brand-gold/40 shadow-md group-hover:border-brand-gold transition-colors flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="Logo LALAINMOBILIARIA"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-xl font-extrabold tracking-wider text-white block truncate">
                LALA<span className="text-brand-gold">INMOBILIARIA</span>
              </span>
              <span className="text-[10px] sm:text-xs text-emerald-200/70 tracking-wider sm:tracking-widest block uppercase font-medium truncate">
                Cañar • Azogues • Ecuador
              </span>
            </div>
          </a>

          {/* Desktop Navigation: Solo "Propiedades" */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-emerald-100">
            <a
              href="#propiedades"
              className="hover:text-brand-gold transition-colors font-semibold"
            >
              Propiedades
            </a>
          </nav>

          {/* Direct CTA: WhatsApp y Botón Principal EVALUAR MI PERFIL */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/593998718159?text=Hola%20José%20Elías,%20deseo%20información%20sobre%20propiedades%20en%20Cañar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp al 099 871 8159"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-800/60 border border-emerald-600/40 text-emerald-100 hover:bg-emerald-700/60 transition-colors text-xs font-semibold"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>099 871 8159</span>
            </a>

            <a
              href="#evaluacion"
              className="btn-gold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-extrabold shadow-lg"
            >
              EVALUAR MI PERFIL
            </a>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://wa.me/593998718159"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="p-2 text-emerald-300"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir o cerrar menú de navegación"
              className="p-2 rounded-lg text-emerald-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-emerald-800/40 space-y-3">
            <a
              href="#propiedades"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-emerald-100 hover:text-brand-gold"
            >
              Propiedades
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://wa.me/593998718159"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-800/60 border border-emerald-600/40 text-emerald-100 text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: 099 871 8159</span>
              </a>
              <a
                href="#evaluacion"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-gold w-full text-center py-2.5 rounded-lg text-xs uppercase font-extrabold"
              >
                EVALUAR MI PERFIL
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
