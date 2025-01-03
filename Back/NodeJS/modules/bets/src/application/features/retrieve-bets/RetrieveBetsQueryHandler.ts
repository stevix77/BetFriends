import { IRequestHandler } from '../../../../../shared/application/Request/IRequestHandler';
import { IRequest } from '../../../../../shared/application/Request/IRequest';
import { IUserContext } from '../../Abstractions/IUserContext';
export class RetrieveBetsQueryHandler implements IRequestHandler<RetrieveBetsQuery, RetrieveBetsResponse[]> {
    constructor(private readonly dataAccess: IRetrieveBetsDataAccess,
        private userContext: IUserContext){}
    Handle(request: RetrieveBetsQuery): Promise<RetrieveBetsResponse[]> {
        return this.dataAccess.RetrieveBetsAsync(this.userContext.GetUserId());
    }
    GetRequestType(): string {
        return RetrieveBetsQuery.name;
    }
}

export class RetrieveBetsQuery extends IRequest<RetrieveBetsResponse[]> {
    constructor(){
        super();
    }
    Name: string = RetrieveBetsQuery.name;
}

export interface RetrieveBetsResponse {
    Id: string;
    Description: string;
    Coins: number;
    EndDate: Date;
    BookieId: string;
    BookieName: string;
    MaxAnswerDate: Date;
    Gamblers: GamblerDto[]
}

export interface IRetrieveBetsDataAccess {
    RetrieveBetsAsync(userId: string): Promise<RetrieveBetsResponse[]>;
}

export interface GamblerDto {
    Id: string;
    Name: string;
    HasAccepted?: boolean;
}