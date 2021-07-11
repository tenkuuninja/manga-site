import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';

export class AuthRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/auth');
  }

  configureRoutes(router: Router) {
    router.get('', (req, res) => {
      res.send('abc');
    })
    return router;
  }
}
