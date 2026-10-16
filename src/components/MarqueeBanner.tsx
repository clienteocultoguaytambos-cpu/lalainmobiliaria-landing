"use client";

import React from "react";
import { 
  FileCheck2, 
  Landmark, 
  Globe2, 
  ShieldCheck, 
  MapPin, 
  BadgePercent, 
  Award,
  Sparkles 
} from "lucide-react";

export default function MarqueeBanner() {
  const items = [
    {
      icon: FileCheck2,
      text: "DOCUMENTACIÓN Y ESCRITURAS AL DÍA",
    },
    {
      icon: Landmark,
      text: "ASESORÍA EN CRÉDITO BIESS Y BANCOS",
    },
    {
      icon: Globe2,
      text: "TRÁMITES CONSULARES PARA MIGRANTES EN EE.UU.",
    },
    {
      icon: ShieldCheck,
      text: "GRAVAMEN VERIFICADO & SEGURIDAD JURÍDICA",
    },
    {
      icon: MapPin,
      text: "AZOGUES • BIBLIÁN • LA TRONCAL • DÉLEG • CAÑAR",
    },
    {
      icon: BadgePercent,
      text: "PRECIOS TRANSPARENTES SIN SORPRESAS",
    },
    {
      icon: Award,
      text: "ASESOR PROFESIONAL REGISTRADO EN SENESCYT",
    },
    {
      icon: Sparkles,
      text: "PROPIEDADES EXCLUSIVAS LISTAS PARA TRASPASO",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-brand-dark via-emerald-950 to-brand-dark border-y border-brand-gold/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 py-4 select-none">
      {/* Golden gradient accent lines */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-80" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-80" />

      {/* Edge gradient masks for seamless fade in/out */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="animate-marquee items-center gap-8 text-xs sm:text-sm font-bold tracking-wider uppercase text-emerald-100">
        {/* First set */}
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`a-${index}`}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-900/40 border border-brand-gold/20 hover:border-brand-gold/60 transition-colors whitespace-nowrap shadow-sm group"
            >
              <Icon className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" />
              <span className="text-white group-hover:text-brand-goldLight transition-colors">
                {item.text}
              </span>
              <span className="text-brand-gold/60 ml-2">✦</span>
            </div>
          );
        })}

        {/* Duplicate set for infinite seamless loop */}
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`b-${index}`}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-900/40 border border-brand-gold/20 hover:border-brand-gold/60 transition-colors whitespace-nowrap shadow-sm group"
            >
              <Icon className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" />
              <span className="text-white group-hover:text-brand-goldLight transition-colors">
                {item.text}
              </span>
              <span className="text-brand-gold/60 ml-2">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
