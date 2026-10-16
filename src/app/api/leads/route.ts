import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { calculateLeadScore } from "@/lib/scoring";
import fs from "fs";
import path from "path";

// Archivo local de respaldo si Supabase aún no está conectado
const LOCAL_LEADS_PATH = path.join(process.cwd(), "data", "leads.json");

function ensureLocalDir() {
  const dir = path.dirname(LOCAL_LEADS_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getLocalLeads() {
  ensureLocalDir();
  if (!fs.existsSync(LOCAL_LEADS_PATH)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(LOCAL_LEADS_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalLeads(leads: any[]) {
  ensureLocalDir();
  fs.writeFileSync(LOCAL_LEADS_PATH, JSON.stringify(leads, null, 2), "utf-8");
}

// 1. POST: Recibir y guardar un nuevo lead
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Calcular scoring en el servidor (seguro e inmutable)
    const { score, temperature } = calculateLeadScore(body);

    const newLead = {
      id: "lead_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      created_at: new Date().toISOString(),
      full_name: body.fullName || "Sin nombre",
      phone: body.phone || "",
      city: body.city || "",
      score,
      temperature,
      status: "no_contactado",
      answers: {
        purpose: body.purpose,
        location: body.location,
        budget: body.budget,
        payment: body.payment,
        urgency: body.urgency,
      },
    };

    // Intentar guardar en Supabase si está activo
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("leads").insert([
        {
          full_name: newLead.full_name,
          phone: newLead.phone,
          email: body.email || "",
          score: newLead.score,
          temperature: newLead.temperature,
          status: newLead.status,
          answers: newLead.answers,
        },
      ]);

      if (error) {
        console.error("Error guardando en Supabase, usando respaldo local:", error);
        const local = getLocalLeads();
        local.unshift(newLead);
        saveLocalLeads(local);
      }
    } else {
      // Guardado local (modo sin Supabase)
      const local = getLocalLeads();
      local.unshift(newLead);
      saveLocalLeads(local);
    }

    return NextResponse.json({ success: true, lead: newLead });
  } catch (err: any) {
    console.error("API error POST /api/leads:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 2. GET: Obtener lista de leads clasificados (más calientes primero)
export async function GET() {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("score", { ascending: false })
        .order("created_at", { ascending: false });

      if (!error && data) {
        return NextResponse.json({ leads: data, source: "supabase" });
      }
    }

    // Fallback local
    const local = getLocalLeads();
    local.sort((a: any, b: any) => b.score - a.score);
    return NextResponse.json({ leads: local, source: "local" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 3. PATCH: Cambiar estado (no_contactado <-> contactado) en 1 clic
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from("leads")
        .update({
          status,
          contacted_at: status === "contactado" ? new Date().toISOString() : null,
        })
        .eq("id", id);
    }

    // Actualizar también en respaldo local
    const local = getLocalLeads();
    const updated = local.map((l: any) => {
      if (l.id === id) {
        return {
          ...l,
          status,
          contacted_at: status === "contactado" ? new Date().toISOString() : null,
        };
      }
      return l;
    });
    saveLocalLeads(updated);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
