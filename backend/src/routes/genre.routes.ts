import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import GenreController from '../controllers/genre.controller';

export class GenreRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/genres');
  }

  configureRoutes(router: Router) {

    router.get('', GenreController.fetchList);
    router.get('/:id', GenreController.fetchById);
    
    return router;
  }
}
