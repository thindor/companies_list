// src/components/CompanyList.jsx
import React, { useContext, useState } from 'react';
import { CompanyContext } from '../contexts/CompanyContext';
import CompanyCard from './CompanyCard';
import LatestComments from './LatestComments';

function CompanyList() {
  const { companies, currentCity } = useContext(CompanyContext);
  const [selectedTags, setSelectedTags] = useState([]);
  
  const tags = ['领导nice', '不加班', '福利好', '双休'];

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredCompanies = companies.filter(company => {
    const cityMatch = company.city === currentCity;
    if (selectedTags.length === 0) return cityMatch;
    return cityMatch && selectedTags.every(tag => 
      company.tags.some(t => t.name === tag)
    );
  });

  return (
    <div>
      <LatestComments companies={companies} />
      
      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-4 py-2 rounded-full shadow hover:shadow-md transition-all ${
              selectedTags.includes(tag)
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            <i className="far fa-thumbs-up mr-2"></i>{tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}

export default CompanyList;