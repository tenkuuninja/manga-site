import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import AuthMiddleware from '../middlewares/auth.middleware';
import MeController from '../controllers/me.controller';
import multer from 'multer';
import { avatarStorage } from '../configs/multer.config';

export class YourSelfRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/me');
  }

  configureRoutes(router: Router) {
    router.use(AuthMiddleware.isAuth);
    
    router.get('', MeController.getInfo);
    router.patch('/password', MeController.updatePassword);
    router.patch('/avatar', multer({ storage: avatarStorage }).single('avatar'), MeController.updateAvatar);
    router.get('/mangas', MeController.getManga);
    router.get('/reads', MeController.getHistory);
    router.post('/reads', MeController.read);
    router.post('/mangas/:id', MeController.follow);
    router.delete('/mangas/:id', MeController.unfollow);

    return router;
  }
}
