import { Grid } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Post } from '../components';
import { fetchTaggedPosts } from '../redux/slices/posts';

export const Tag = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const {tag} = useParams();

  const isPostLoading = posts.status === 'loading';

  useEffect(() => {
    dispatch(fetchTaggedPosts(tag));
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={12} item>
          {(isPostLoading ? [...Array(2)] : posts.items).map((obj, index) =>
            isPostLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl && `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};