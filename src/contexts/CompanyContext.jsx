// src/contexts/CompanyContext.jsx
import React, { createContext, useState } from 'react';
import { initialCompanies } from '../data/mockData';

export const CompanyContext = createContext();

export function CompanyProvider({ children }) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [currentCity, setCurrentCity] = useState('深圳');

  const addCompany = (newCompany) => {
    setCompanies(prev => [...prev, newCompany]);
  };

  const updateCompanyTags = (companyId, newTags) => {
    setCompanies(prev =>
      prev.map(company =>
        company.id === companyId
          ? { ...company, tags: newTags }
          : company
      )
    );
  };

  const addReview = (companyId, review) => {
    setCompanies(prev =>
      prev.map(company =>
        company.id === companyId
          ? { ...company, reviews: [review, ...company.reviews] }
          : company
      )
    );
  };

  const addCommentToReview = (companyId, reviewId, comment) => {
    setCompanies(prev =>
      prev.map(company =>
        company.id === companyId
          ? {
              ...company,
              reviews: company.reviews.map(review =>
                review.id === reviewId
                  ? {
                      ...review,
                      comments: [...review.comments, { ...comment, id: Date.now().toString() }]
                    }
                  : review
              )
            }
          : company
      )
    );
  };

  const addSalaryScreenshot = (companyId, screenshot) => {
    setCompanies(prev =>
      prev.map(company =>
        company.id === companyId
          ? { ...company, salaryScreenshots: [...company.salaryScreenshots, screenshot] }
          : company
      )
    );
  };

  const updateCompanyLikes = (companyId, action) => {
    setCompanies(prev =>
      prev.map(company =>
        company.id === companyId
          ? {
              ...company,
              likes: action === 'like' ? company.likes + 1 : company.likes,
              dislikes: action === 'dislike' ? company.dislikes + 1 : company.dislikes
            }
          : company
      )
    );
  };

  return (
    <CompanyContext.Provider 
      value={{ 
        companies,
        currentCity,
        setCurrentCity,
        addCompany,
        updateCompanyTags,
        addReview,
        addCommentToReview,
        addSalaryScreenshot,
        updateCompanyLikes
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}