// src/components/Navigation.jsx
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CompanyContext } from '../contexts/CompanyContext';

function Navigation() {
  const { currentCity, setCurrentCity } = useContext(CompanyContext);
  const location = useLocation();
  const cities = ['深圳', '广州', '北京', '上海'];

  const showCitySelector = location.pathname === '/';

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            {location.pathname !== '/' && (
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                <i className="fas fa-arrow-left mr-2"></i>返回
              </Link>
            )}
            <h1 className="text-xl font-bold">神仙公司</h1>
            {showCitySelector && (
              <div className="relative">
                <select
                  value={currentCity}
                  onChange={(e) => setCurrentCity(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 pr-8"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <i className="fas fa-chevron-down absolute right-2 top-3 text-gray-400"></i>
              </div>
            )}
          </div>
          {location.pathname === '/' && (
            <Link 
              to="/add-company" 
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <i className="fas fa-plus mr-2"></i>添加公司
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;