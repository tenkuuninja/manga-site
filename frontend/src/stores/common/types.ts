export enum ActionTypes  {
  SetConfig                   = 'SetConfig',
  UpdateConfig                = 'UpdateConfig',
  FetchTopMangaRequest        = 'FetchTopMangaRequest',
  FetchTopMangaSuccess        = 'FetchTopMangaSuccess',
  FetchTopMangaFailure        = 'FetchTopMangaFailure',
  FetchFollowMangaRequest     = 'FetchFollowMangaRequest',
  FetchFollowMangaSuccess     = 'FetchFollowMangaSuccess',
  FetchFollowMangaFailure     = 'FetchFollowMangaFailure',
  FetchReadedMangaRequest     = 'FetchReadedMangaRequest',
  FetchReadedMangaSuccess     = 'FetchReadedMangaSuccess',
  FetchReadedMangaFailure     = 'FetchReadedMangaFailure',
  FetchAutoCompleteRequest    = 'FetchAutoCompleteRequest',
  FetchAutoCompleteSuccess    = 'FetchAutoCompleteSuccess',
  FetchAutoCompleteFailure    = 'FetchAutoCompleteFailure',
  AddReaded                   = 'AddReaded',
  SyncWithLocalstorage        = 'SyncWithLocalstorage',
  SetLocalName                = 'SetLocalName',
  SetLocalEmail               = 'SetLocalEmail',
}

export default ActionTypes;
