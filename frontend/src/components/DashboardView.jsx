import { useState, useEffect } from 'react';
import { Wind, Droplets, Sun, CloudRain, Sunrise, Navigation, Calendar, Cloud, CloudSun } from 'lucide-react';
import { getWeather } from '../services/weather';
import WeatherIcon from './WeatherIcon';
import './DashboardView.css';

const DashboardView = ({ searchQuery }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bgImage, setBgImage] = useState("https://images.unsplash.com/photo-1540700858-a55d4af6081e?q=80&w=2000&auto=format&fit=crop");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    const fetchDefault = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getWeather(searchQuery || 'Mumbai');
        setData(result);
        
        // Fetch city image from Wikipedia
        try {
          const wikiRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(result.name)}&prop=pageimages&format=json&pithumbsize=2000&origin=*`);
          const wikiJson = await wikiRes.json();
          const pages = wikiJson.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
            setBgImage(pages[pageId].thumbnail.source);
          } else {
            setBgImage(`https://picsum.photos/1600/900?seed=${encodeURIComponent(result.name)}`);
          }
        } catch (e) {
          setBgImage(`https://picsum.photos/1600/900?seed=${encodeURIComponent(result.name)}`);
        }
        
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch weather');
      } finally {
        setLoading(false);
      }
    };
    fetchDefault();
  }, [searchQuery]);

  if (loading) return <div className="state-message">Loading weather data...</div>;
  if (error) return <div className="state-message error">{error}</div>;
  if (!data) return null;

  // Mock forecast data to match design
  const forecast = [
    { day: 'MON', temp: 72, low: 58, icon: '01d' },
    { day: 'TUE', temp: 68, low: 58, icon: '03d' },
    { day: 'WED', temp: 64, low: 52, icon: '09d' },
    { day: 'THU', temp: 70, low: 55, icon: '02d' },
    { day: 'FRI', temp: 75, low: 60, icon: '01d' },
    { day: 'SAT', temp: 78, low: 62, icon: '01d' },
    { day: 'SUN', temp: 74, low: 58, icon: '01d' }
  ];

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="hero-card" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="city-name"><Navigation size={20} className="location-icon"/> {data.name}, {data.sys.country}</h1>
            <p className="weather-desc">{data.weather[0].description}</p>
            <div className="live-badge-row">
              <span className="live-badge">LIVE</span>
              <span className="time-text">
                {currentTime.toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: '2-digit' })}
              </span>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="temp-block">
              <span className="main-temp">{Math.round(data.main.temp)}°</span>
              <p className="high-low">H: {Math.round(data.main.temp_max)}° <span className="separator">|</span> L: {Math.round(data.main.temp_min)}°</p>
            </div>
            <div className="hero-icon">
              <WeatherIcon iconCode={data.weather[0].icon} size={100} />
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="forecast-section">
        <div className="section-header">
          <h2><Calendar size={20} /> 7-Day Forecast</h2>
        </div>
        <div className="forecast-row">
          {forecast.map((day, idx) => (
            <div className="forecast-card" key={idx}>
              <span className="day-name">{day.day}</span>
              <div className="forecast-icon">
                {(day.icon === '01d' || day.icon === '01n') && <Sun size={36} color="#fbbf24" />}
                {(day.icon === '02d' || day.icon === '02n') && <CloudSun size={36} color="#fbbf24" />}
                {(day.icon === '03d' || day.icon === '04d') && <Cloud size={36} color="var(--accent-light)" />}
                {(day.icon === '09d' || day.icon === '10d') && <CloudRain size={36} color="var(--accent-light)" />}
              </div>
              <div className="day-temps">
                <span className="day-high">{day.temp}°</span>
                <span className="day-low">{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card aqi-card">
          <div className="card-header">
            <Wind size={22} color="var(--accent-light)" />
            <span>Air Quality Index</span>
            <span className="status-text right">Good (24)</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '24%', background: 'var(--accent-light)' }}></div>
            </div>
          </div>
          <p className="card-desc">Air quality is satisfactory, and air pollution poses little or no risk.</p>
        </div>

        <div className="metric-card wind-card">
          <div className="card-header">
            <Wind size={22} color="var(--accent-light)" />
            <span>Wind</span>
          </div>
          <div className="metric-large">
            <span className="value">{Math.round(data.wind.speed)}</span>
            <span className="unit">MPH</span>
          </div>
          <div className="wind-direction">
            <Navigation size={24} style={{ transform: `rotate(${data.wind.deg}deg)` }} />
            <span>NW</span>
          </div>
        </div>

        <div className="metric-card humidity-card">
          <div className="card-header">
            <Droplets size={22} color="var(--accent-light)" />
            <span>Humidity</span>
          </div>
          <div className="metric-large">
            <span className="value">{data.main.humidity}</span>
            <span className="unit">%</span>
          </div>
          <p className="card-desc">Dew point is 50°</p>
        </div>

        <div className="metric-card uv-card">
          <div className="card-header">
            <Sun size={22} color="#fbbf24" />
            <span>UV Index</span>
          </div>
          <div className="metric-large">
            <span className="value">2</span>
            <span className="unit">LOW</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: '20%', background: 'var(--accent)' }}></div>
            </div>
          </div>
        </div>

        <div className="metric-card precip-card">
          <div className="card-header">
            <CloudRain size={22} color="var(--accent-light)" />
            <span>Precipitation</span>
          </div>
          <div className="metric-large">
            <span className="value">0.1"</span>
          </div>
          <p className="card-desc">in last 24h</p>
        </div>

        <div className="metric-card daylight-card">
          <div className="card-header">
            <Sunrise size={22} color="#fbbf24" />
            <span>Daylight Cycle</span>
          </div>
          <div className="daylight-row">
            <div className="time-block">
              <span className="label">Sunrise</span>
              <span className="time">6:14 AM</span>
            </div>
            <div className="sun-track-container">
               <div className="sun-track">
                 <div className="sun-position" style={{ left: '60%' }}></div>
               </div>
            </div>
            <div className="time-block right">
              <span className="label">Sunset</span>
              <span className="time">7:58 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
