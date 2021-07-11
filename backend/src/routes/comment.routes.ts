import { Application, Router } from 'express';
import { RoutesConfig } from '../configs/routes.config';
import CommentController from '../controllers/comment.controller';

export class CommentRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/comments');
  }

  configureRoutes(router: Router) {
    
    router.get('', CommentController.fetchList);
    router.get('/:id', CommentController.fetchById);
    router.post('', CommentController.create);
    router.put('/:id', CommentController.update);
    router.delete('/:id', CommentController.delete);

    return router;
  }
}
