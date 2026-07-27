import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  origem?: string;
  created_at: string;
  status?: string;
}

const memoryLeads: Lead[] = [];

// Tentativa de instanciar cliente do Supabase no backend
let supabaseClient: any = null;
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (supabaseUrl && supabaseKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseKey);
    console.log("Supabase Client inicializado no servidor Express.");
  } catch (err) {
    console.error("Erro ao inicializar Supabase no servidor Express:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Healthcheck endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", supabaseConnected: Boolean(supabaseClient) });
  });

  // Salvar lead
  app.post("/api/leads", async (req, res) => {
    const { id, nome, email, telefone, origem, created_at, status } = req.body;

    if (!nome || !email || !telefone) {
      return res.status(400).json({ error: "Nome, e-mail e telefone são obrigatórios." });
    }

    const lead: Lead = {
      id: id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      nome: String(nome).trim(),
      email: String(email).trim().toLowerCase(),
      telefone: String(telefone).trim(),
      origem: origem || "Landing Page",
      created_at: created_at || new Date().toISOString(),
      status: status || "Novo",
    };

    memoryLeads.unshift(lead);

    let storedInSupabase = false;
    let supabaseMsg = "";

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("leads")
          .insert([
            {
              nome: lead.nome,
              email: lead.email,
              telefone: lead.telefone,
              origem: lead.origem,
              status: lead.status,
              created_at: lead.created_at,
            },
          ])
          .select();

        if (!error) {
          storedInSupabase = true;
          if (data && data[0] && data[0].id) {
            lead.id = data[0].id;
          }
        } else {
          supabaseMsg = error.message;
          console.warn("Supabase Express insert warning:", error);
        }
      } catch (err: any) {
        supabaseMsg = err.message || "Erro na conexão";
        console.error("Erro ao salvar no Supabase via backend:", err);
      }
    }

    res.json({
      success: true,
      lead,
      storedInSupabase,
      message: storedInSupabase
        ? "Lead registrado no Supabase com sucesso!"
        : supabaseMsg
        ? `Lead salvo na memória (Supabase: ${supabaseMsg})`
        : "Lead armazenado com sucesso!",
    });
  });

  // Listar leads
  app.get("/api/leads", async (req, res) => {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          return res.json(data);
        }
      } catch (err) {
        console.warn("Falha ao buscar leads do Supabase no backend:", err);
      }
    }
    res.json(memoryLeads);
  });

  // Deletar lead
  app.delete("/api/leads/:id", async (req, res) => {
    const { id } = req.params;
    const index = memoryLeads.findIndex((l) => l.id === id);
    if (index !== -1) {
      memoryLeads.splice(index, 1);
    }

    if (supabaseClient) {
      try {
        await supabaseClient.from("leads").delete().eq("id", id);
      } catch (e) {
        console.warn("Erro ao deletar lead do Supabase:", e);
      }
    }

    res.json({ success: true, message: "Lead removido." });
  });

  // Configuração do Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer();
