import { Search, Cloud } from 'lucide-react';
import { useState } from 'react';
import './TopBar.css';

const TopBar = ({ onSearch, activeTab, setActiveTab }) => {
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');

  const isComparison = activeTab === 'comparison';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isComparison) {
      if (query1.trim() || query2.trim()) {
        onSearch(query1.trim(), query2.trim());
      }
    } else {
      if (query1.trim()) {
        onSearch(query1.trim());
      }
    }
  };

  return (
    <header className="top-bar">
      <div className="top-bar-container">
        <div className="brand">
          <Cloud className="brand-icon" size={28} />
          <span className="brand-name">Atmos</span>
        </div>

        <div className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`nav-btn ${activeTab === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparison')}
          >
            Compare
          </button>
        </div>

        <form className="search-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder={isComparison ? "First city..." : "Search for a city..."} 
              value={query1}
              onChange={(e) => setQuery1(e.target.value)}
            />
          </div>
          
          {isComparison && (
            <>
              <span className="vs-divider">VS</span>
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Second city..." 
                  value={query2}
                  onChange={(e) => setQuery2(e.target.value)}
                />
              </div>
            </>
          )}
          <button type="submit" style={{ display: 'none' }}>Search</button>
        </form>
      </div>
    </header>
  );
};

export default TopBar;
