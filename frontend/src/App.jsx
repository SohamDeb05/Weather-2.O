import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import DashboardView from './components/DashboardView';
import ComparisonView from './components/ComparisonView';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [compareCities, setCompareCities] = useState({ city1: 'Mumbai', city2: 'Delhi' });

  const handleSearch = (q1, q2) => {
    if (activeTab === 'dashboard') {
      setSearchQuery(q1);
    } else {
      setCompareCities(prev => ({
        city1: q1 || prev.city1,
        city2: q2 || prev.city2
      }));
    }
  };

  return (
    <div className="app-root" style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="main-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        {activeTab === 'dashboard' && <SearchBar onSearch={handleSearch} />}
        
        <main className="main-content" style={{ flex: 1, overflowY: 'auto', padding: '0', backgroundColor: 'var(--bg-main)' }}>
          {activeTab === 'dashboard' ? (
            <DashboardView searchQuery={searchQuery} />
          ) : (
            <ComparisonView compareCities={compareCities} setCompareCities={setCompareCities} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
