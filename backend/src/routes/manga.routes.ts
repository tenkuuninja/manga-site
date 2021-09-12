import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import MangaController from '../controllers/manga.controller';
import Validatior from '../middlewares/validation';

export class MangaRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/mangas');
  }

  configureRoutes(router: Router) {

    router.get('', MangaController.fetchList);
    router.get('/top', MangaController.fetchTop);
    router.get('/:id', MangaController.fetchById);
    router.post('', 
      Validatior.mangaValid(),
      Validatior.verify,
      MangaController.create);
    router.put('/:id', 
      Validatior.mangaValid(),
      Validatior.verify,
      MangaController.update);
    router.delete('/:id', MangaController.delete);

    router.patch('/:id/rate', MangaController.addRate);
    
    return router;
  }
}
