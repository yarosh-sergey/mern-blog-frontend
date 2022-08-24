import React from 'react';

import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchAddComment } from '../../redux/slices/comments';

export const AddComment = ({ user, postId }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const addCommentHandler = () => {
    dispatch(fetchAddComment({ text, userId: user._id, postId }));
    setText('');
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={user.avatar} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button variant="contained" onClick={addCommentHandler}>
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
