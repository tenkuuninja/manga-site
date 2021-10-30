export enum ActionTypes  {
  FetchListMangaRequest = 'mangas_FetchListMangaRequest',
  FetchListMangaSuccess = 'mangas_FetchListMangaSuccess',
  FetchListMangaFailure = 'mangas_FetchListMangaFailure',
  FollowManga           = 'mangas_FollowManga',
  UnfollowManga         = 'mangas_UnfollowManga',
  RemoveMangaById       = 'mangas_RemoveMangaById',
}

export default ActionTypes;
