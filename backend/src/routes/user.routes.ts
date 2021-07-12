import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import UserController from '../controllers/user.controller';

export class UserRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/users');
  }

  configureRoutes(router: Router) {
    
    router.get('', UserController.fetchList);
    router.get('/:id', UserController.fetchById);
    router.post('', UserController.create);
    router.put('/:id', UserController.update);
    router.delete('/:id', UserController.delete);
    
    router.patch('/:id/password', UserController.updatePassword);

    return router;
  }
}
