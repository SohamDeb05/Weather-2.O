import { useState, useEffect } from 'react';
import { Wind, Droplets, Cloud, Thermometer, Search } from 'lucide-react';
import { getWeather } from '../services/weather';
import WeatherIcon from './WeatherIcon';
import './ComparisonView.css';

const ComparisonView = ({ compareCities, setCompareCities }) => {
  const [city1Data, setCity1Data] = useState(null);
  const [city2Data, setCity2Data] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [input1, setInput1] = useState(compareCities.city1);
  const [input2, setInput2] = useState(compareCities.city2);

  const handleSearch1 = (e) => {
    e.preventDefault();
    if(input1.trim()) setCompareCities(prev => ({ ...prev, city1: input1.trim() }));
  };

  const handleSearch2 = (e) => {
    e.preventDefault();
    if(input2.trim()) setCompareCities(prev => ({ ...prev, city2: input2.trim() }));
  };

  useEffect(() => {
    const fetchDefault = async () => {
      setLoading(true);
      setError(null);
      try {
        const [res1, res2] = await Promise.all([
          getWeather(compareCities.city1),
          getWeather(compareCities.city2)
        ]);
        setCity1Data(res1);
        setCity2Data(res2);
      } catch (err) {
        setError("Failed to fetch comparison data. Please ensure both cities are valid.");
      } finally {
        setLoading(false);
      }
    };
    fetchDefault();
  }, [compareCities]);

  const renderCityCard = (data) => {
    return (
      <div className="comp-card">
        <div className="comp-card-header">
          <div>
            <h3>{data.name}</h3>
            <span className="country-code">{data.sys.country}</span>
          </div>
          <WeatherIcon iconCode={data.weather[0].icon} size={50} />
        </div>
        
        <div className="comp-temp-container">
          <div className="comp-temp">{Math.round(data.main.temp)}°</div>
          <div className="comp-desc">{data.weather[0].description}</div>
        </div>

        <div className="comp-metrics">
          <div className="c-metric">
            <span className="c-label"><Thermometer size={14}/> Feels Like</span>
            <span className="c-val">{Math.round(data.main.feels_like)}°</span>
          </div>
          <div className="c-metric">
            <span className="c-label"><Wind size={14}/> Wind</span>
            <span className="c-val">{data.wind.speed} m/s</span>
          </div>
          <div className="c-metric">
            <span className="c-label"><Droplets size={14}/> Humidity</span>
            <span className="c-val">{data.main.humidity}%</span>
          </div>
          <div className="c-metric">
            <span className="c-label"><Cloud size={14}/> Cloud Cover</span>
            <span className="c-val">{data.clouds.all}%</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="comparison-view">
      <div className="comparison-header">
        <h2>City Comparison</h2>
        <p>Real-time data comparison without the clutter.</p>

        <div className="comp-search-container">
          <form onSubmit={handleSearch1} className="comp-search-box">
            <Search size={18} />
            <input 
              type="text" 
              value={input1} 
              onChange={e => setInput1(e.target.value)} 
              placeholder="Search first city..." 
            />
          </form>
          <form onSubmit={handleSearch2} className="comp-search-box">
            <Search size={18} />
            <input 
              type="text" 
              value={input2} 
              onChange={e => setInput2(e.target.value)} 
              placeholder="Search second city..." 
            />
          </form>
        </div>
      </div>

      {loading ? (
        <div className="state-message">Loading comparison...</div>
      ) : error ? (
        <div className="state-message error">{error}</div>
      ) : (city1Data && city2Data) ? (
        <div className="comparison-cards">
          {renderCityCard(city1Data)}
          <div className="vs-badge">VS</div>
          {renderCityCard(city2Data)}
        </div>
      ) : null}
    </div>
  );
};

export default ComparisonView;
