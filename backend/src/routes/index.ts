import { Application } from 'express';
import { MangaRoutes } from './manga.routes';
import { ChapterRoutes } from './chapter.routes';
import { GenreRoutes } from './genre.routes';
import { CommentRoutes } from './comment.routes';
import { UserRoutes } from './user.routes';
import { AuthRoutes } from './auth.routes';
import { YourSelfRoutes } from './me.routes';

export default (app: Application): void => {
  new MangaRoutes(app);
  new ChapterRoutes(app);
  new GenreRoutes(app);
  new CommentRoutes(app);
  new UserRoutes(app);
  new AuthRoutes(app);
  new YourSelfRoutes(app);
}
