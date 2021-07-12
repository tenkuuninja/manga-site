import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/user.model';

class UserController {

  private readonly pageDefault: number = 1;
  private readonly pageSizeDefault: number = 30;
  private readonly sortDefault: string = '-updated_at';

  fetchList = async (req: Request, res: Response) => {
    let scope: any[] = ['includeRole', 'hideSensitive'];
    let scopeCount: any[] = [];
    if (req.query.search) {
      scope.push({ method: ['searchQuery', req.query.search] })
      scopeCount.push({ method: ['searchQuery', req.query.search] })
    }
    if (req.query.filter) {
      scope.push({ method: ['filterQuery', req.query.filter] })
      scopeCount.push({ method: ['filterQuery', req.query.filter] })
    }
    if (typeof req.query.sort === 'string') {
      scope.push({ method: ['sortQuery', req.query.sort] });
    } else {
      scope.push({ method: ['sortQuery', this.sortDefault] });
    }
    let page: number = typeof req.query.page === 'string' ? +req.query.page : this.pageDefault;
    let size: number = typeof req.query.size === 'string' ? +req.query.size : this.pageSizeDefault;
    scope.push({ method: ['paging', page, size] });
    try {
      const result = await User.scope(scope).findAll();
      const count = await User.scope(scopeCount).count();
      res.status(200).json({
        content: result,
        count: count,
        page: 1,
        size: count,
        totalPage: 1
      })
    } catch (error) {
      console.log('user controller find all error >>', error)
      res.status(500).json({
        errorMessage: "Tham số không hợp lệ"
      });
    }
  }

  fetchById = async (req: Request, res: Response) => {
    try {
      const result = await User.scope(['includeRole', 'hideSensitive']).findByPk(+req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        errorMessage: "Đã xảy ra lỗi"
      });
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      req.body.verifyToken = uuidv4();
      req.body.resetToken = uuidv4();
      const user = await User.create(req.body);
      const result = await User.scope(['includeRole', 'hideSensitive']).findByPk(user.id);
      res.status(201).json(result);
    } catch (error) {
      console.log('user controller create error >>', error)
      res.status(500).json({})
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      delete req.body.password;
      const user = await User.scope(['includeRole', 'hideSensitive']).findByPk(+req.params.id);
      await user?.update(req.body);
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({})
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const result = await User.destroy({
        where: {
          id: +req.params.id
        }
      });
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({})
    }
  }

  updatePassword = async (req: Request, res: Response) => {
    try {
      const user = await User.scope(['includeRole', 'hideSensitive']).findByPk(+req.params.id);
      await user?.update({ password: req.body.password });
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({})
    }
  }
  
}

export default new UserController();
