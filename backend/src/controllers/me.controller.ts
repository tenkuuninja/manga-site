import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Manga from '../models/manga.model';
import User from '../models/user.model';
import MangaReaded from '../models/manga_readed.model';
import { FindOptions, where } from 'sequelize/types';
import Sequelize from 'sequelize';

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
      if (req.user === undefined) throw Error();
      let page: number = typeof req.query.page === 'string' ? +req.query.page : this.pageDefault;
      let size: number = typeof req.query.size === 'string' ? +req.query.size : this.pageSizeDefault;
      let scope: any[] = [
        'includeGenre', 
        'hideSrcLeech', 
        'showTotalFollowing', 
        { method: ['showIsFollowingById', +req.user.id] },
        { method: ['paging', page, size] },
        { method: ['sortQuery', '-updatedAt'] }
      ];
      const result = await Manga.scope(scope).findAll({
        where: Sequelize.literal("EXISTS ( SELECT * FROM `manga_user` WHERE `manga_user`.`user_id` = "+(+req.user.id)+" AND `manga_user`.`manga_id` = `manga`.`id`)")
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

  getHistory = async (req: Request, res: Response) => {
    try {
      if (req.user === undefined) throw Error();
      let page: number = typeof req.query.page === 'string' ? +req.query.page : this.pageDefault;
      let size: number = typeof req.query.size === 'string' ? +req.query.size : this.pageSizeDefault;
      let scope: any[] = [
        'includeGenre', 
        'hideSrcLeech', 
        'showTotalFollowing', 
        { method: ['paging', page, size] }, 
        { method: ['showIsFollowingById', +req.user.id] }
      ];
      const options: FindOptions = {
        include: [{
          model: MangaReaded,
          as: 'reads',
          where: {
            userId: req.user.id
          },
          required: true
        }],
      }
      const result = await Manga.scope(scope).findAll(options);
      const count = await Manga.count(options);
      
      res.status(200).json({
        content: result,
        count: count,
        page: page,
        size: size,
        totalPage: Math.ceil(count/+size)
      });
    } catch (error) {
      console.log("get readed ", error)
      res.status(500).json({});
    }
  }

  read = async (req: Request, res: Response) => {
    try {
      if (req.user === undefined) throw Error();
      if (Number.isNaN(+req.params.chapter)) {
        res.status(500).send(false);
      }
      let record = await MangaReaded.findOne({
        where: {
          mangaId: req.body.mangaId,
          userId: req.user.id
        }
      });
      if (record !== null) {
        let readed = typeof record.readed === 'string' ? record.readed.split(',').map(i => +i) : record.readed;
        readed.push(+req.params.chapter);
        readed = [...new Set(readed)];
        readed.sort((a, b) => a-b);
        await record.update({
          lastChapterId: req.body.lastChapterId,
          lastChapter: req.body.lastChapter,
          readed: readed
        });
      } else {
        let record = await MangaReaded.create({...req.body, readed: req.params.chapter, userId: req.user.id});
      }
      res.status(201).send(true);
    } catch (error) {
      res.status(500).send(false);
    }
  }

  follow = async (req: Request, res: Response) => {
    try {
      if (req.user === undefined) throw Error();
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
      if (req.user === undefined) throw Error();
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
