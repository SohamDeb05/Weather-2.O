import { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import { getWeather } from '../services/weather';

const WeatherView = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="single-view">
      <SearchBar onSearch={handleSearch} placeholder="Search for a city..." />
      {(weatherData || loading || error) && (
        <WeatherCard data={weatherData} loading={loading} error={error} />
      )}
    </div>
  );
};

export default WeatherView;
