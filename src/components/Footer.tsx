import React from "react";
import Image from "next/image";
import { Phone, MessageCircle, MapPin, Award, Instagram, Facebook, ShieldCheck, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-emerald-900/60 pt-16 pb-12 text-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-800/40">
          
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-brand-gold/40">
                <Image
                  src="/logo.jpg"
                  alt="LALAINMOBILIARIA"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-wider block">
                  LALA<span className="text-brand-gold">INMOBILIARIA</span>
                </span>
                <span className="text-xs text-brand-gold font-medium italic">
                  "Juntos cumplimos sueños"
                </span>
              </div>
            </div>

            <p className="text-xs text-emerald-300/80 leading-relaxed max-w-sm">
              Servicios inmobiliarios profesionales en la provincia de Cañar. Casas, lotes y quintas con debida diligencia documental y asesoramiento notarial en cada paso.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-brand-gold/90">
              <Award className="w-4 h-4 flex-shrink-0" />
              <span>
                <strong>José Elías Lala</strong> • Registro SENESCYT N.º 2195-2025-3164359
              </span>
            </div>
          </div>

          {/* Contact details */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Contacto Directo
            </h4>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white">Líneas de Atención:</div>
                <div className="text-emerald-300">099 871 8159 • 099 863 3206</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-white">Cobertura Provincial:</div>
                <div className="text-emerald-300">Azogues, Biblián, Javier Loyola, El Tambo, La Troncal</div>
              </div>
            </div>

            <div className="pt-3 flex gap-3">
              <a
                href="https://www.instagram.com/lalainmobiliaria"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center hover:text-brand-gold transition-colors"
                title="Instagram"
                aria-label="Visitar perfil de Instagram de LALAINMOBILIARIA"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/people/Lala-Inmobiliaria-ACBRP/61566442654406/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center hover:text-brand-gold transition-colors"
                title="Facebook"
                aria-label="Visitar página de Facebook de LALAINMOBILIARIA"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/593998718159"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-emerald-700/60 flex items-center justify-center hover:text-brand-gold transition-colors"
                title="WhatsApp"
                aria-label="Conversar por WhatsApp con José Elías Lala"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links & Legal */}
          <div className="lg:col-span-3 space-y-2 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Navegación
            </h4>
            <ul className="space-y-1.5 text-emerald-300/80">
              <li>
                <a href="#propiedades" className="hover:text-brand-gold transition-colors">
                  Propiedades en Cañar
                </a>
              </li>
              <li>
                <a href="#migrantes" className="hover:text-brand-gold transition-colors">
                  Inversionistas en EE.UU.
                </a>
              </li>
              <li>
                <a href="#garantia" className="hover:text-brand-gold transition-colors">
                  Proceso y Seguridad Legal
                </a>
              </li>
              <li>
                <a href="#evaluacion" className="hover:text-brand-gold transition-colors text-brand-gold">
                  Calificador de Crédito
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-emerald-400/60 hover:text-brand-gold"
                >
                  <Lock className="w-3 h-3" />
                  <span>Panel de Ventas (Privado)</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-400/60 gap-4">
          <div>
            © {new Date().getFullYear()} LALAINMOBILIARIA. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Operaciones reguladas y apegadas al marco legal inmobiliario de Ecuador.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
