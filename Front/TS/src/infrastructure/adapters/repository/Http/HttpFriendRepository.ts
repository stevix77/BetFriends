import { FriendDto } from "../../../../domain/features/RetrieveFriendsHandler";
import { IFriendRepository } from "../../../../domain/friends/IFriendRepository";
import { IHttpService } from "../../http/IHttpService";

export class HttpFriendRepository implements IFriendRepository {
    constructor(private readonly httpService: IHttpService){}
    async GetFriendsAsync(): Promise<FriendDto[]> {
        const response = await this.httpService.Get(`friendship`)
        if(response.Code == 200) {
            return Promise.resolve(response.Data as FriendDto[]);
        }
        return Promise.reject();
    }
    async SaveAsync(memberId: string): Promise<void> {
        const response = await this.httpService.Post(`friendship/${memberId}`)
        if(response.Code == 200) {
            return Promise.resolve(undefined!);
        }
        return Promise.reject(response.Error);
    }

}