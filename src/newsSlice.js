// src/newsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '52f67b2e23ac4f95a079de2f0bf9667b'; // Replace with your NewsAPI key
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: { articles: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: {
    [fetchNews.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchNews.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.articles = action.payload.articles;
    },
    [fetchNews.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default newsSlice.reducer;
