"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Lock,
  Flame,
  CloudSun,
  Snowflake,
  MessageCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Search,
  Filter,
  Phone,
  User,
  MapPin,
  ChevronRight,
  LogOut,
  Building,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);

  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTemp, setFilterTemp] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Simple PIN o Contraseña para el vendedor (default: lala2026)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "lala2026" || password === "admin" || password === "1234") {
      setIsAuthenticated(true);
      setAuthError(false);
      fetchLeads();
    } else {
      setAuthError(true);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (leadId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "contactado" ? "no_contactado" : "contactado";

    // Actualización optimista en la interfaz
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: nextStatus } : l))
    );

    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: nextStatus }),
      });
    } catch (err) {
      console.error("Error updating status:", err);
      fetchLeads();
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.city?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTemp = filterTemp === "all" || lead.temperature === filterTemp;
    const matchesStatus = filterStatus === "all" || lead.status === filterStatus;

    return matchesSearch && matchesTemp && matchesStatus;
  });

  const totalHot = leads.filter((l) => l.temperature === "hot").length;
  const totalPending = leads.filter((l) => l.status === "no_contactado").length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="glass-panel max-w-md w-full p-8 rounded-3xl border border-brand-gold/40 shadow-2xl space-y-6">
          <div className="text-center space-y-3">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden mx-auto border border-brand-gold/60 shadow-md">
              <Image src="/logo.jpg" alt="Logo LALAINMOBILIARIA" fill className="object-cover" />
            </div>
            <h1 className="text-xl font-extrabold text-white">Panel de Ventas</h1>
            <p className="text-xs text-emerald-200/80">
              Acceso exclusivo para el equipo comercial de LALAINMOBILIARIA
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-emerald-300 block mb-1">
                Contraseña de Acceso
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce la contraseña"
                  className="w-full px-4 py-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-white text-sm focus:outline-none focus:border-brand-gold"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-emerald-400 absolute right-3.5 top-3.5" />
              </div>
              {authError && (
                <span className="text-xs text-red-400 mt-1 block">
                  Contraseña incorrecta. (Clave inicial: lala2026)
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn-gold w-full py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold shadow-lg"
            >
              Ingresar al CRM
            </button>
          </form>

          <div className="text-center">
            <a href="/" className="text-xs text-emerald-300 hover:text-white underline">
              ← Volver a la Landing Page
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-emerald-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="glass-panel border-b border-emerald-800/60 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-brand-gold/40">
              <Image src="/logo.jpg" alt="LALA" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">
                LALAINMOBILIARIA • CRM Comercial
              </h2>
              <span className="text-[10px] text-brand-gold font-semibold uppercase">
                Priorización por Temperatura de Lead
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs flex items-center gap-1.5 border border-emerald-700/40"
              title="Actualizar datos"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2 rounded-lg bg-emerald-950 hover:bg-red-950/40 text-emerald-300 hover:text-red-300 border border-emerald-800 text-xs flex items-center gap-1.5"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-6">
        
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-2xl border border-emerald-800/40">
            <div className="text-xs text-emerald-300/80 mb-1">Total Prospectos</div>
            <div className="text-2xl font-black text-white">{leads.length}</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-red-500/30 bg-red-950/10">
            <div className="text-xs text-red-300 flex items-center gap-1 mb-1">
              <Flame className="w-3.5 h-3.5 text-red-400" />
              <span>🔥 Muy Calientes</span>
            </div>
            <div className="text-2xl font-black text-red-300">{totalHot}</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-amber-500/30">
            <div className="text-xs text-amber-300 flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Pendientes de Llamar</span>
            </div>
            <div className="text-2xl font-black text-amber-300">{totalPending}</div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-emerald-500/30">
            <div className="text-xs text-emerald-300 flex items-center gap-1 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contactados</span>
            </div>
            <div className="text-2xl font-black text-emerald-300">
              {leads.length - totalPending}
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="glass-card p-4 rounded-2xl border border-emerald-800/40 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, teléfono o ciudad..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-xs text-white focus:outline-none focus:border-brand-gold"
            />
            <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={filterTemp}
              onChange={(e) => setFilterTemp(e.target.value)}
              className="px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700/60 text-xs text-emerald-200 focus:outline-none"
            >
              <option value="all">Todas las Temperaturas</option>
              <option value="hot">🔥 Solo Calientes (80-100 pts)</option>
              <option value="warm">⛅ Solo Tibios (50-79 pts)</option>
              <option value="cold">❄️ Solo Fríos (&lt;50 pts)</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700/60 text-xs text-emerald-200 focus:outline-none"
            >
              <option value="all">Todos los Estados</option>
              <option value="no_contactado">Pendientes (No Contactados)</option>
              <option value="contactado">Ya Contactados</option>
            </select>
          </div>
        </div>

        {/* Classified Leads List */}
        <div className="space-y-3">
          {filteredLeads.length === 0 ? (
            <div className="glass-panel p-12 text-center rounded-2xl border border-emerald-800/40 space-y-3">
              <User className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="text-base font-bold text-white">No hay prospectos registrados aún</div>
              <p className="text-xs text-emerald-300/70 max-w-sm mx-auto">
                Los clientes que completen el calificador en la landing page aparecerán automáticamente aquí ordenados con los más calientes al tope.
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const isHot = lead.temperature === "hot";
              const isWarm = lead.temperature === "warm";
              const isContacted = lead.status === "contactado";

              return (
                <div
                  key={lead.id}
                  className={`glass-card p-5 rounded-2xl border transition-all ${
                    isHot
                      ? "border-red-500/50 bg-red-950/10 hover:border-red-400"
                      : isWarm
                      ? "border-amber-500/40 hover:border-amber-400"
                      : "border-emerald-800/40 hover:border-emerald-700"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Lead Header & Meta */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Temperature Badge */}
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                            isHot
                              ? "bg-red-500/20 text-red-300 border border-red-500/40"
                              : isWarm
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                          }`}
                        >
                          {isHot ? <Flame className="w-3 h-3 text-red-400" /> : isWarm ? <CloudSun className="w-3 h-3 text-amber-400" /> : <Snowflake className="w-3 h-3 text-blue-400" />}
                          <span>
                            {isHot ? "🔥 CALIENTE" : isWarm ? "⛅ TIBIO" : "❄️ FRÍO"}{" "}
                            ({lead.score || 0} pts)
                          </span>
                        </span>

                        {/* Date */}
                        <span className="text-[10px] text-emerald-400/60">
                          {new Date(lead.created_at).toLocaleString("es-EC", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isContacted
                              ? "bg-emerald-900 text-emerald-300 border border-emerald-700"
                              : "bg-amber-950 text-amber-300 border border-amber-700/60"
                          }`}
                        >
                          {isContacted ? "✓ CONTACTADO" : "PENDIENTE DE LLAMAR"}
                        </span>
                      </div>

                      {/* Client Name & Location */}
                      <div className="flex items-center gap-3 pt-1">
                        <h3 className="text-base font-bold text-white">
                          {lead.full_name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-emerald-300">
                          <MapPin className="w-3 h-3 text-brand-gold" />
                          <span>{lead.city || "Sin ciudad"}</span>
                        </div>
                      </div>

                      {/* Criteria tags */}
                      <div className="flex flex-wrap gap-2 text-[11px] text-emerald-200/80 pt-1">
                        <span className="px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-800">
                          Objetivo: <strong>{lead.answers?.purpose?.replace("_", " ") || "No especificado"}</strong>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-800">
                          Presupuesto: <strong>{lead.answers?.budget?.replace("_", " a ") || "N/A"}</strong>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-800">
                          Pago: <strong>{lead.answers?.payment?.replace("_", " ") || "N/A"}</strong>
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-800">
                          Plazo: <strong>{lead.answers?.urgency?.replace("_", " ") || "N/A"}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons for Sales Rep */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0">
                      
                      {/* Direct WhatsApp Call/Chat */}
                      <a
                        href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hola ${lead.full_name}, te saluda José Elías Lala de LALAINMOBILIARIA. Vi tu consulta sobre ${lead.answers?.purpose?.replace(
                            "_",
                            " "
                          )} en Cañar. ¿Tienes 5 minutos para conversar?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Abrir WhatsApp ({lead.phone})</span>
                      </a>

                      {/* Toggle status 1-click */}
                      <button
                        onClick={() => handleToggleStatus(lead.id, lead.status)}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors border flex items-center gap-1.5 ${
                          isContacted
                            ? "bg-emerald-950 border-emerald-700 text-emerald-200 hover:bg-emerald-900"
                            : "bg-emerald-800 border-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isContacted ? "Marcar No Contactado" : "Marcar Contactado"}</span>
                      </button>

                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>

      </main>
    </div>
  );
}
