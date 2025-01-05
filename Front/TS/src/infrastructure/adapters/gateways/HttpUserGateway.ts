import { IUserGateway } from "../../../domain/abstractions/IUserGateway";
import { IHttpService } from "../http/IHttpService";

export class HttpUserGateway implements IUserGateway {
    constructor(private readonly httpService: IHttpService){}

    async Register(user: { id: string; username: string; email: string; password: string; }): Promise<void> {
        const response = await this.httpService.Post("/users", user)
        if(response.Code == 200) {
            return Promise.resolve()
        }
        return Promise.reject(response.Error);
    }

}