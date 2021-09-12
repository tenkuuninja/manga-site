import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

require('dotenv').config();

class AuthController {

  private readonly privateKeyAccess = process.env.ACCESS_TOKEN_SECRET || 'My Secret'

  register = async (req: Request, res: Response) => {
    try {
      if (req.body.user != null) throw Error('Đã đăng nhập');
      req.body.verifyToken = uuidv4();
      req.body.resetToken = uuidv4();
      const user = await User.create(req.body);
      let userResponse: User | null = null;
      if (user) {
        userResponse = await User.scope(['includeRole', 'hideSensitive']).findByPk(user.id);
      }
      const accessToken = this.genToken(user);
      res.status(200).json({
        accessToken: accessToken,
        user: userResponse
      })
    } catch (error) {
      console.log('auth controller register error >>', error)
      res.status(500).json({
        errorMessage: "Tham số không hợp lệ"
      });
    }
  }

  loginWithPassword = async (req: Request, res: Response) => {
    try {
      if (req.body.user != null) throw Error('Đã đăng nhập');
      const userByUsername = await User.findOne({
        where: { username: req.body.username }
      });
      if (userByUsername !== null) {
        const match = await bcrypt.compare(req.body.password, userByUsername.password);
        if (match) {
          const accessToken = this.genToken(userByUsername);
          const user = await User.scope(['includeRole', 'hideSensitive']).findByPk(userByUsername.id);
          if (user) {
            return res.status(200).json({ accessToken, user });
          }
        }
      }
      return res.status(500).json({
        errorMessage: "Tên đăng nhập hoặc mật khẩu không chính xác"
      });
    } catch (error) {
      console.log('auth controller login error >>', error)
      res.status(500).json({
        errorMessage: "Tham số không hợp lệ"
      });
    }
  }

  loginWithAccessToken = async (req: Request, res: Response) => {
    try {
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, this.privateKeyAccess);
        if (typeof decoded !== 'string') {
          const user = await User.scope(['includeRole', 'hideSensitive']).findOne({
            where: {
              id: decoded.id,
              username: decoded.username,
              email: decoded?.email,
              password: decoded.password
            }
          });
          if (user) {
            res.status(200).json({ user })
          }
        }
      } 
      res.status(500).json({
        errorMessage: "Đăng nhập thất bại"
      })
    } catch (error) {
      console.log('auth controller login token error >>', error)
      res.status(500).json({
        errorMessage: "Tham số không hợp lệ"
      });
    }
  }

  private genToken = (user: User): string => {
    return jwt.sign({
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email
    }, this.privateKeyAccess);
  }
  
}

export default new AuthController();
