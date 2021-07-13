import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import AuthController from '../controllers/auth.controller';

export class AuthRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/auth');
  }

  configureRoutes(router: Router) {
    
    router.post('/register', AuthController.register);
    router.post('/login', AuthController.loginWithPassword);
    router.post('/token-login', AuthController.loginWithAccessToken);

    return router;
  }
}
