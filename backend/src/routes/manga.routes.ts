import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import MangaController from '../controllers/manga.controller';

export class MangaRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/mangas');
  }

  configureRoutes(router: Router) {

    router.get('', MangaController.fetchList);
    router.get('/:id', MangaController.fetchById);
    router.post('', MangaController.create);
    router.put('/:id', MangaController.update);
    router.delete('/:id', MangaController.delete);

    router.patch('/:id/rate', MangaController.addRate);
    
    return router;
  }
}
