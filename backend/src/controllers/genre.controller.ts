import { Request, Response } from 'express';
import Genre from '../models/genre.model';

class GenreController {

  fetchList = async (req: Request, res: Response) => {
    try {
      const result = await Genre.findAll();
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({
        errorMessage: "Tham số không hợp lệ"
      });
    }
  }

  fetchById = async (req: Request, res: Response) => {
    try {
      const result = await Genre.findByPk(+req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        errorMessage: "Đã xảy ra lỗi"
      });
    }
  }
  
}

export default new GenreController();
