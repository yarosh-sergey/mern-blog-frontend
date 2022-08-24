import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { commenstReducer } from './slices/comments';
import { postsReducer } from './slices/posts';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    comments: commenstReducer,
  },
});

export default store;
