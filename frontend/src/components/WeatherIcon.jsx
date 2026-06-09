import { motion } from 'motion/react';
import { 
  Sun, Moon, CloudSun, CloudMoon, Cloud, 
  CloudDrizzle, CloudRain, CloudLightning, 
  Snowflake, AlignLeft 
} from 'lucide-react';

const WeatherIcon = ({ iconCode, size = 120, className = '' }) => {
  const getIcon = () => {
    switch (iconCode) {
      case '01d':
        return (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} style={{ color: 'var(--accent)' }}>
            <Sun size={size} strokeWidth={1.5} fill="currentColor" fillOpacity={0.2} />
          </motion.div>
        );
      case '01n':
        return <Moon size={size} color="#94a3b8" strokeWidth={1.5} fill="currentColor" fillOpacity={0.2} />;
      case '02d':
        return <CloudSun size={size} color="var(--accent)" strokeWidth={1.5} />;
      case '02n':
        return <CloudMoon size={size} color="#94a3b8" strokeWidth={1.5} />;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return (
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ color: '#ffffff' }}>
            <Cloud size={size} strokeWidth={1.5} fill="currentColor" fillOpacity={0.4} />
          </motion.div>
        );
      case '09d':
      case '09n':
        return <CloudDrizzle size={size} color="#38bdf8" strokeWidth={1.5} />;
      case '10d':
      case '10n':
        return (
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ color: '#0ea5e9' }}>
            <CloudRain size={size} strokeWidth={1.5} fill="#ffffff" fillOpacity={0.4} />
          </motion.div>
        );
      case '11d':
      case '11n':
        return (
          <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} style={{ color: 'var(--accent)' }}>
            <CloudLightning size={size} strokeWidth={1.5} fill="currentColor" fillOpacity={0.3} />
          </motion.div>
        );
      case '13d':
      case '13n':
        return (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ color: '#e0f2fe' }}>
            <Snowflake size={size} strokeWidth={1.5} />
          </motion.div>
        );
      case '50d':
      case '50n':
        return <AlignLeft size={size} color="#94a3b8" strokeWidth={1.5} />;
      default:
        return <Sun size={size} color="var(--accent)" strokeWidth={1.5} />;
    }
  };

  return (
    <div className={`weather-icon-wrapper ${className}`} style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.1)) drop-shadow(0 5px 10px rgba(0,0,0,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;
