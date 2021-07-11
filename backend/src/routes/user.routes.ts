import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';

export class UserRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/users');
  }

  configureRoutes(router: Router) {
    router.get('', (req, res) => {
      res.send('abc');
    })
    return router;
  }
}
