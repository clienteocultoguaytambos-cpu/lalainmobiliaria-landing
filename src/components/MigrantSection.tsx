import React from "react";
import { Plane, FileText, Video, Stamp, ShieldCheck, MessageCircle } from "lucide-react";

export default function MigrantSection() {
  const steps = [
    {
      step: "01",
      icon: Video,
      title: "Recorridos Virtuales en Vivo",
      desc: "Video llamadas 4K directas a la propiedad con linderos, accesos viales y vecindario explicado sin filtros.",
    },
    {
      step: "02",
      icon: FileText,
      title: "Debida Diligencia Documental",
      desc: "Revisión en el Registro de la Propiedad del cantón de Cañar y certificado de gravámenes antes de cualquier anticipo.",
    },
    {
      step: "03",
      icon: Stamp,
      title: "Poder Especial Consular",
      desc: "Te guiamos para tramitar tu poder en el Consulado de Ecuador en EE.UU. (NY, NJ, CT, etc.) para que tu familiar o abogado firme por ti.",
    },
    {
      step: "04",
      icon: ShieldCheck,
      title: "Escrituración y Entrega",
      desc: "Cierre notarial formal, pago seguro mediante transferencia directa y entrega inmediata del título registrado.",
    },
  ];

  return (
    <section id="migrantes" className="py-20 bg-brand-surface/40 relative overflow-hidden border-t border-emerald-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner header */}
        <div className="glass-panel p-5 sm:p-8 md:p-12 rounded-3xl border border-brand-gold/30 shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-brand-gold/40 text-xs font-bold text-brand-gold">
                <Plane className="w-3.5 h-3.5 text-brand-gold" />
                <span>Especial para Familias Ecuatorianas en Estados Unidos</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                Invierte en tu Tierra Natal con{" "}
                <span className="text-gold-gradient">Total Certeza Legal</span>{" "}
                desde el Exterior
              </h2>

              <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl font-normal leading-relaxed">
                Sabemos el esfuerzo que representa cada remesa. Por eso creamos un protocolo formal y transparente para que compres tu casa de retiro o el terreno de tu familia en Cañar sin intermediarios informales ni sorpresas.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center w-full">
              <a
                href="https://wa.me/593998718159?text=Hola%20José%20Elías,%20resido%20en%20EE.UU.%20y%20deseo%20asesoría%20para%20comprar%20en%20Cañar"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold px-6 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-bold shadow-xl flex items-center justify-center gap-2 w-full sm:w-auto text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Asesoría Remota por WhatsApp</span>
              </a>
              <span className="text-[11px] text-emerald-300/70 mt-2">
                Atención adaptada a horarios de NY, NJ y CT
              </span>
            </div>

          </div>

          {/* 4 Steps timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-emerald-800/40">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="relative space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-brand-gold/40">
                      {st.step}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-brand-gold">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white pt-1">
                    {st.title}
                  </h4>
                  <p className="text-xs text-emerald-200/70 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
