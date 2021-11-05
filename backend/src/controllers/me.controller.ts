import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Manga from '../models/manga.model';
import User from '../models/user.model';
import MangaReaded from '../models/manga_readed.model';
import { FindOptions } from 'sequelize/types';
import Sequelize from 'sequelize';
import { unlinkSync } from 'fs';
import Chapter from '../models/chapter.model';

const imgbbUploader = require("imgbb-uploader");

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
  
  updatePassword = async (req: Request, res: Response) => {
    try {
      if (req.user instanceof User) {
        const match = await bcrypt.compare(req.body.oldPassword, req.user.password);
        if (match) {
          req.user?.update({ password: req.body.password });
          const user = await User.scope(['includeRole', 'hideSensitive']).findByPk(req.user.id);
          return res.status(200).json(user);
        }
        return res.status(500).json({
          msg: "Mật khẩu cũ không đúng"
        });
      }
      return res.status(500).json({
        msg: "Người dùng không tồn tại"
      });
    } catch (error) {
      res.status(500).json({ msg: 'Lỗi không xác định' });
    }
  }

  updateAvatar = async (req: Request, res: Response) => {
    try {
      if (typeof req.file?.path !== 'string') {
        return res.status(500).json({ msg: "no such or direactory" });
      }
      if (req.user === undefined) {
        unlinkSync(req.file.path);
        return res.status(401).json({ msg: "Unauthenticated" });
      }
      let image = await imgbbUploader(process.env.IMGBB_API_KEY||'', req.file?.path);
      await req.user.update({ avatar: image.url });
      unlinkSync(req.file.path);
      res.status(200).json(req.user);
    } catch (error) {
      res.status(500).json({ msg: 'Lỗi không xác định' });
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
      let chapter = await Chapter.findByPk(req.body.chapterId);
      if (chapter === null) {
        return res.status(500).send(false);
      }
      let record = await MangaReaded.findOne({
        where: {
          mangaId: chapter.mangaId,
          userId: req.user.id
        }
      });
      if (record !== null) {
        let readed = typeof record.readed === 'string' ? record.readed.split(',').map(i => +i) : record.readed;
        readed.push(chapter.number);
        readed = [...new Set(readed)];
        readed.sort((a, b) => a-b);
        await MangaReaded.update({
          userId: req.user.id,
          mangaId: chapter.mangaId,
          lastChapterId: chapter.id,
          lastChapter: chapter.number,
          readed: readed,
        }, {
          where: {
            mangaId: chapter.mangaId,
            userId: req.user.id
          }
        });
      } else {
        let newRecord = {
          userId: req.user.id,
          user_id: req.user.id,
          mangaId: chapter.mangaId,
          manga_id: chapter.mangaId,
          lastChapterId: chapter.id,
          lastChapter: chapter.number,
          readed: [chapter.number], 
        }
        await MangaReaded.create(newRecord);
      }
      res.status(201).send(true);
    } catch (error) {
      console.log('me api read manga >>',error)
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
