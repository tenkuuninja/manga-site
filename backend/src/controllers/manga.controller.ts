import { Request, Response } from 'express';
import seq, { FindOptions, Op } from 'sequelize';
import Manga from '../models/manga.model';
import Genre from '../models/genre.model';
import { changeToSlug } from '../utils/string';
import User from '../models/user.model';
import Chapter from '../models/chapter.model';
import Comment from '../models/comment.model';
import MangaReaded from '../models/manga_readed.model';

class MangaController {

  private readonly pageDefault: number = 1;
  private readonly pageSizeDefault: number = 30;
  private readonly sortDefault: string = '-updatedAt';

  fetchList = async (req: Request, res: Response) => {
    try {
      let page: number = typeof req.query.page === 'string' ? +req.query.page : this.pageDefault;
      let size: number = typeof req.query.size === 'string' ? +req.query.size : this.pageSizeDefault;
      let scope: any[] = ['includeGenre', 'hideSrcLeech', 'showTotalFollowing', { method: ['paging', page, size] }];
      let scopeCount: any[] = [];
      const andClouse = [];
      if (req.user instanceof User) {
        scope.push({ method: ['showIsFollowingById', +req.user.id] })
      }
      if (req.query.search) {
        scope.push({ method: ['searchQuery', req.query.search] })
        scopeCount.push({ method: ['searchQuery', req.query.search] })
      }
      if (req.query.filter) {
        scope.push({ method: ['filterQuery', req.query.filter] })
        scopeCount.push({ method: ['filterQuery', req.query.filter] })
      }
      if (typeof req.query.genre === 'string') {
        let genreIds = req.query.genre.split(',').filter(id => !isNaN(+id)).map(item => +item);
        andClouse.push(...genreIds.map((id: number) => seq.literal("EXISTS ( SELECT * FROM `manga_genre` WHERE `manga_genre`.`genre_id` = "+id+" AND `manga_genre`.`manga_id` = `manga`.`id`)")));
      }
      if (typeof req.query.notgenre === 'string') {
        let notgenreIds = req.query.notgenre.split(',').filter(id => !isNaN(+id)).map(item => +item);
        andClouse.push(...notgenreIds.map((id: number) => seq.literal("NOT EXISTS ( SELECT * FROM `manga_genre` WHERE `manga_genre`.`genre_id` = "+id+" AND `manga_genre`.`manga_id` = `manga`.`id`)")));
      }
      if (typeof req.query.sort === 'string') {
        scope.push({ method: ['sortQuery', req.query.sort] });
      } else {
        scope.push({ method: ['sortQuery', this.sortDefault] });
      }
      const options: FindOptions = {
        where: {
          [Op.and]: andClouse
        }
      }      
      const result = await Manga.scope(scope).findAll(options);
      const count = await Manga.scope(scopeCount).count(options);
      res.status(200).json({
        content: result,
        count: count,
        page: page,
        size: size,
        totalPage: Math.ceil(count/+size)
      })
    } catch (error) {
      console.log('manga controller fetch list error >>', error)
      res.status(500).json({
        errorMessage: "Đã xảy ra lỗi"
      });
    }
  }

  fetchTop = async (req: Request, res: Response) => {
    let scope: any[] = ['includeGenre', 'hideSrcLeech', { method: ['paging', this.pageDefault, this.pageSizeDefault] }];
    try {
      let [all, day, week, month] = await Promise.all([
        Manga.scope([...scope, { method: ['sortQuery', '-view'] }]).findAll(),
        Manga.scope([...scope, { method: ['sortQuery', '-viewDay'] }]).findAll(),
        Manga.scope([...scope, { method: ['sortQuery', '-viewWeek'] }]).findAll(),
        Manga.scope([...scope, { method: ['sortQuery', '-viewMonth'] }]).findAll(),
      ]);
      res.status(200).json({ all, day, week, month })
    } catch (error) {
      console.log('manga controller fetch list error >>', error)
      res.status(500).json({
        errorMessage: "Đã xảy ra lỗi"
      });
    }
  }

