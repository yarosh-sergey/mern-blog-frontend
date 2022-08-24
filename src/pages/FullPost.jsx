import React from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '../components/Post';
import { AddComment } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../axios';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../redux/slices/comments';
import { fetchPostById } from '../redux/slices/posts';

export const FullPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { activePost, status } = useSelector((state) => state.posts.posts);
  const commentsData = useSelector((state) => state.comments);
  const userData = useSelector((state) => state.auth.data);

  const isPostLoading = status === 'loading';
  const isCommentsLoading = commentsData.status === 'loading';

  useEffect(() => {
    dispatch(fetchPostById(id));
    dispatch(fetchComments(id));
  }, []);

  if (isPostLoading) {
    return <Post isLoading={isPostLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={activePost._id}
        title={activePost.title}
        imageUrl={
          activePost.imageUrl && `${process.env.REACT_APP_API_URL}${activePost.imageUrl}`
        }
        user={activePost.user}
        createdAt={activePost.createdAt}
        viewsCount={activePost.viewsCount}
        commentsCount={commentsData.comments.length}
        tags={activePost.tags}
        isEditable={userData?._id === activePost.user?._id}
        isFullPost
      >
        <ReactMarkdown children={activePost.text} />
        <p>{activePost.text}</p>
      </Post>
      <CommentsBlock
        items={commentsData.comments}
        isLoading={isCommentsLoading}
      >
        <AddComment user={activePost.user} postId={id} />
      </CommentsBlock>
    </>
  );
};
