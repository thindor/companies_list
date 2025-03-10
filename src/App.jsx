// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import CompanyList from './components/CompanyList';
import AddCompanyForm from './components/AddCompanyForm';
import CompanyDetail from './components/CompanyDetail';
import { CompanyProvider } from './contexts/CompanyContext';

function App() {
  return (
    <CompanyProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <main className="max-w-6xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<CompanyList />} />
              <Route path="/add-company" element={<AddCompanyForm />} />
              <Route path="/company/:id" element={<CompanyDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CompanyProvider>
  );
}

export default App;