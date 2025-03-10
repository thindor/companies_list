// src/components/AddCompanyForm.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompanyContext } from '../contexts/CompanyContext';

function AddCompanyForm() {
  const { addCompany } = useContext(CompanyContext);
  const navigate = useNavigate();
  const cities = ['深圳', '广州', '北京', '上海'];
  const tags = ['领导nice', '不加班', '福利好', '双休'];

  const [formData, setFormData] = useState({
    name: '',
    city: cities[0],
    address: '',
    selectedTags: []
  });

  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCompany = {
      id: Date.now().toString(),
      name: formData.name,
      city: formData.city,
      address: formData.address,
      tags: formData.selectedTags.map(tag => ({ name: tag, count: 1 }))
    };
    addCompany(newCompany);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              公司名称
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入公司名称"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              所在城市
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              详细地址
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入详细地址"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              初始标签
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full ${
                    formData.selectedTags.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <i className="fas fa-plus mr-2"></i>{tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              提交
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCompanyForm;