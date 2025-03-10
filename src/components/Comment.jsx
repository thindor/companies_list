// src/components/Comment.jsx
import React from 'react';

function Comment({ comment }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-medium text-sm">{comment.nickname}</span>
          <span className="text-gray-500 text-xs ml-2">
            {new Date(comment.timestamp).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-gray-700">{comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;