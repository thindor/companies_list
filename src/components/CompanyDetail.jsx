// src/components/CompanyDetail.jsx
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CompanyContext } from '../contexts/CompanyContext';
import FileUpload from './FileUpload';
import Review from './Review';

function CompanyDetail() {
  const { id } = useParams();
  const {
    companies,
    updateCompanyTags,
    addReview,
    addSalaryScreenshot,
    updateCompanyLikes,
    addCommentToReview
  } = useContext(CompanyContext);
  
  const company = companies.find(c => c.id === id);
  const [reviewForm, setReviewForm] = useState({ nickname: '', content: '' });

  if (!company) {
    return <div>公司不存在</div>;
  }

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewForm.content.trim()) return;

    const newReview = {
      id: Date.now().toString(),
      nickname: reviewForm.nickname || `神仙公司#${Math.floor(Math.random() * 9000) + 1000}`,
      content: reviewForm.content,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      comments: []
    };

    addReview(company.id, newReview);
    setReviewForm({ nickname: '', content: '' });
  };

  const handleSalaryUpload = (imageData) => {
    const newScreenshot = {
      id: Date.now().toString(),
      url: imageData,
      timestamp: new Date().toISOString()
    };
    addSalaryScreenshot(company.id, newScreenshot);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{company.name}</h2>
            <p className="text-gray-600">
              <i className="fas fa-map-marker-alt mr-2"></i>
              {company.city} - {company.address}
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => updateCompanyLikes(company.id, 'like')}
              className="flex items-center text-green-500 hover:text-green-600"
            >
              <i className="fas fa-thumbs-up mr-1"></i>
              <span>{company.likes}</span>
            </button>
            <button
              onClick={() => updateCompanyLikes(company.id, 'dislike')}
              className="flex items-center text-red-500 hover:text-red-600"
            >
              <i className="fas fa-thumbs-down mr-1"></i>
              <span>{company.dislikes}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <i className="fas fa-money-bill-wave text-green-500 mr-2"></i>
          工资表分享
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {company.salaryScreenshots.map(screenshot => (
            <div
              key={screenshot.id}
              className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100 relative group"
            >
              <img
                src={screenshot.url}
                alt="工资表"
                className="object-cover w-full h-full blur-sm"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-white">查看详情</button>
              </div>
            </div>
          ))}
          <FileUpload onUpload={handleSalaryUpload} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">发表点评</h3>
        <form onSubmit={handleAddReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              昵称（选填）
            </label>
            <input
              type="text"
              value={reviewForm.nickname}
              onChange={(e) => setReviewForm(prev => ({ ...prev, nickname: e.target.value }))}
              placeholder='留空将显示为"神仙公司+编号"'
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              你的点评
            </label>
            <textarea
              rows="4"
              value={reviewForm.content}
              onChange={(e) => setReviewForm(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="分享你的真实经历..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              发布点评
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">全部点评</h3>
        <div className="space-y-6">
          {company.reviews.map(review => (
            <Review
              key={review.id}
              review={review}
              onAddComment={(comment) => addCommentToReview(company.id, review.id, comment)}
              onLike={() => updateCompanyLikes(company.id, 'like')}
              onDislike={() => updateCompanyLikes(company.id, 'dislike')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;