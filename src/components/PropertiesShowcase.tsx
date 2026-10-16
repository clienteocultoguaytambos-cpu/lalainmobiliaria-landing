import React from "react";
import Image from "next/image";
import { Bed, Bath, Car, Maximize, MapPin, CheckCircle, MessageCircle } from "lucide-react";

export default function PropertiesShowcase() {
  const properties = [
    {
      id: "charasol-villa",
      title: "Villa Residencial Moderna",
      sector: "Sector Charasol, Azogues",
      price: "$159,000 USD",
      type: "Casa Lista para Estrenar",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      specs: {
        construction: "220 m²",
        land: "246 m²",
        beds: 3,
        baths: 3,
        garage: 2,
      },
      highlights: "Cocina con isla, área BBQ, escrituras al día, aplica a crédito BIESS o bancario.",
      whatsappMsg: "Hola, deseo información y visita para la Villa en Charasol ($159,000 USD).",
    },
    {
      id: "javier-loyola-lotes",
      title: "Lotes de Alta Plusvalía (Vía UNAE)",
      sector: "Javier Loyola, Azogues / Cuenca",
      price: "Desde $28,000 USD",
      type: "Terrenos con Servicios",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      specs: {
        construction: "Lotes 450 - 600 m²",
        land: "Plano / Leve pendiente",
        beds: 0,
        baths: 0,
        garage: 0,
      },
      highlights: "Agua potable, energía eléctrica, acceso asfaltado, a 15 min de Cuenca.",
      whatsappMsg: "Hola, deseo información sobre los lotes en Javier Loyola desde $28,000 USD.",
    },
    {
      id: "biblian-quinta",
      title: "Quinta Campestre Panorámica",
      sector: "Biblián / Déleg, Cañar",
      price: "$48,000 USD",
      type: "Terreno Campestre",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      specs: {
        construction: "Área verde amplia",
        land: "1,500 m²",
        beds: 0,
        baths: 0,
        garage: 3,
      },
      highlights: "Vista panorámica al valle, clima templado, ideal casa de campo o retiro familiar.",
      whatsappMsg: "Hola, me interesa la quinta campestre en Biblián por $48,000 USD.",
    },
    {
      id: "uchupucun-residencia",
      title: "Casa Familiar con Amplio Jardín",
      sector: "Uchupucún / La Playa, Azogues",
      price: "$185,000 USD",
      type: "Casa Residencial",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      specs: {
        construction: "215 m²",
        land: "320 m²",
        beds: 4,
        baths: 3,
        garage: 3,
      },
      highlights: "Sector residencial consolidado, acabados modernos, cerca a colegios y comercio.",
      whatsappMsg: "Hola, deseo consultar detalles de la casa en Uchupucún ($185,000 USD).",
    },
  ];

  return (
    <section id="propiedades" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold block mb-2">
              Oportunidades Destacadas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Propiedades Verificadas en la Provincia de Cañar
            </h2>
            <p className="text-sm text-emerald-200/80 mt-2 max-w-xl">
              Fichas completas con metraje real, linderos saneados y precio final de mercado.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href="#evaluacion"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-gold hover:text-brand-goldLight"
            >
              ¿Buscas una ubicación o presupuesto específico? Haz clic aquí →
            </a>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden border border-emerald-800/40 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 left-2.5 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-emerald-200 border border-emerald-700/50">
                  {item.type}
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-brand-gold text-brand-dark px-2.5 py-1 rounded-md text-xs font-black shadow-lg">
                  {item.price}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-300/80 mb-1">
                    <MapPin className="w-3 h-3 text-brand-gold" />
                    <span>{item.sector}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Specs row */}
                <div className="pt-2 border-t border-emerald-800/40 grid grid-cols-3 gap-1 text-[11px] text-emerald-200/80">
                  {item.specs.beds > 0 && (
                    <div className="flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{item.specs.beds} hab.</span>
                    </div>
                  )}
                  {item.specs.baths > 0 && (
                    <div className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{item.specs.baths} baños</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Maximize className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{item.specs.construction}</span>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-300/70 line-clamp-2">
                  {item.highlights}
                </p>

                {/* WhatsApp button */}
                <a
                  href={`https://wa.me/593998718159?text=${encodeURIComponent(item.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 py-2.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-emerald-600/40 shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