  fetchById = async (req: Request, res: Response) => {
    try {
      let scope: any[] = ['includeGenre', 'includeChapter', 'showTotalFollowing', 'hideSrcLeech']
      if (req.user instanceof User) {
        scope.push({ method: ['showIsFollowingById', +req.user.id] });
      }
      if (typeof req.query.sort === 'string') {
        scope.push({ method: ['sortQuery', req.query.sort] });
      }
      const result = await Manga.scope(scope).findByPk(+req.params.id);
      if (result === null) {
        return res.status(404).json({ msg: 'Nội dung không tồn tại' });
      }
      if (req.user instanceof User) {
        const readed = await MangaReaded.findOne({
          where: {
            userId: req.user.id,
            mangaId: result.id
          }
        });
        if (readed) {
          result.readed = readed;
        }
      }
      res.status(200).json(result);
    } catch (error) {
      console.log('manga controller fetch error >>', error)
      res.status(500).json({
        errorMessage: "Đã xảy ra lỗi"
      });
    }
  }

  getChapterById = async (req: Request, res: Response) => {
    try {
      const { rows, count } = await Chapter.findAndCountAll({
        where: {
          mangaId: +req.params.id
        }
      });
      res.status(200).json({
        content: rows,
        count: count,
        page: 1,
        size: count,
        totalPage: 1
      })
    } catch (error) {
      console.log('manga controller fetch chapter error >>', error)
      res.status(500).json({
        errorMessage: "Đã xảy ra lỗi"
      });
    }
  }

  getCommentById = async (req: Request, res: Response) => {
    try {
      let page: number = typeof req.query.page === 'string' ? +req.query.page : this.pageDefault;
      let size: number = typeof req.query.size === 'string' ? +req.query.size : this.pageSizeDefault;
      let scope: any[] = ['includeUser', 'includeManga', 'includeReplyWithUser', { method: ['paging', page, size] }];
      if (typeof req.query.sort === 'string') {
        scope.push({ method: ['sortQuery', req.query.sort] });
      } else {
        scope.push({ method: ['sortQuery', '-createdAt,+replies.createdAt'] });
      }
      let options: FindOptions = {
        where: {
          mangaId: +req.params.id,
          parentId: null
        }
      };
      const result = await Comment.scope(scope).findAll(options);
      const count = await Comment.count(options);
      res.status(200).json({
        content: result,
        count: count,
        page: page,
        size: size,
        totalPage: Math.ceil(count/+size)
      })
    } catch (error) {
      console.log('manga controller fetch comment error >>', error)
      res.status(500).json({
        errorMessage: "Đã xảy ra lỗi"
      });
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      req.body.titleSlug = changeToSlug(req.body.title);
      const manga = await Manga.create(req.body);
      if (req.body.genres instanceof Array) {
        const genres = await Genre.findAll({
          where: {
            id: {
              [Op.in]: req.body.genres.map((e:any) => e.id)
            }
          }
        });
        await manga?.setGenres(genres);
      }
      const result = await Manga.scope(['includeGenre']).findByPk(manga.id);
      res.status(201).json(result)
    } catch (error) {
      console.log('manga controller create error >>', error)
      res.status(500).json({})
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      req.body.titleSlug = changeToSlug(req.body.title);
      await Manga.update(req.body, {
        where: { id: +req.params.id },
        silent: true
      });
      const manga = await Manga.scope(['includeGenre']).findByPk(+req.params.id);
      if (req.body.genres instanceof Array) {
        const genres = await Genre.findAll({
          where: {
            id: {
              [Op.in]: req.body.genres.map((e:any) => e.id)
            }
          }
        });
        await manga?.setGenres(genres);
      }
      res.status(200).json(manga)
    } catch (error) {
      res.status(500).json({})
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const result = await Manga.destroy({
        where: {
          id: +req.params.id
        }
      });
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({})
    }
  }

  addRate = async (req: Request, res: Response) => {
    try {
      const manga = await Manga.findByPk(+req.params.id);
      let rate: any = manga?.rate;
      const star = +req.body.star;
      if (1<=star && star>=5) {
        rate[star] = rate[star] + 1;
        await manga?.update({ rate }, { silent: true });
        res.status(200).send(true)
      }
      res.status(200).send(false)
    } catch (error) {
      res.status(500).send(false)
    }
  }

  incrementFields = async (req: Request, res: Response) => {
    try {
      await Manga.increment(req.body, { 
        where: { 
          id: +req.params.id 
        }, 
        silent: true 
      });
      res.status(200).send(true)
    } catch (error) {
      res.status(500).send(false)
    }
  }
  
}

export default new MangaController();
