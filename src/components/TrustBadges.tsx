import React from "react";
import { ShieldCheck, Landmark, Globe2, FileCheck2, UserCheck2, Scale } from "lucide-react";

export default function TrustBadges() {
  const pillars = [
    {
      icon: Scale,
      title: "Debida Diligencia Jurídica",
      description:
        "Toda propiedad pasa por revisión previa de escrituras, linderos y certificado de gravámenes actualizado antes de su publicación.",
    },
    {
      icon: Landmark,
      title: "Asesoría de Crédito Hipotecario",
      description:
        "Te guiamos en la precalificación y trámite con el BIESS, Cooperativa Cañar, JEP, CREA o banca privada para optimizar tu aprobación.",
    },
    {
      icon: Globe2,
      title: "Compras Seguras desde EE.UU.",
      description:
        "Gestión transparente para ecuatorianos en el exterior mediante poderes especiales consulares, video tours y acompañamiento legal remoto.",
    },
    {
      icon: UserCheck2,
      title: "Asesor Registrado SENESCYT",
      description:
        "Atención personalizada por José Elías Lala, profesional en Negociación y Ventas con acreditación oficial N.º 2195-2025-3164359.",
    },
  ];

  return (
    <section id="garantia" className="py-16 bg-brand-dark/80 border-y border-emerald-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-brand-gold font-bold block mb-2">
            El Estándar LALAINMOBILIARIA
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            ¿Por qué comprar o vender tu propiedad con nosotros?
          </h2>
          <p className="text-sm sm:text-base text-emerald-200/80 mt-3">
            En un mercado con informalidad, blindamos tu patrimonio con procesos transparentes, respaldo profesional y agilidad comprobada.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover p-6 rounded-xl border border-emerald-800/40 relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-900/60 border border-brand-gold/40 flex items-center justify-center mb-4 text-brand-gold">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-emerald-200/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
