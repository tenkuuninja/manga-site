import { createStore, combineReducers, applyMiddleware, Middleware, Store, Reducer } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { IAppState } from 'interfaces';

import authReducer from './auth/reducers';
import catalogReducer from './catalog/reducers';
import chapterReducer from './chapter/reducers';
import commentReducer from './comment/reducers';
import genreReducer from './genre/reducers';
import commonReducer from './common/reducers';
import mangaReducer from './manga/reducers';

const rootReducer: Reducer = combineReducers({
  auth: authReducer,
  catalog: catalogReducer,
  chapter: chapterReducer,
  comment: commentReducer,
  genre: genreReducer,
  common: commonReducer,
  manga: mangaReducer,
})

const logger = createLogger({
  diff: true,
  collapsed: true
});


const middlewares: Middleware[] = [thunk];
 
if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}


export const store: Store<IAppState> = createStore(rootReducer, applyMiddleware(logger, thunk));

