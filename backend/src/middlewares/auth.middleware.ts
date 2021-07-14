import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

class AuthMiddleware {

  private readonly privateKeyAccess = process.env.ACCESS_TOKEN_SECRET || 'My Secret'

  check = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, this.privateKeyAccess);
        if (typeof decoded !== 'string') {
          const user = await User.scope(['includeRole']).findOne({
            where: {
              id: decoded.id,
              username: decoded.username,
              email: decoded?.email,
              password: decoded.password
            },
            logging: false
          });
          if (user) {
            req.user = user;
          }
        }
      } 
      next();
    } catch (error) {
      next();
    }
  }

  isAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user instanceof User) next();
    else res.status(401).json({
      errorMessage: 'Unauthenticated'
    })
  }

}

export default new AuthMiddleware();
