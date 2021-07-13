import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import ChapterController from '../controllers/chapter.controller';
import Validatior from '../middlewares/validation';

export class ChapterRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/chapters');
  }

  configureRoutes(router: Router) {
    
    // router.get('', ChapterController.fetchList);
    router.get('/:id', ChapterController.fetchById);
    router.post('', 
      Validatior.chapterValid(),
      Validatior.verify,
      ChapterController.create);
    router.put('/:id', 
      Validatior.chapterValid(),
      Validatior.verify,
      ChapterController.update);
    router.delete('/:id', ChapterController.delete);

    return router;
  }
}
