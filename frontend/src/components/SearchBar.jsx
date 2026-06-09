import { Search } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search city or zip code..." 
          onKeyDown={handleKeyDown}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchBar;
