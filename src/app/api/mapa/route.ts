import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const supabaseAdmin =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

// Coordenadas fixas das principais cidades do Pará (fallback confiável)
const COORDS_PARA: Record<string, [number, number]> = {
  "Abaetetuba": [-48.8788, -1.7181],
  "Abel Figueiredo": [-48.3936, -4.9531],
  "Acará": [-48.1986, -1.9608],
  "Afuá": [-50.3853, -0.1542],
  "Água Azul do Norte": [-50.4792, -6.7908],
  "Alenquer": [-54.7383, -1.9417],
  "Almeirim": [-52.5814, -1.5283],
  "Altamira": [-52.2100, -3.2033],
  "Anajás": [-49.9444, -0.9869],
  "Ananindeua": [-48.3883, -1.3658],
  "Anapu": [-51.1814, -3.4722],
  "Augusto Corrêa": [-46.6383, -1.0553],
  "Aurora do Pará": [-47.5681, -2.1497],
  "Aveiro": [-55.3200, -3.6069],
  "Bagre": [-49.6206, -1.9006],
  "Baião": [-49.6694, -2.7908],
  "Bannach": [-50.3958, -7.3489],
  "Barcarena": [-48.6253, -1.5058],
  "Belém": [-48.5044, -1.4558],
  "Belterra": [-54.9536, -2.6364],
  "Benevides": [-48.2450, -1.3614],
  "Bom Jesus do Tocantins": [-48.5919, -5.1167],
  "Bonito": [-47.3067, -1.3664],
  "Bragança": [-46.7654, -1.0536],
  "Brasil Novo": [-52.5344, -3.2994],
  "Brejo Grande do Araguaia": [-48.4117, -5.6983],
  "Breu Branco": [-49.5736, -3.7717],
  "Breves": [-50.4800, -1.6822],
  "Bujaru": [-48.0453, -1.5158],
  "Cachoeira do Arari": [-48.9600, -1.0128],
  "Cachoeira do Piriá": [-46.5436, -1.7581],
  "Cametá": [-49.4956, -2.2444],
  "Canaã dos Carajás": [-49.8783, -6.4969],
  "Capanema": [-47.1808, -1.1958],
  "Capitão Poço": [-47.0828, -1.7461],
  "Castanhal": [-47.9261, -1.2939],
  "Chaves": [-49.9875, -0.1625],
  "Colares": [-48.2811, -0.9361],
  "Conceição do Araguaia": [-49.2650, -8.2575],
  "Concórdia do Pará": [-47.9431, -1.9928],
  "Cumaru do Norte": [-50.7700, -7.8108],
  "Curionópolis": [-49.6069, -6.0997],
  "Curralinho": [-49.7958, -1.8119],
  "Curuá": [-55.1175, -1.8883],
  "Curuçá": [-47.8553, -0.7336],
  "Dom Eliseu": [-47.5583, -4.2944],
  "Eldorado do Carajás": [-49.3536, -6.1028],
  "Faro": [-57.2400, -2.1692],
  "Floresta do Araguaia": [-49.6747, -7.5539],
  "Garrafão do Norte": [-47.0450, -1.9267],
  "Goianésia do Pará": [-49.0942, -3.8419],
  "Gurupá": [-51.6339, -1.4067],
  "Igarapé-Açu": [-47.6206, -1.1258],
  "Igarapé-Miri": [-48.9594, -1.9753],
  "Inhangapi": [-47.9167, -1.4314],
  "Ipixuna do Pará": [-47.5058, -2.5586],
  "Irituia": [-47.4417, -1.7719],
  "Itaituba": [-55.9833, -4.2758],
  "Itupiranga": [-49.3261, -5.1339],
  "Jacareacanga": [-57.7533, -6.2183],
  "Jacundá": [-49.1125, -4.4472],
  "Juruti": [-56.2639, -2.1525],
  "Limoeiro do Ajuru": [-49.3903, -1.8978],
  "Mãe do Rio": [-47.5589, -2.0589],
  "Magalhães Barata": [-47.5981, -0.8042],
  "Marabá": [-49.1178, -5.3686],
  "Maracanã": [-47.4522, -0.7783],
  "Marapanim": [-47.7019, -0.7158],
  "Marituba": [-48.3425, -1.3553],
  "Medicilândia": [-52.8867, -3.4461],
  "Melgaço": [-50.7144, -1.8033],
  "Mocajuba": [-49.5083, -2.5836],
  "Moju": [-48.7686, -1.8836],
  "Mojuí dos Campos": [-54.6425, -2.6831],
  "Monte Alegre": [-54.0739, -2.0050],
  "Muaná": [-49.2186, -1.5281],
  "Nova Esperança do Piriá": [-46.9728, -2.2714],
  "Nova Ipixuna": [-49.0758, -4.9183],
  "Nova Timboteua": [-47.3939, -1.2083],
  "Novo Progresso": [-55.3797, -7.1442],
  "Novo Repartimento": [-49.9500, -4.2464],
  "Óbidos": [-55.5175, -1.9025],
  "Oeiras do Pará": [-49.8622, -2.0047],
  "Oriximiná": [-55.8661, -1.7656],
  "Ourém": [-47.1167, -1.5528],
  "Ourilândia do Norte": [-51.0833, -6.7528],
  "Pacajá": [-50.6403, -3.8386],
  "Palestina do Pará": [-48.3203, -5.7375],
  "Paragominas": [-47.3528, -2.9628],
  "Parauapebas": [-49.9036, -6.0681],
  "Pau D'Arco": [-49.5700, -7.5406],
  "Peixe-Boi": [-47.3250, -1.1933],
  "Piçarra": [-48.7244, -6.4419],
  "Placas": [-54.2253, -3.8686],
  "Ponta de Pedras": [-48.8722, -1.3925],
  "Portel": [-50.8208, -1.9353],
  "Porto de Moz": [-52.2383, -1.7483],
  "Prainha": [-53.4769, -1.7983],
  "Primavera": [-47.1192, -0.9425],
  "Quatipuru": [-47.0175, -0.8975],
  "Redenção": [-50.0314, -8.0286],
  "Rio Maria": [-50.0581, -7.3122],
  "Rondon do Pará": [-48.0669, -4.7758],
  "Rurópolis": [-54.9089, -3.8442],
  "Salinópolis": [-47.3567, -0.6133],
  "Salvaterra": [-48.5175, -0.7567],
  "Santa Bárbara do Pará": [-48.2392, -1.2222],
  "Santa Cruz do Arari": [-49.1775, -0.6600],
  "Santa Izabel do Pará": [-48.1614, -1.2990],
  "Santa Luzia do Pará": [-46.9017, -1.5186],
  "Santa Maria das Barreiras": [-49.7197, -8.8572],
  "Santa Maria do Pará": [-47.5722, -1.3519],
  "Santana do Araguaia": [-50.3500, -9.3281],
  "Santarém": [-54.7081, -2.4431],
  "Santarém Novo": [-47.3847, -0.9283],
  "Santo Antônio do Tauá": [-48.1311, -1.1528],
  "São Caetano de Odivelas": [-48.0128, -0.7464],
  "São Domingos do Araguaia": [-48.7372, -5.5372],
  "São Domingos do Capim": [-47.7675, -1.6886],
  "São Félix do Xingu": [-51.9950, -6.6450],
  "São Francisco do Pará": [-47.7919, -1.1686],
  "São Geraldo do Araguaia": [-48.5583, -6.3981],
  "São João da Ponta": [-47.9253, -0.8558],
  "São João de Pirabas": [-47.1789, -0.7783],
  "São João do Araguaia": [-48.7900, -5.3647],
  "São Miguel do Guamá": [-47.4822, -1.6278],
  "São Sebastião da Boa Vista": [-49.5403, -1.7181],
  "Sapucaia": [-49.6861, -6.9406],
  "Senador José Porfírio": [-51.5778, -2.5903],
  "Soure": [-48.5231, -0.7164],
  "Tailândia": [-48.9472, -2.9458],
  "Terra Alta": [-47.9017, -1.0328],
  "Terra Santa": [-56.4867, -2.1044],
  "Tomé-Açu": [-48.3672, -2.4186],
  "Tracuateua": [-46.9017, -1.0781],
  "Trairão": [-55.9439, -4.5728],
  "Tucumã": [-51.1603, -6.7497],
  "Tucuruí": [-49.6725, -3.7661],
  "Ulianópolis": [-47.4903, -3.7522],
  "Uruará": [-53.7253, -3.7186],
  "Vigia": [-48.1422, -0.8583],
  "Viseu": [-46.1400, -1.1964],
  "Vitória do Xingu": [-52.0083, -2.8794],
  "Xinguara": [-49.9417, -7.0989],
};

