"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface CidadeComboboxProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

// Cache global — evita refetch entre re-renders
let cidadesCache: string[] | null = null;

async function fetchMunicipiosPara(): Promise<string[]> {
  if (cidadesCache) return cidadesCache;

  try {
    // API IBGE — código do Pará: 15
    const res = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados/15/municipios?orderBy=nome"
    );
    if (!res.ok) throw new Error("Falha ao buscar municípios");
    const data: { nome: string }[] = await res.json();
    cidadesCache = data.map((m) => m.nome);
    return cidadesCache;
  } catch {
    // Fallback mínimo caso a API falhe
    return ["Belém", "Ananindeua", "Marituba", "Santarém", "Marabá", "Castanhal", "Parauapebas"];
  }
}

export default function CidadeCombobox({ value, onChange, className }: CidadeComboboxProps) {
  const [cidades, setCidades] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch municipalities on mount
  useEffect(() => {
    fetchMunicipiosPara().then((data) => {
      setCidades(data);
      setLoading(false);
    });
  }, []);

  // Sync external value
  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        // If user typed something not in the list, clear
        if (query && !cidades.includes(query)) {
          setQuery(value || "");
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query, value, cidades]);

  const filtered = query
    ? cidades.filter((c) =>
        c.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
          .includes(query.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""))
      )
    : cidades;

  const selectCity = useCallback((city: string) => {
    setQuery(city);
    onChange(city);
    setOpen(false);
    setHighlightIdx(-1);
  }, [onChange]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightIdx >= 0 && listRef.current) {
      const items = listRef.current.children;
      if (items[highlightIdx]) {
        (items[highlightIdx] as HTMLElement).scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightIdx]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) {
      setOpen(true);
      e.preventDefault();
      return;
    }

    if (!open) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightIdx((prev) => Math.min(prev + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightIdx((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightIdx >= 0 && filtered[highlightIdx]) {
          selectCity(filtered[highlightIdx]);
        }
        break;
      case "Escape":
        setOpen(false);
        setHighlightIdx(-1);
        break;
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls="cidade-listbox"
          aria-haspopup="listbox"
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={loading ? "Carregando cidades..." : "Digite para buscar..."}
          disabled={loading}
          className={className}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(""); // Clear form value until a valid city is selected
            setOpen(true);
            setHighlightIdx(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {/* Search icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          {loading ? (
            <svg className="w-4 h-4 text-primary/25 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-primary/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {open && filtered.length > 0 && (
        <ul
          ref={listRef}
          id="cidade-listbox"
          role="listbox"
          className="absolute z-50 mt-1 w-full max-h-48 overflow-auto rounded-xl bg-white border border-primary/10 shadow-card py-1 text-sm"
        >
          {filtered.slice(0, 50).map((city, i) => (
            <li
              key={city}
              role="option"
              aria-selected={highlightIdx === i}
              className={`px-4 py-2.5 cursor-pointer transition-colors duration-100 ${
                highlightIdx === i
                  ? "bg-accent/10 text-primary"
                  : city === value
                  ? "bg-accent/5 text-primary font-medium"
                  : "text-primary/70 hover:bg-primary/[0.03]"
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                selectCity(city);
              }}
              onMouseEnter={() => setHighlightIdx(i)}
            >
              {city}
            </li>
          ))}
          {filtered.length > 50 && (
            <li className="px-4 py-2 text-xs text-primary/30 text-center">
              Continue digitando para refinar...
            </li>
          )}
        </ul>
      )}

      {open && query && filtered.length === 0 && !loading && (
        <div className="absolute z-50 mt-1 w-full rounded-xl bg-white border border-primary/10 shadow-card py-3 px-4 text-sm text-primary/40 text-center">
          Nenhuma cidade encontrada
        </div>
      )}
    </div>
  );
}
