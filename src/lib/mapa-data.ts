export interface PontoMapa {
  id: number;
  bairro: string;
  cidade: string;
  coords: [number, number]; // [lng, lat]
  demandas: number;
  topDemanda: string;
}

// TODO: substituir por dados reais do Supabase quando configurado
export const PONTOS_MAPA: PontoMapa[] = [
  {
    id: 1,
    bairro: "Guamá",
    cidade: "Belém",
    coords: [-48.4897, -1.4631],
    demandas: 42,
    topDemanda: "Infraestrutura",
  },
  {
    id: 2,
    bairro: "Terra Firme",
    cidade: "Belém",
    coords: [-48.4783, -1.4528],
    demandas: 35,
    topDemanda: "Segurança",
  },
  {
    id: 3,
    bairro: "Jurunas",
    cidade: "Belém",
    coords: [-48.5012, -1.4589],
    demandas: 29,
    topDemanda: "Saúde",
  },
  {
    id: 4,
    bairro: "Pedreira",
    cidade: "Belém",
    coords: [-48.4721, -1.4312],
    demandas: 24,
    topDemanda: "Educação",
  },
  {
    id: 5,
    bairro: "Sacramenta",
    cidade: "Belém",
    coords: [-48.4634, -1.4098],
    demandas: 18,
    topDemanda: "Emprego",
  },
  {
    id: 6,
    bairro: "Centro",
    cidade: "Marituba",
    coords: [-48.3453, -1.3553],
    demandas: 28,
    topDemanda: "Saúde",
  },
  {
    id: 7,
    bairro: "Nova Marituba",
    cidade: "Marituba",
    coords: [-48.3321, -1.3612],
    demandas: 15,
    topDemanda: "Infraestrutura",
  },
  {
    id: 8,
    bairro: "Centro",
    cidade: "Santa Izabel",
    coords: [-48.1614, -1.2990],
    demandas: 22,
    topDemanda: "Saúde",
  },
  {
    id: 9,
    bairro: "Americano",
    cidade: "Santa Izabel",
    coords: [-48.1832, -1.3105],
    demandas: 12,
    topDemanda: "Educação",
  },
];
