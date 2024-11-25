const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.API_KEY;

const getAirQualityByCoordinates = async (lat, lon) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    const aqi = response.data.list[0].main.aqi;
    return aqi;
  } catch (error) {
    console.error("Erro ao obter dados da qualidade do ar:", error.message);
    throw error;
  }
};

const getAllAirQualityData = async (bairrosManaus) => {
  const resultados = {};

  for (const [bairro, coordenadas] of Object.entries(bairrosManaus)) {
    try {
      const aqi = await getAirQualityByCoordinates(
        coordenadas.lat,
        coordenadas.lon
      );

      if (aqi !== null) {
        resultados[bairro] = {
          qualidadeAr: aqi,
        };
      } else {
        resultados[bairro] = {
          error: "Dados de qualidade do ar não encontrados.",
        };
      }
    } catch (error) {
      resultados[bairro] = { error: "Erro ao obter dados" };
    }
  }

  return resultados;
};

module.exports = {
  getAllAirQualityData,
  getAirQualityByCoordinates
};
