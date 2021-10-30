import { createStore, combineReducers, applyMiddleware, Middleware, Store, Reducer } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { IAppState } from 'interfaces';

import authReducer from './auth/reducers';
import catalogReducer from './mangas/reducers';
import chapterReducer from './chapter/reducers';
import commentReducer from './comments/reducers';
import genreReducer from './genres/reducers';
import commonReducer from './common/reducers';
import mangaReducer from './manga/reducers';

const rootReducer: Reducer<IAppState> = combineReducers({
  auth: authReducer,
  common: commonReducer,
  genres: genreReducer,
  manga: mangaReducer,
  mangas: catalogReducer,
  chapter: chapterReducer,
  comments: commentReducer,
})

const logger = createLogger({
  diff: true,
  collapsed: true
});


const middlewares: Middleware[] = [thunk];
 
if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}


export const store: Store<IAppState> = createStore(rootReducer, applyMiddleware(...middlewares));