export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json([]);
  }

  try {
    // Buscar todos os cadastros
    const { data, error } = await supabaseAdmin
      .from("cadastros")
      .select("cidade, demanda_categoria");

    if (error || !data) {
      return NextResponse.json([]);
    }

    // Agrupar por cidade
    const agrupado: Record<string, { total: number; categorias: Record<string, number> }> = {};
    for (const row of data) {
      const cidade = row.cidade;
      if (!agrupado[cidade]) {
        agrupado[cidade] = { total: 0, categorias: {} };
      }
      agrupado[cidade].total++;
      const cat = row.demanda_categoria || "Geral";
      agrupado[cidade].categorias[cat] = (agrupado[cidade].categorias[cat] || 0) + 1;
    }

    // Montar pontos com coordenadas
    const pontos = Object.entries(agrupado)
      .filter(([cidade]) => COORDS_PARA[cidade]) // só cidades com coordenadas conhecidas
      .map(([cidade, info], i) => {
        const coords = COORDS_PARA[cidade];
        // Top demanda = categoria com mais registros
        const topDemanda = Object.entries(info.categorias).sort((a, b) => b[1] - a[1])[0]?.[0] || "Geral";
        return {
          id: i + 1,
          bairro: cidade,
          cidade: cidade,
          coords: coords,
          demandas: info.total,
          topDemanda,
        };
      });

    return NextResponse.json(pontos);
  } catch {
    return NextResponse.json([]);
  }
}
