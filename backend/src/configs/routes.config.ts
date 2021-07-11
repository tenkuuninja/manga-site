import { Application, Router } from 'express';

export abstract class RoutesConfig {
  app: Application;
  private readonly name: string;

  constructor(app: Application, name: string) {
    this.app = app;
    this.name = name;
    const routes = this.configureRoutes(Router());
    app.use(`/${this.name.replace(/^\//g, '')}`, routes);
  }

  getName() {
      return this.name;
  }

  abstract configureRoutes(router: Router): Router;
}
