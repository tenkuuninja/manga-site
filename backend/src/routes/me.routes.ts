import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import AuthMiddleware from '../middlewares/auth.middleware';
import MeController from '../controllers/me.controller';

export class YourSelfRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/me');
  }

  configureRoutes(router: Router) {
    router.use(AuthMiddleware.isAuth);
    
    router.get('', MeController.getInfo);
    router.get('/mangas', MeController.getManga);
    router.post('/mangas/:id', MeController.follow);
    router.delete('/mangas/:id', MeController.unfollow);

    return router;
  }
}
