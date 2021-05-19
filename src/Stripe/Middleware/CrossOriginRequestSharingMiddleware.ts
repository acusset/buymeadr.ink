import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CrossOriginResourceSharingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_URL);
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');
    console.log(req.headers['origin'])
    next();
  }
}
