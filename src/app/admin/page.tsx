"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface Cadastro {
  id: string;
  nome: string;
  cidade: string;
  bairro: string;
  whatsapp: string;
  demanda_categoria: string;
  demanda_detalhe: string | null;
  origem: string;
  status: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  recebida: "bg-blue-100 text-blue-700",
  encaminhada: "bg-amber-100 text-amber-700",
  com_retorno: "bg-emerald-100 text-emerald-700",
};

const STATUS_LABELS: Record<string, string> = {
  recebida: "Recebida",
  encaminhada: "Encaminhada",
  com_retorno: "Com retorno",
};

export default function AdminDashboard() {
  const [cadastros, setCadastros] = useState<Cadastro[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCidade, setFilterCidade] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchCadastros = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterCidade) params.set("cidade", filterCidade);
    if (filterCategoria) params.set("categoria", filterCategoria);
    if (filterStatus) params.set("status", filterStatus);

    try {
      const res = await fetch(`/api/admin/cadastros?${params}`);
      if (res.ok) {
        const data = await res.json();
        setCadastros(data);
      } else if (res.status === 401) {
        window.location.href = "/admin/login";
      }
    } catch {
      console.error("Erro ao buscar cadastros");
    } finally {
      setLoading(false);
    }
  }, [filterCidade, filterCategoria, filterStatus]);

  useEffect(() => {
    fetchCadastros();
  }, [fetchCadastros]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  function exportCSV() {
    const headers = ["Nome", "WhatsApp", "Bairro", "Cidade", "Categoria", "Detalhe", "Origem", "Status", "Data"];
    const rows = cadastros.map((c) => [
      c.nome,
      c.whatsapp,
      c.bairro,
      c.cidade,
      c.demanda_categoria,
      c.demanda_detalhe ?? "",
      c.origem,
      c.status,
      new Date(c.created_at).toLocaleDateString("pt-BR"),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `puxirum-cadastros-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function updateStatus(id: string, newStatus: string) {
    const res = await fetch("/api/admin/cadastros", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    if (res.ok) {
      setCadastros((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
    }
  }

  const stats = {
    total: cadastros.length,
    recebidas: cadastros.filter((c) => c.status === "recebida").length,
    encaminhadas: cadastros.filter((c) => c.status === "encaminhada").length,
    retorno: cadastros.filter((c) => c.status === "com_retorno").length,
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-primary-dark border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-puxirum.png"
              alt="Puxirum"
              width={120}
              height={30}
              className="h-7 w-auto brightness-0 invert"
              unoptimized
            />
            <span className="text-white/30 text-xs font-medium bg-white/5 px-2 py-0.5 rounded">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">
              ← Voltar ao site
            </a>
            <button
              onClick={logout}
              className="text-white/40 hover:text-red-400 text-sm transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "border-primary/20", icon: "📋" },
            { label: "Recebidas", value: stats.recebidas, color: "border-blue-300", icon: "📥" },
            { label: "Encaminhadas", value: stats.encaminhadas, color: "border-amber-300", icon: "📤" },
            { label: "Com retorno", value: stats.retorno, color: "border-emerald-300", icon: "✅" },
          ].map((s) => (
            <div key={s.label} className={`bg-white rounded-xl p-5 border-l-4 ${s.color} shadow-sm`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{s.icon}</span>
                <p className="text-xs font-heading font-semibold text-primary/40 uppercase tracking-wide">
                  {s.label}
                </p>
              </div>
              <p className="text-2xl font-heading font-extrabold text-primary">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm flex flex-wrap gap-3 items-center">
          <span className="text-xs font-heading font-semibold text-primary/40 uppercase">Filtros:</span>

          <select
            value={filterCidade}
            onChange={(e) => setFilterCidade(e.target.value)}
            className="text-sm border border-primary/10 rounded-lg px-3 py-2 outline-none focus:border-accent"
          >
            <option value="">Todas as cidades</option>
            <option value="Belém">Belém</option>
            <option value="Marituba">Marituba</option>
            <option value="Santa Izabel">Santa Izabel</option>
          </select>

          <select
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value)}
            className="text-sm border border-primary/10 rounded-lg px-3 py-2 outline-none focus:border-accent"
          >
            <option value="">Todas as categorias</option>
            <option value="Saúde">Saúde</option>
            <option value="Segurança">Segurança</option>
            <option value="Emprego">Emprego</option>
            <option value="Educação">Educação</option>
            <option value="Infraestrutura">Infraestrutura</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm border border-primary/10 rounded-lg px-3 py-2 outline-none focus:border-accent"
          >
            <option value="">Todos os status</option>
            <option value="recebida">Recebida</option>
            <option value="encaminhada">Encaminhada</option>
            <option value="com_retorno">Com retorno</option>
          </select>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => { setFilterCidade(""); setFilterCategoria(""); setFilterStatus(""); }}
              className="text-xs text-primary/40 hover:text-primary transition-colors"
            >
              Limpar filtros
            </button>
            <button
              onClick={exportCSV}
              disabled={cadastros.length === 0}
              className="text-xs font-semibold bg-primary/5 hover:bg-primary/10 text-primary/60 hover:text-primary px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border-2 border-primary/10 border-t-accent rounded-full animate-spin" />
            </div>
          ) : cadastros.length === 0 ? (
            <div className="text-center py-16 text-primary/30">
              <p className="text-lg font-heading font-semibold mb-1">Nenhum cadastro encontrado</p>
              <p className="text-sm">Tente alterar os filtros ou aguarde novos envios.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary/5">
                    <th className="text-left text-xs font-heading font-semibold text-primary/40 uppercase tracking-wide px-5 py-3">Nome</th>
                    <th className="text-left text-xs font-heading font-semibold text-primary/40 uppercase tracking-wide px-5 py-3">Local</th>
                    <th className="text-left text-xs font-heading font-semibold text-primary/40 uppercase tracking-wide px-5 py-3">Categoria</th>
                    <th className="text-left text-xs font-heading font-semibold text-primary/40 uppercase tracking-wide px-5 py-3">Detalhe</th>
                    <th className="text-left text-xs font-heading font-semibold text-primary/40 uppercase tracking-wide px-5 py-3">Origem</th>
                    <th className="text-left text-xs font-heading font-semibold text-primary/40 uppercase tracking-wide px-5 py-3">Status</th>
                    <th className="text-left text-xs font-heading font-semibold text-primary/40 uppercase tracking-wide px-5 py-3">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {cadastros.map((c) => (
                    <tr key={c.id} className="border-b border-primary/[0.03] hover:bg-surface/50 transition-colors">
                      <td className="px-5 py-3">
                        <p className="text-sm font-semibold text-primary">{c.nome}</p>
                        <p className="text-xs text-primary/30">{c.whatsapp}</p>
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-sm text-primary/70">{c.bairro}</p>
                        <p className="text-xs text-primary/30">{c.cidade}</p>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs font-medium bg-primary/5 text-primary/60 px-2 py-1 rounded-md">
                          {c.demanda_categoria}
                        </span>
                      </td>
                      <td className="px-5 py-3 max-w-[200px]">
                        <p className="text-xs text-primary/40 truncate">{c.demanda_detalhe || "—"}</p>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs text-primary/40">{c.origem}</span>
                      </td>
                      <td className="px-5 py-3">
                        <select
                          value={c.status}
                          onChange={(e) => updateStatus(c.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 outline-none cursor-pointer ${STATUS_COLORS[c.status] || "bg-gray-100 text-gray-600"}`}
                        >
                          {Object.entries(STATUS_LABELS).map(([val, label]) => (
                            <option key={val} value={val}>{label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-xs text-primary/30 tabular-nums">
                          {new Date(c.created_at).toLocaleDateString("pt-BR")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
