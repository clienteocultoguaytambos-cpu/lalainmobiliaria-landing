"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, ArrowRight, MapPin, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Animated Brand Watermark Video in the Main Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 flex items-center justify-center">
        <div className="relative w-full max-w-6xl aspect-video md:aspect-[21/9] opacity-35 mix-blend-screen scale-110">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/logo.jpg"
            className="w-full h-full object-cover filter contrast-125 brightness-110"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Smooth radial mask to blend edges naturally like a true luxury watermark */}
          <div className="absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_25%,#0b201d_75%)]" />
        </div>
        {/* Soft top/bottom ambient shading */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-transparent to-brand-dark" />
      </div>

      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Location pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-brand-gold/40 text-xs font-semibold text-brand-gold">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>Provincia de Cañar • Azogues • Biblián • La Troncal</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Propiedades con{" "}
              <span className="text-gold-gradient block sm:inline">
                Revisión Legal Previa
              </span>{" "}
              y Asesoría Notarial en Cañar
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100/90 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Casas y terrenos con escrituras al día y compra 100% segura, estés en Ecuador o en Estados Unidos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <a
                href="#evaluacion"
                className="btn-gold w-full sm:w-auto px-7 py-4 rounded-xl text-sm uppercase tracking-wider font-extrabold shadow-xl flex items-center justify-center gap-2"
              >
                <span>Calificar mi Inmueble o Crédito</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#propiedades"
                className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-semibold text-white bg-emerald-900/60 border border-emerald-700/50 hover:bg-emerald-800/60 transition-colors text-center"
              >
                Ver Propiedades en Cañar
              </a>
            </div>

            {/* Professional Credential Badge */}
            <div className="pt-4 flex items-center gap-3 justify-center lg:justify-start text-xs text-emerald-300/80 border-t border-emerald-800/40">
              <Award className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span>
                <strong>José Elías Lala</strong> • Asesor Inmobiliario Profesional (Reg. SENESCYT N.º 2195-2025-3164359)
              </span>
            </div>
          </div>

          {/* Right Column: Original Featured Property Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-6 glass-panel border border-brand-gold/30 shadow-2xl">
              
              {/* Featured Highlight Image Card */}
              <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden mb-5 border border-emerald-700/40">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Casa moderna en Azogues Cañar"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-brand-gold/40 text-xs text-brand-gold font-bold">
                  Sector Charasol • Azogues
                </div>
                <div className="absolute bottom-3 right-3 bg-brand-gold text-brand-dark px-3 py-1 rounded-lg text-sm font-black shadow-lg">
                  $159,000 USD
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white font-bold">Villa Residencial con Jardín</span>
                  <span className="text-xs text-emerald-300">220 m² construcción</span>
                </div>
                <p className="text-xs text-emerald-200/80">
                  3 habitaciones, acabados de primera, área BBQ y garaje para 2 vehículos. Escrituras legalizadas listas para traspaso o crédito.
                </p>

                <div className="pt-3 border-t border-emerald-800/50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Línea de fábrica y gravamen al día</span>
                  </div>
                  <a
                    href="https://wa.me/593998718159?text=Hola,%20quisiera%20más%20información%20de%20la%20casa%20en%20Charasol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-gold font-semibold hover:underline"
                  >
                    Consultar por WhatsApp →
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
