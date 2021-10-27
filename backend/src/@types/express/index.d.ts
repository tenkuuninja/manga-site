declare namespace Express {
  interface Request {
    user?: import('../../models/user.model').default;
    error: any;
  }
}
