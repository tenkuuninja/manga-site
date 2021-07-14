import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Manga from '../models/manga.model';
import User from '../models/user.model';

class UserController {

  private readonly pageDefault: number = 1;
  private readonly pageSizeDefault: number = 30;

  getInfo = async (req: Request, res: Response) => {
    try {
      const user = await User.scope(['includeRole', 'hideSensitive']).findByPk(req.user?.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({});
    }
  }

  getManga = async (req: Request, res: Response) => {
    try {
      if (req.user === null) throw Error();
      let page: number = typeof req.query.page === 'string' ? +req.query.page : this.pageDefault;
      let size: number = typeof req.query.size === 'string' ? +req.query.size : this.pageSizeDefault;
      const result = await req.user.getMangas({
        attributes: {
          exclude: ['leechType', 'leechUrl']
        },
        limit: size,
        offset: (page-1)*size,
        order: [['updatedAt','DESC']]
      })
      const count = await req.user.countMangas();
      res.status(200).json({
        content: result,
        count: count,
        page: page,
        size: size,
        totalPage: Math.ceil(count/+size)
      });
    } catch (error) {
      res.status(500).json({});
    }
  }

  follow = async (req: Request, res: Response) => {
    try {
      if (req.user === null) throw Error();
      const manga = await Manga.findByPk(req.params.id);
      if (manga) {
        await req.user.addManga(manga);
        res.status(200).send(true);
      }
      res.status(500).send(false);
    } catch (error) {
      res.status(500).send(false);
    }
  }

  unfollow = async (req: Request, res: Response) => {
    try {
      if (req.user === null) throw Error();
      const manga = await Manga.findByPk(req.params.id);
      if (manga) {
        await req.user.removeManga(manga);
        res.status(200).send(true);
      }
      res.status(500).send(false);
    } catch (error) {
      res.status(500).send(false);
    }
  }
  
}

export default new UserController();
