import { createStore, combineReducers, applyMiddleware, Store, Reducer } from 'redux';
import thunk from 'redux-thunk';
import { IAppState } from 'interfaces';

import authReducer from './auth/reducers';
import catalogReducer from './catalog/reducers';
import chapterReducer from './chapter/reducers';
import commentReducer from './comment/reducers';
import genreReducer from './genre/reducers';
import mangaReducer from './manga/reducers';

const rootReducer: Reducer = combineReducers({
  auth: authReducer,
  catalog: catalogReducer,
  chapter: chapterReducer,
  comment: commentReducer,
  genre: genreReducer,
  manga: mangaReducer,
})

export const store: Store<IAppState> = createStore(rootReducer, applyMiddleware(thunk));

