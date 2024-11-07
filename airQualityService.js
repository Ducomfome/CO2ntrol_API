const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

const getAirQualityByCoordinates = async (lat, lon) => {
  let data = {
    universalAqi: true,
    location: {
      latitude: lat,
      longitude: lon,
    },
  };

  try {
    const response = await axios.post(
      `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${API_KEY}`,
      data
    );
    return response.data;
  } catch (error) {
    console.log("Erro ao obter dados da qualidade do ar:", error);
    throw error;
  }
};

const getAllAirQualityData = async (bairrosManaus) => {
  const resultados = {};

  for (const [bairro, coordenadas] of Object.entries(bairrosManaus)) {
    try {
      const data = await getAirQualityByCoordinates(
        coordenadas.lat,
        coordenadas.lon
      );

      if (data && data.indexes[0].aqi) {
        const aqi = data.indexes[0].aqi || "Dados indisponíveis";
        resultados[bairro] = {
          qualidadeAr: aqi,
        };
      } else {
        resultados[bairro] = {
          error: "Dados de qualidade do ar não encontrados",
        };
      }
    } catch (error) {
      resultados[bairro] = { error: "Erro ao obter dados" };
    }
  }

  return resultados;
};

module.exports = {
  getAirQualityByCoordinates,
  getAllAirQualityData,
};
