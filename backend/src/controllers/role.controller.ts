import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Role from '../models/role.model';
import User from '../models/user.model';

class RoleController {

  fetchList = async (req: Request, res: Response) => {
    try {
      const result = await Role.findAll();
      res.status(200).json(result);
    } catch (error) {
      console.log('user controller find all error >>', error)
      res.status(500).json({
        errorMessage: "Tham số không hợp lệ"
      });
    }
  }

  fetchById = async (req: Request, res: Response) => {
    try {
      const result = await Role.findByPk(+req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        errorMessage: "Đã xảy ra lỗi"
      });
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      delete req.body.allowDelete;
      const result = await Role.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.log('user controller create error >>', error)
      res.status(500).json({})
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      delete req.body.allowDelete;
      const role = await Role.findOne({
        where: {
          id: +req.body.id,
          allowDelete: true 
        }
      });
      await role?.update(req.body);
      res.status(200).json(role)
    } catch (error) {
      res.status(500).json({})
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const result = await Role.destroy({
        where: {
          id: +req.params.id,
          allowDelete: true
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

export default new RoleController();
