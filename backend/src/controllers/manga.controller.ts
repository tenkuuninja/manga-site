import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Manga from '../models/manga.model';
import Genre from '../models/genre.model';
import { changeToSlug } from '../utils/string';

class MangaController {

  private readonly pageDefault: number = 1;
  private readonly pageSizeDefault: number = 30;
  private readonly sortDefault: string = '-updated_at';

  fetchList = async (req: Request, res: Response) => {
    let scope: any[] = ['includeGenre', 'showTotalFollowing', 'hideSrcLeech'];
    let scopeCount: any[] = [];
    if (req.query.search) {
      scope.push({ method: ['searchQuery', req.query.search] })
      scopeCount.push({ method: ['searchQuery', req.query.search] })
    }
    if (req.query.filter) {
      scope.push({ method: ['filterQuery', req.query.filter] })
      scopeCount.push({ method: ['filterQuery', req.query.filter] })
    }
    if (typeof req.query.genre === 'string') {
      scope.push({ method: ['filterGenre', req.query.genre.split(',').filter(id => !isNaN(+id))] })
      scopeCount.push({ method: ['filterGenre', req.query.genre.split(',').filter(id => !isNaN(+id))] })
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
      const result = await Manga.scope(scope).findAll();
      const count = await Manga.scope(scopeCount).count();
      res.status(200).json({
        content: result,
        count: count,
        page: page,
        size: size,
        totalPage: Math.ceil(count/+size)
      })
    } catch (error) {
      res.status(500).json({
        errorMessage: "Tham số không hợp lệ"
      });
    }
  }

  fetchById = async (req: Request, res: Response) => {
    try {
      const result = await Manga.scope([
        'includeGenre', 
        'includeChapter', 
        'showTotalFollowing', 
        'hideSrcLeech'
      ]).findByPk(+req.params.id);
      res.status(200).json(result);
    } catch (error) {
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
        await manga?.update({ rate });
        res.status(200).send(true)
      }
      res.status(200).send(false)
    } catch (error) {
      res.status(500).send(false)
    }
  }
  
}

export default new MangaController();
