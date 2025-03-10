// src/components/CompanyCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function CompanyCard({ company }) {
  const { id, name, address, tags } = company;

  return (
    <Link to={`/company/${id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-gray-600 mb-4">{address}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map(tag => (
              <span 
                key={tag.name}
                className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
          <div className="text-blue-500 hover:text-blue-700">
            <i className="fas fa-plus-circle mr-1"></i>查看更多
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CompanyCard;