import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import UserController from '../controllers/user.controller';
import Validatior from '../middlewares/validation';

export class UserRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/users');
  }

  configureRoutes(router: Router) {
    
    router.get('', UserController.fetchList);
    router.get('/:id', UserController.fetchById);
    router.post('', 
      Validatior.userValid(),
      Validatior.verify,
      UserController.create);
    router.put('/:id', 
      Validatior.userValid(),
      Validatior.verify,
      UserController.update);
    router.delete('/:id', UserController.delete);
    
    router.patch('/:id/password', UserController.updatePassword);

    return router;
  }
}
