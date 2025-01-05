import { AuthToken, IAuthRepository } from "../../../domain/features/LoginHandler";
import { IHttpService } from "../http/IHttpService";

export class HttpAuthGateway implements IAuthRepository {
    constructor(private readonly httpService: IHttpService) {}
    async Login(credentials: { email: string; password: string; }): Promise<AuthToken> {
        const response = await this.httpService.Post("/auth", credentials)
        if(response.Code == 200) {
            return JSON.parse(response.Data!) as AuthToken;
        }
        return Promise.reject(response.Error);
    }

}