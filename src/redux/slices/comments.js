import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAddComment = createAsyncThunk(
  'comments/fetchAddComment',
  async (obj) => {
    const { data } = await axios.post(`/comments`, obj);

    return data;
  }
);

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId) => {
    const { data } = await axios.get(`/posts/comments/${postId}`);
    return data;
  }
);

export const fetchLastComments = createAsyncThunk(
  'comment/fetchLastComments',
  async () => {
    const { data } = await axios.get(`/comments`);
    return data;
  }
);

const initialState = {
  comments: [],
  status: 'loading',
};

const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAddComment.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchAddComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload);
      state.status = 'loaded';
    },
    [fetchAddComment.rejected]: (state) => {
      state.comments = [];
      state.status = 'error';
    },

    [fetchComments.pending]: (state) => {
      state.comments = [];
      state.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments = [];
      state.status = 'error';
    },

    [fetchLastComments.pending]: (state) => {
      state.comments = [];
      state.status = 'loading';
    },
    [fetchLastComments.fulfilled]: (state, action) => {
      state.comments = action.payload;
      state.status = 'loaded';
    },
    [fetchLastComments.rejected]: (state) => {
      state.comments = [];
      state.status = 'error';
    },
  },
});

export const commenstReducer = commentsSlice.reducer;
