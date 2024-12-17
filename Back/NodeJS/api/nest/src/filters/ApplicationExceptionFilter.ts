import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { NoneFriendException } from '../../../../modules/bets/src/domain/members/exceptions/NoneFriendException';
import { NotEnoughChipsException } from '../../../../modules/bets/src/domain/members/exceptions/NotEnoughChipsException';

@Catch()
export class ApplicationExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<Request>();
        const status = this.GetStatus(exception)
    
        console.error(exception.stack)
        response
          .status(status)
          .send({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message
          });
    }
    GetStatus(exception: Error): number {
        if(exception instanceof NoneFriendException || exception instanceof NotEnoughChipsException) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}