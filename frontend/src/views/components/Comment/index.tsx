import React, { useEffect } from 'react';
import { IAppState } from 'interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { fetchListCommentByMangaId } from 'stores/comment/actions';

interface IParams {
  mangaId: string;
  mangaSlug: string;
}

const FormWriteComment = () => {
  
}

const CommentBox = () => {

}

const Comment = () => {
  const comment = useSelector((store: IAppState) => store.comment);
  const dispatch = useDispatch();
  const match = useRouteMatch<IParams>();
  const mangaId = +match.params.mangaId;

  useEffect(function() {
    dispatch(fetchListCommentByMangaId(mangaId));
    // eslint-disable-next-line
  }, [mangaId]);

  return(
    <></>
  );
}

export default Comment;
