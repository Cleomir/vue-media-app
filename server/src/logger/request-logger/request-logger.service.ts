import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

import { LoggerService } from '../logger.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      id: string;
    }
  }
}

/**
 * Log request params and add a unique request id to req.id
 */
@Injectable()
export class RequestLoggerService implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // check if request has an id or create one
    const requestId: string | undefined = req.get('X-Request-ID');
    req.id = requestId ? requestId : uuidv4();

    // log request data
    const {
      protocol,
      headers,
      method,
      body,
      query,
      originalUrl,
      connection,
    } = req;
    this.logger.log(
      `IP: ${
        connection.remoteAddress
      } request URL: ${method} ${protocol}://${req.get('host')}${originalUrl}`,
      'Request',
      req.id,
    );
    this.logger.log('Request headers:', 'NewRequest', req.id, headers);
    this.logger.log('Request body:', 'NewRequest', req.id, body);
    this.logger.log('Request query:', 'NewRequest', req.id, query);

    next();
  }
}
