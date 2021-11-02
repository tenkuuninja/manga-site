import { Request, Response } from 'express';
import request, { CoreOptions } from 'request';
import { caesarCipher } from '../utils/string';

class ImageController {

  getImageFromNTUrl = async (req: Request, res: Response) => {
    if (typeof req.query.key === 'string') {
      let data = caesarCipher().decode(req.query.key).split('|*|');
      let options: CoreOptions = {
        method: 'get',
        encoding: 'binary'
      }
      let url = '';
      if (data.length>=1) url = data[0];
      if (data.length>=2) options.headers = {
        origin: data[1], 
        Referer: data[1]
      };
      request(url, options, function(error, response, body) {
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
