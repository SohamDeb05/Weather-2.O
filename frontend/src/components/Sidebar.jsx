import { LayoutDashboard, Compass } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h2>Aether</h2>
        <p>Weather & Climate</p>
      </div>

      <nav className="sidebar-nav">
        <button 
          className={`sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>
        <button 
          className={`sidebar-link ${activeTab === 'comparison' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          <Compass size={20} />
          <span>Comparison</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
