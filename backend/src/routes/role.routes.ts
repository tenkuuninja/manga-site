import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import RoleController from '../controllers/role.controller';

export class RoleRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/roles');
  }

  configureRoutes(router: Router) {
    
    router.get('', RoleController.fetchList);
    router.get('/:id', RoleController.fetchById);
    router.post('', RoleController.create);
    router.put('/:id', RoleController.update);
    router.delete('/:id', RoleController.delete);

    return router;
  }
}
