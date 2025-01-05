import { IMemberGateway, MemberInfo } from "../../../domain/abstractions/IMemberGateway";
import { IHttpService } from "../http/IHttpService";

export class HttpMemberGateway implements IMemberGateway {
    constructor(private readonly httpService: IHttpService) {}
    async RetrieveInfo(): Promise<MemberInfo> {
        const response = await this.httpService.Post("/me")
        if(response.Code == 200) {
            return response.Data as MemberInfo;
        }
        return Promise.reject(response.Error);
    }

}