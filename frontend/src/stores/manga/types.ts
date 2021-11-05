export enum ActionTypes  {
  FetchMangaRequest = 'manga_FetchMangaRequest',
  FetchMangaSuccess = 'manga_FetchMangaSuccess',
  FetchMangaFailure = 'manga_FetchMangaFailure',
  FollowManga       = 'manga_FollowManga',
  UnfollowManga     = 'manga_UnfollowManga',
  IncreaseFavorite  = 'manga_IncreaseFavorite',
  AddReadedManga    = 'manga_AddReadedManga',
}

export default ActionTypes;
