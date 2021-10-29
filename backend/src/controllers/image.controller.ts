import { Request, Response } from 'express';
import request from 'request';

class ImageController {

  getImageFromNTUrl = async (req: Request, res: Response) => {
    if (typeof req.query.key === 'string') {
      let url = Buffer.from(req.query.key, 'base64').toString('ascii');
      request({
        url,
        method: 'get',
        headers: {
          origin: process.env.DOMAIN_REFERER || '', 
          Referer: process.env.DOMAIN_REFERER || ''
        },
        encoding: 'binary'
      }, function(error, response, body) {
        if (error) {
          console.log('image controller get img error >>', error)
          res.status(500).json({
            msg: 'abc.'
          });
        } else {
          res.contentType('image/jpeg');
          res.send(Buffer.from(body, 'binary'));
        }
      })
    } else {
      res.status(500).json({
        msg: 'Invaild key.'
      });
    }
  }
  
}

export default new ImageController();
