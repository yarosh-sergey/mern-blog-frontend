import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async (id) => {
    const { data } = await axios.get(`/posts/${id}`);
    return data;
  }
);

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchTaggedPosts = createAsyncThunk(
  'posts/fetchTaggedPosts',
  async (tag) => {
    const { data } = await axios.get(`/tags/${tag}`);
    return data;
  }
);

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id) => {
    axios.delete(`/posts/${id}`);
  }
);

const initialState = {
  activePost:{
    item: {},
    status: 'loading',
  },
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    [fetchPostById.pending]: (state) => {
      state.activePost.item = {};
      state.activePost.status = 'loading';
    },
    [fetchPostById.fulfilled]: (state, action) => {
      state.activePost.item = action.payload;
      state.activePost.status = 'loaded';
    },
    [fetchPostById.rejected]: (state) => {
      state.activePost.item = {};
      state.activePost.status = 'error';
    },

    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },

    [fetchTaggedPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [fetchTaggedPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchTaggedPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },

    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (item) => item._id !== action.meta.arg
      );
    },
  },
});

export const postsReducer = postsSlice.reducer;
