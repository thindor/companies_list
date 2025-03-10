// src/components/LatestComments.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function LatestComments({ companies }) {
  const getAllReviews = () => {
    if (!companies || !Array.isArray(companies)) return [];
    
    return companies
      .flatMap(company => 
        (company.reviews || []).map(review => ({
          ...review,
          companyId: company.id,
          companyName: company.name
        }))
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 5);
  };

  const latestReviews = getAllReviews();

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <i className="fas fa-comments text-blue-500 mr-2"></i>
        最新留言
      </h2>
      <div className="space-y-4">
        {latestReviews.map(review => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-medium">{review.nickname}</span>
                <span className="text-gray-500 text-sm ml-2">评论了</span>
                <Link
                  to={`/company/${review.companyId}`}
                  className="text-blue-500 hover:underline ml-1"
                >
                  {review.companyName}
                </Link>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestComments;