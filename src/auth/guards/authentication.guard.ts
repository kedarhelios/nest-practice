import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const [req, res, next]: [Request, Response, NextFunction] =
      context.getArgs();

    // console.log('context.getClass()', context.getClass().name); // className to be executed next
    // console.log('context.getHandler()', context.getHandler()); // functionName to be executed next
    // console.log('context.getType()', context.getType()); // http

    const token = req.headers.authorization.split(' ')[1];
    console.log('token', token);

    return true;
  }
}
