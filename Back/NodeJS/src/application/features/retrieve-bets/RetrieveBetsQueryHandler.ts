import { IRequestHandler } from '../../Abstractions/Request/IRequestHandler';
import { IRequest } from '../../Abstractions/Request/IRequest';
import { IUserContext } from '../../Abstractions/IUserContext';
export class RetrieveBetsQueryHandler implements IRequestHandler<RetrieveBetsQuery, RetrieveBetsResponse[]> {
    constructor(private readonly dataAccess: IRetrieveBetsDataAccess,
        private userContext: IUserContext){}
    Handle(request: RetrieveBetsQuery): Promise<RetrieveBetsResponse[]> {
        return this.dataAccess.RetrieveBetsAsync(this.userContext.UserId);
    }
    GetRequestType(): string {
        return RetrieveBetsQuery.name;
    }

}

export class RetrieveBetsQuery implements IRequest<RetrieveBetsResponse[]> {
    constructor(){}
    Name: string = RetrieveBetsQuery.name;
}

export interface RetrieveBetsResponse {
    Id: string;
    Description: string;
    Chips: number;
    EndDate: Date;
    OwnerId: string;
}

export interface IRetrieveBetsDataAccess {
    RetrieveBetsAsync(userId: string): Promise<RetrieveBetsResponse[]>;
}