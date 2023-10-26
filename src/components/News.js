// src/components/News.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../newsSlice';

import './News.css'; // Import the CSS file

function News() {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (news.status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (news.status === 'failed') {
    return <div className="error">Error: {news.error}</div>;
  }

  return (
    <div className="news-container">
      <h2>Business News</h2>
      <ul>
        {news.articles.map((article) => (
          <li key={article.title}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default News;
