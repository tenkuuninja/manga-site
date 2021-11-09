import { ActionTypes } from './types';

export const followManga = (id: number) => ({ type: ActionTypes.FollowManga, payload: { id } })
export const unfollowManga = (id: number) => ({ type: ActionTypes.UnfollowManga, payload: { id } })
