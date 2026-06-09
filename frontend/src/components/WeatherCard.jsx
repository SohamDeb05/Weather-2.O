import { Wind, Droplets, Thermometer, Cloud } from 'lucide-react';
import './WeatherCard.css';

const WeatherCard = ({ data, loading, error }) => {
  if (loading) {
    return <div className="weather-card glass loading">Loading weather data...</div>;
  }

  if (error) {
    return <div className="weather-card glass error">{error}</div>;
  }

  if (!data) {
    return null;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  return (
    <div className="weather-card glass">
      <div className="weather-header">
        <div className="city-info">
          <h2>{data.name}, {data.sys.country}</h2>
          <p className="description">{data.weather[0].description}</p>
        </div>
        <div className="weather-icon-container">
          <img src={iconUrl} alt={data.weather[0].description} />
        </div>
      </div>
      
      <div className="temperature-section">
        <h1 className="temperature">{Math.round(data.main.temp)}°</h1>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <Thermometer size={20} className="detail-icon" />
          <div className="detail-text">
            <span className="label">Feels like</span>
            <span className="value">{Math.round(data.main.feels_like)}°</span>
          </div>
        </div>
        <div className="detail-item">
          <Wind size={20} className="detail-icon" />
          <div className="detail-text">
            <span className="label">Wind</span>
            <span className="value">{data.wind.speed} m/s</span>
          </div>
        </div>
        <div className="detail-item">
          <Droplets size={20} className="detail-icon" />
          <div className="detail-text">
            <span className="label">Humidity</span>
            <span className="value">{data.main.humidity}%</span>
          </div>
        </div>
        <div className="detail-item">
          <Cloud size={20} className="detail-icon" />
          <div className="detail-text">
            <span className="label">Clouds</span>
            <span className="value">{data.clouds.all}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
