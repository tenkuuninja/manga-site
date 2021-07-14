import { Request, Response } from 'express';
import Chapter from '../models/chapter.model';
import Manga from '../models/manga.model';

class ChapterController {

  private readonly sortDefault: string = '-number';

  fetchList = async (req: Request, res: Response) => {
    let scope: any[] = ['includeManga', { method: ['sortQuery', this.sortDefault] }];
    let scopeCount: any[] = [];
    try {
      const result = await Chapter.scope(scope).findAll();
      const count = await Chapter.scope(scopeCount).count();
      res.status(200).json({
        content: result,
        count: count,
        page: 1,
        size: count,
        totalPage: 1
      })
    } catch (error) {
      res.status(500).json({
        errorMessage: "Tham số không hợp lệ"
      });
    }
  }

  fetchById = async (req: Request, res: Response) => {
    try {
      const result = await Chapter.scope(['includeManga']).findByPk(+req.params.id);
      res.status(200).json(result);
      await Manga.increment(['view', 'viewDay', 'viewWeek', 'viewMonth'], {
        where: {
          id: result?.manga?.id
        },
        silent: true
      });
    } catch (error) {
      res.status(500).json({
        errorMessage: "Đã xảy ra lỗi"
      });
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      req.body.totalPage = req.body.content?.length || 0;
      req.body.manga_id = req.body.mangaId;
      const chapter = await Chapter.create(req.body);
      const result = await Chapter.scope(['includeManga']).findByPk(chapter.id);
      const manga = await Manga.findByPk(req.body.mangaId);
      const totalChapterOfManga = await manga?.countChapters();
      await manga?.update({ chapter: totalChapterOfManga });
      res.status(201).json(result)
    } catch (error) {
      console.log('chapter controller create error >>', error)
      res.status(500).json({})
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      req.body.totalPage = req.body.content.length;
      req.body.manga_id = req.body.content.mangaId;
      await Chapter.update(req.body, {
        where: { id: +req.params.id }
      });
      const result = await Chapter.scope(['includeManga']).findByPk(+req.params.id);
      res.status(200).json(result)
    } catch (error) {
      console.log('chapter controller update error >>', error)
      res.status(500).json({})
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const result = await Chapter.destroy({
        where: {
          id: +req.params.id
        }
      });
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({})
    }
  }
  
}

export default new ChapterController();
