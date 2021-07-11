import { Application, Router, Request, Response } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import ChapterController from '../controllers/chapter.controller';

export class ChapterRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/chapters');
  }

  configureRoutes(router: Router) {
    
    // router.get('', ChapterController.fetchList);
    router.get('/:id', ChapterController.fetchById);
    router.post('', ChapterController.create);
    router.put('/:id', ChapterController.update);
    router.delete('/:id', ChapterController.delete);

    return router;
  }
}
