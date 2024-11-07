const express = require("express");
const cors = require("cors");
const {
  getAirQualityByCoordinates,
  getAllAirQualityData,
} = require("./airQualityService");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/:bairro", async (req, res) => {
  const { bairro } = req.params;
  const bairroName = bairro.toLowerCase().replace(/\s+/g, "");
  const coordenadas = bairrosManaus[bairroName];

  if (!coordenadas) {
    return res.status(404).json({ error: "Bairro não encontrado" });
  }

  try {
    // data vai receber um objeto com os dados da qualidade do ar
    const data = await getAirQualityByCoordinates(
      coordenadas.lat,
      coordenadas.lon
    );

    // pegando os dados da qualidade do ar
    const aqi = data.indexes[0].aqi;

    res.status(200).json({ bairro: bairroName, qualidadeAr: aqi });
  } catch (error) {
    res.status(500).json({ error: "Error ao obter dados da qualidade do ar." });
  }
});

app.get("/", async (req, res) => {
  try {
    const QualidadeArBairros = await getAllAirQualityData(bairrosManaus);
    res.status(200).json({ bairros: QualidadeArBairros });
  } catch (error) {
    console.log("Erro ao obter dados de todos os bairros:", error);
    res.status(500).json({ error: "Erro ao obter dados de todos os bairros." });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const bairrosManaus = {
  adrianopolis: { lat: -3.1016259495626137, lon: -60.01064908070632 },
  aleixo: { lat: -3.090278184492404, lon: -59.9940919865486 },
  alvorada: { lat: -3.0747836457407716, lon: -60.04234060505838 },
  aparecida: { lat: -3.117438679912766, lon: -60.029592396967075 },
  armando_mendes: { lat: -3.0902010825074857, lon: -59.943755261480256 },
  bairro_da_paz: { lat: -3.057870912947281, lon: -60.029533199988485 },
  betania: { lat: -3.1343585475243985, lon: -59.99583437038344 },
  cachoeirinha: { lat: -3.126963353670732, lon: -60.005495199634 },
  cidadededeus: { lat: -3.018457415135331, lon: -59.94482660268084 },
  cidadenova: { lat: -3.035697526504605, lon: -59.983640934725585 },
  compensa: { lat: -3.1011457819571, lon: -60.0556501558191 },
  coroado: { lat: -3.0901633188330444, lon: -59.980809582511824 },
  crespo: { lat: -3.1369814994204206, lon: -59.98913691378229 },
  distrito_industrial_um: { lat: -3.1235599412787316, lon: -59.96333563912959 },
  distrito_industrial_dois: {
    lat: -3.054714767089437,
    lon: -59.903201002715285,
  },
  dom_pedro: { lat: -3.0843835440505214, lon: -60.04325631467059 },
  educandos: { lat: -3.1411590551524067, lon: -60.010062628929404 },
  flores: { lat: -3.054362363813889, lon: -60.008239654827 },
  gloria: { lat: -3.1226865444013794, lon: -60.03479649063752 },
  japiim: { lat: -3.1125437398857074, lon: -59.97659148117433 },
  jorge_teixeira: { lat: -3.0280876675699124, lon: -59.92638701187087 },
  lago_azul: { lat: -2.973122798641998, lon: -60.01009325926242 },
  lirio_do_vale: { lat: -3.068856281859044, lon: -60.07315207157175 },
  mauazinho: { lat: -3.1227068802499542, lon: -59.93878294250721 },
  monte_das_oliveiras: { lat: -3.0039543588133375, lon: -59.99453269694 },
  nossa_senhora_das_gracas: {
    lat: -3.105058504014496,
    lon: -60.01665252147505,
  },
  nova_esperanca: { lat: -3.0833846873038553, lon: -60.058964787222344 },
  parque_dez_de_novembro: { lat: -3.0781879929374734, lon: -60.00924178116576 },
  ponta_negra: { lat: -3.054625483755504, lon: -60.09396674974685 },
  praca_14_de_janeiro: { lat: -3.121419814976767, lon: -60.01358974621051 },
  santa_etelvina: { lat: -2.9856371407953235, lon: -60.00605921732895 },
  santo_agostinho: { lat: -3.092293235123746, lon: -60.065240708565 },
  santo_antonio: { lat: -3.1159943369776273, lon: -60.04518282631828 },
  sao_francisco: { lat: -3.1093207759677557, lon: -60.00574006934754 },
  sao_jorge: { lat: -3.1076256576421804, lon: -60.03862488628446 },
  sao_jose_operario: { lat: -3.066589, lon: -59.944332 },
  tancredo_neves: { lat: -3.0538745498975755, lon: -59.94347903781214 },
  taruma: { lat: -3.0007451655802733, lon: -60.048555805666275 },
  taruma_acu: { lat: -2.987423476298756, lon: -60.07596821090221 },
  vila_buriti: { lat: -3.144499, lon: -59.969089 },
  zumbi_dos_palmares: { lat: -3.080748830040518, lon: -59.94809969891109 },
};
