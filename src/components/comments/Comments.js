import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useHttp from '../../hooks/hooks/use-http';
import { getAllComments } from '../../lib/lib/api';

import classes from './Comments.module.css';
import CommentsList from './CommentsList'
import NewCommentForm from './NewCommentForm';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams()
  const {sendRequest, status, data: loadedComments} = useHttp(getAllComments);

  const {quoteId} = params.quoteId

  useEffect(()=>{
    sendRequest(quoteId)
  },[quoteId, sendRequest])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId])

  let comments;

  if(status === 'pending'){
    comments = <div className='centered'>
      <LoadingSpinner/>
    </div>
  }

  if(status === 'completed' && (loadedComments && loadedComments.length > 0)){
    comments = <CommentsList comments={loadedComments}/>
  }

  if(status === 'completed' && (!loadedComments || loadedComments.length === 0)){
    comments = <p className='centered'>No Comments were added yet!</p>
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteid={quoteId} onAddedComment = {addedCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
