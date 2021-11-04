import { Request, Response } from 'express';
import Manga from '../models/manga.model';
import Comment from '../models/comment.model';

class CommentController {

  private readonly pageDefault: number = 1;
  private readonly pageSizeDefault: number = 30;
  private readonly sortDefault: string = '-createdAt';

  fetchList = async (req: Request, res: Response) => {
    let scope: any[] = ['includeUser', 'includeManga', 'includeReply'];
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
      const result = await Comment.scope(scope).findAll();
      const count = await Comment.scope(scopeCount).count();
      res.status(200).json({
        content: result,
        count: count,
        page: page,
        size: size,
        totalPage: Math.ceil(count/+size)
      })
    } catch (error) {
      console.log('comment controller fetch all error >>', error)
      res.status(500).json({
        errorMessage: "Tham số không hợp lệ"
      });
    }
  }

  fetchById = async (req: Request, res: Response) => {
    try {
      const result = await Comment.scope(['includeUser', 'includeManga', 'includeReply']).findByPk(+req.params.id);
      if (result === null) {
        return res.status(404).json({ msg: 'Nội dung không tồn tại' });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        errorMessage: "Đã xảy ra lỗi"
      });
    }
  }

  create = async (req: Request, res: Response) => {
    try {
      req.body.manga_id = req.body.mangaId;
      req.body.user_id = req.body.userId;
      req.body.parent_id = req.body.parentId;
      const comment = await Comment.create(req.body);
      const result = await Comment.scope(['includeUser', 'includeManga', 'includeReply']).findByPk(comment.id);
      res.status(201).json(result)
    } catch (error) {
      console.log('manga controller create error >>', error)
      res.status(500).json({})
    }
  }

  update = async (req: Request, res: Response) => {
    try {
      req.body.manga_id = req.body.mangaId;
      req.body.user_id = req.body.userId;
      req.body.parent_id = req.body.parentId;
      await Manga.update(req.body, { where: { id: +req.params.id } });
      const result = await Comment.scope(['includeUser', 'includeManga', 'includeReply']).findByPk(+req.params.id);
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({})
    }
  }

  delete = async (req: Request, res: Response) => {
    try {
      const result = await Comment.destroy({
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

export default new CommentController();
