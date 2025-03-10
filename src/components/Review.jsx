// src/components/Review.jsx
import React, { useState } from 'react';
import Comment from './Comment';

function Review({ review, onAddComment, onLike, onDislike }) {
  const [commentText, setCommentText] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment({
      content: commentText,
      nickname: nickname || `神仙公司#${Math.floor(Math.random() * 9000) + 1000}`,
      timestamp: new Date().toISOString(),
    });
    setCommentText('');
    setNickname('');
  };

  return (
    <div className="border-b pb-6">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <span className="font-medium">{review.nickname}</span>
          <span className="text-gray-500 text-sm ml-2">
            {new Date(review.timestamp).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <button
            onClick={() => onLike(review.id)}
            className="text-gray-500 hover:text-blue-500"
          >
            <i className="far fa-thumbs-up mr-1"></i>
            {review.likes}
          </button>
          <button
            onClick={() => onDislike(review.id)}
            className="text-gray-500 hover:text-red-500"
          >
            <i className="far fa-thumbs-down mr-1"></i>
            {review.dislikes}
          </button>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{review.content}</p>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="space-y-4">
          {review.comments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>

        <form onSubmit={handleSubmitComment} className="mt-4 space-y-3">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="昵称（选填）"
            className="w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="回复点评..."
              className="flex-1 px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
            >
              回复
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Review;