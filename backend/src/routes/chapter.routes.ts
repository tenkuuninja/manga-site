import { Application, Router, Request, Response } from 'express';
import { RoutesConfig } from '../configs/routes.config';

export class ChapterRoutes extends RoutesConfig {
  constructor(app: Application) {
    super(app, 'api/chapters');
  }

  configureRoutes(router: Router) {
    router.get('', (req, res) => {
      res.send('abc');
    })
    return router;
  }
}
