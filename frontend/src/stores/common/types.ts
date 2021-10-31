export enum ActionTypes  {
  SetConfig                   = 'common_SetConfig',
  UpdateConfig                = 'common_UpdateConfig',
  FetchTopMangaRequest        = 'common_FetchTopMangaRequest',
  FetchTopMangaSuccess        = 'common_FetchTopMangaSuccess',
  FetchTopMangaFailure        = 'common_FetchTopMangaFailure',
  FetchFollowMangaRequest     = 'common_FetchFollowMangaRequest',
  FetchFollowMangaSuccess     = 'common_FetchFollowMangaSuccess',
  FetchFollowMangaFailure     = 'common_FetchFollowMangaFailure',
  FetchReadedMangaRequest     = 'common_FetchReadedMangaRequest',
  FetchReadedMangaSuccess     = 'common_FetchReadedMangaSuccess',
  FetchReadedMangaFailure     = 'common_FetchReadedMangaFailure',
  FetchAutoCompleteRequest    = 'common_FetchAutoCompleteRequest',
  FetchAutoCompleteSuccess    = 'common_FetchAutoCompleteSuccess',
  FetchAutoCompleteFailure    = 'common_FetchAutoCompleteFailure',
  AddReaded                   = 'common_AddReaded',
  FollowManga                 = 'common_FollowManga',
  UnfollowManga               = 'common_UnfollowManga',
  SyncWithLocalstorage        = 'common_SyncWithLocalstorage',
  SetLocalName                = 'common_SetLocalName',
  SetLocalEmail               = 'common_SetLocalEmail',
}

export default ActionTypes;
