import React, { useEffect, useRef, useState } from 'react';
import { IAppState, IComment } from 'interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { addComment, fetchListCommentByMangaId } from 'stores/comment/actions';
import { Icon } from '@iconify/react';
import { TextField } from '@mui/material';
import Avatar from '../Avatar';
import { setLocalEmail, setLocalName } from 'stores/common/actions';
import { getRelativeTimeFromNow } from 'utils/helper';
import { CommentBoxSkeleton, SingleCommentBoxSkeleton } from './Skeleton';

interface IParams {
  mangaId: string;
  mangaSlug: string;
}

interface IFormWriteCommentProps {
  ref?: React.RefObject<HTMLDivElement>;
  parentId?: number;
}

interface ICommentBoxProps {
  data: IComment;
  handleReplyAction?: any;
}

const FormWriteComment = (props: IFormWriteCommentProps) => {
  const { user } = useSelector((store: IAppState) => store.auth);
  const local = useSelector((store: IAppState) => store.common.local);
	const dispatch = useDispatch();
	const match = useRouteMatch<IParams>();
	const mangaId = +match.params.mangaId;
	let [name, setName] = useState(local.name);
	let [email, setEmail] = useState(local.email);
	let [content, setContent] = useState('');
  const parentId = props.parentId || null;
	let onSubmit = (e: any) => {
		e.preventDefault();
		if (content === '') {
			alert('no content');
		} else {
			let newComment = {
				name: name === '' ? 'Ẩn danh' : name, 
				parentId,
				email, 
        content, 
        mangaId,
        userId: user?.id || null
			}
			dispatch(addComment(newComment));
			dispatch(setLocalName(name));
			dispatch(setLocalEmail(email));
			setContent('');
		}
	}

	return(
		<div className='flex my-8'>
			<div className='mr-4'>
        <Avatar src={user?.avatar || ''} alt={user?.username || name || 'A'} border />
			</div>
      <form onSubmit={onSubmit} className='flex-grow '>
        <div className="grid grid-cols-2 gap-4">
          <TextField 
            className=""
            label="Tên hiển thị"
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField 
            className=""
            label="Email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='rounded border my-2'>
          <TextField 
            className="w-full"
            size="small"
            value={content}
            minRows={2}
            multiline
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className=' '>
          <button type='submit' className='py-2 px-4 rounded bg-blue-500 text-white'>Bình luận</button>&nbsp;
        </div>
      </form>
		</div>
	);
}

const CommentBox = (props: ICommentBoxProps) => {
  const { name, content, point, user, createdAt } = props.data;

  return(
    <div className='flex text-sm'>
      <div className='mr-4'>
        <Avatar src={user?.avatar || ''} alt={name || 'G'} border />
      </div>
      <div className='flex-grow'>
        <div className=''>
          <span className='text-lg font-bold'>{name}</span>
          <span></span>
        </div>
        <div className=''>
          <p className='my-1'>{content}</p>
        </div>
        <div className="space-x-3 mt-2">
          <span 
            className="opacity-80 hover:opacity-100 transition-opacity duration-150 cursor-pointer hover:underline"
          >
            <Icon icon="bx:bx-like" /> {point}
          </span>
          <span 
            className="opacity-80 hover:opacity-100 transition-opacity duration-150 cursor-pointer hover:underline"
            onClick={props.handleReplyAction}
          >
            <Icon icon="bi:reply" /> Trả lời
          </span>
          <span 
            className="opacity-80 hover:opacity-100 transition-opacity duration-150 cursor-pointer hover:underline"
          >
            <Icon icon="ic:baseline-report-gmailerrorred" /> Báo cáo
          </span>
          <span 
            className="opacity-80 transition-opacity duration-150 cursor-pointer hover:underline ml-4"
          >
             {getRelativeTimeFromNow(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}

const CommentBoxWithReplies = (props: { data: IComment }) => {
  const { add } = useSelector((store: IAppState) => store.comment);
  const [isOpenReplyForm, setOpenReplyForm] = useState<boolean>(false);
  const replyFormRef = useRef<HTMLDivElement>(null);

  function handleReplyAction() {
    if (!isOpenReplyForm) {
      setOpenReplyForm(true);
    }
  }

  let commentAdding;
  if (add.isLoading && add.parentId === props.data.id) {
    commentAdding = <li className="py-3"><SingleCommentBoxSkeleton /></li>
  }

  return(
    <React.Fragment>
      <CommentBox data={props.data} handleReplyAction={handleReplyAction} />
      <ul className="ml-14 mt-4 pl-4 border-l-2 border-black border-opacity-20">
        {props.data.replies?.map((comment: IComment) => <li className="py-3" key={comment.id}>
          <CommentBox data={comment} handleReplyAction={handleReplyAction} />
        </li>)}
        {commentAdding}
      </ul>
      {isOpenReplyForm && <div className="ml-18 border-l-2 border-transparent">
        <FormWriteComment parentId={props.data.id} ref={replyFormRef} />
      </div>}
    </React.Fragment>
  );
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

  let commentLoading;
  if (comment.isLoading || comment.isError) {
    commentLoading = <CommentBoxSkeleton />
  }

  let commentAdding;
  if (comment.add.isLoading && typeof comment.add.parentId !== 'number' ) {
    commentAdding = <SingleCommentBoxSkeleton />
  }

  return(
    <section>
      <h2 className='text-2xl mt-4 mb-2'>Bình luận</h2>
      <FormWriteComment />
      {commentAdding}
      <ul className="divide-y">
        {comment.data.map((item: IComment) => <li className="py-4" key={item.id} >
          <CommentBoxWithReplies data={item} />
        </li>)}
      </ul>
      {commentLoading}
    </section>
  );
}

export default Comment;
