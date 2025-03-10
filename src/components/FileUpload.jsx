// src/components/FileUpload.jsx
import React, { useState } from 'react';

function FileUpload({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onUpload(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`aspect-w-4 aspect-h-3 rounded-lg border-2 border-dashed ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      } flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer`}
    >
      <label className="w-full h-full flex items-center justify-center cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        <div className="text-center">
          <i className="fas fa-upload text-gray-400 text-xl mb-2"></i>
          <p className="text-sm text-gray-500">上传工资表</p>
          <p className="text-xs text-gray-400 mt-1">点击或拖拽文件至此处</p>
        </div>
      </label>
    </div>
  );
}

export default FileUpload;