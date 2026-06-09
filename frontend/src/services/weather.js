const API_KEY = '72e93ab483edf0bb37191831400e1f06';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (city) => {
  if (!city) return null;
  try {
    const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
