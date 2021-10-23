import { Request, Response, NextFunction } from 'express';

const ACCESS_CONTROL_ALLOW_ORIGIN = process.env.ACCESS_CONTROL_ALLOW_ORIGIN?.split(',').map((host: string) => host.trim()) || '*'

export default function(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin || '';
  if (ACCESS_CONTROL_ALLOW_ORIGIN === '*' || ACCESS_CONTROL_ALLOW_ORIGIN.includes('*')) {
    res.header("Access-Control-Allow-Origin", "*");
  } else if (ACCESS_CONTROL_ALLOW_ORIGIN.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
}
