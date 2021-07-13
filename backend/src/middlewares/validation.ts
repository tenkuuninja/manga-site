import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

class Validatior {

  mangaValid = () => [
    check('title')
      .exists().withMessage("title khong duoc rong")
      .isString().withMessage("Tieu de phai la chu")
  ]

  chapterValid = () => [
    check('mangaId')
      .exists().withMessage("Chapter phai thuoc mot Manga")
      .isInt().withMessage("manga id phai la so"),
    check('content')
      .isArray().withMessage('Noi dung phai la mot mang')
  ]

  commentValid = () => [
    check('mangaId')
      .isInt().withMessage("manga id phai la so"),
    check('userId')
      .isInt().withMessage("id nguoi dung phai la so"),
    check('content')
      .exists().withMessage("noi dung khong duoc rong"),
  ]

  userValid = () => [
    check('username')
      .exists().withMessage("ten nguoi dung khong duoc rong"),
    check('password')
      .isInt().withMessage("mat khau khong duoc rong"),
    check('email')
      .exists().isEmail().withMessage("Email khong dung dinh dang"),
  ]

  verify = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)
    if (error.isEmpty()) next();
    else res.status(500).json(error);
  }
}

export default new Validatior();
