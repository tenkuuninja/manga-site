import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';

export class GenreRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/genres');
  }

  configureRoutes(router: Router) {
    
    return router;
  }
}
