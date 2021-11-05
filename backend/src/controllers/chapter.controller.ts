import { Request, Response } from 'express';
import seq, { Op } from 'sequelize';
import Chapter from '../models/chapter.model';
import Manga from '../models/manga.model';
import User from '../models/user.model';

class ChapterController {

  private readonly sortDefault: string = '-number';

  fetchList = async (req: Request, res: Response) => {
    let scope: any[] = ['includeManga', { method: ['sortQuery', this.sortDefault] }];
    let scopeCount: any[] = [];
    let include: string | string[] = req.query.include as string | string[] || '';
    if (typeof include === 'string') {
      include = [include];
    }
    if (include.includes('manga')) {
      scope.push('includeManga');
    }
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
      let mangaScope: any[] = ['includeGenre', 'hideSrcLeech'];
      let include: string | string[] = req.query.include as string | string[] || '';
      if (typeof include === 'string') {
        include = [include];
      }
      if (req.user instanceof User) {
        mangaScope.push({ method: ['showIsFollowingById', +req.user.id] })
      }
      const result = await Chapter.findOne({
        where: {
          id: +req.params.id
        },
        include: [{
          model: Manga.scope(mangaScope),
          as: 'manga'
        }],
        order: [ [seq.literal('`manga.chapters.number`'), 'DESC'] ]
      }); 
      if (result === null) {
        return res.status(404).json({ msg: 'Nội dung không tồn tại' });
      }
      if (include.includes('navigation') && result !== null) {
        let [prevChapter, nextChapter] = await Promise.all([
          Chapter.findOne({
            where: { number: { [Op.lt]: result?.number}, mangaId: result?.mangaId },
            // attributes: ['number', 'id'],
            order: [['number', 'DESC']]
          }),
          Chapter.findOne({
            where: { number: { [Op.gt]: result?.number}, mangaId: result?.mangaId },
            // attributes: ['number', 'id'],
            order: [['number', 'ASC']]
          })
        ]);
        result.navigation = {
          previous: prevChapter,
          next: nextChapter
        }
      }
      res.status(200).json(result);
      await Manga.increment(['view', 'viewDay', 'viewWeek', 'viewMonth'], {
        where: {
          id: result?.mangaId
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
