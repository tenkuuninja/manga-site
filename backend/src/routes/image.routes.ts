import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import ImageController from '../controllers/image.controller';

export class ImageRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'images');
  }

  configureRoutes(router: Router) {

    router.get('/b/*', ImageController.getImageFromNTUrl);
    
    return router;
  }
}
