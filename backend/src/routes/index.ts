import { Application } from 'express';
import { MangaRoutes } from './manga.routes';
import { ChapterRoutes } from './chapter.routes';
import { GenreRoutes } from './genre.routes';
import { CommentRoutes } from './comment.routes';
import { RoleRoutes } from './role.routes';
import { UserRoutes } from './user.routes';
import { AuthRoutes } from './auth.routes';
import { YourSelfRoutes } from './me.routes';
import AuthMiddleware from '../middlewares/auth.middleware';

export default (app: Application): void => {
  app.use(AuthMiddleware.check);
  new MangaRoutes(app);
  new ChapterRoutes(app);
  new GenreRoutes(app);
  new CommentRoutes(app);
  new RoleRoutes(app);
  new UserRoutes(app);
  new AuthRoutes(app);
  new YourSelfRoutes(app);
}
