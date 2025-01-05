import { HttpClient, HttpResponse } from "@angular/common/http";
import { HttpObject, IHttpService } from "../../../../../adapters/http/IHttpService";
import { lastValueFrom } from "rxjs";

export class HttpService implements IHttpService {
    private readonly apiUrl: string;

    constructor(private readonly httpClient: HttpClient, apiUrl: string) {
        this.apiUrl = apiUrl;
    }
    async Get(url: string): Promise<HttpObject> {
        const observable = this.httpClient.get(`${this.apiUrl}/${url}`, { observe: 'response' });
        const response = await lastValueFrom(observable);
        return this.HandleResponse(response)
    }
    
    async Post(url: string, data?: any): Promise<HttpObject> {
        const observable = this.httpClient.post(`${this.apiUrl}/${url}`, data, { observe: 'response' });
        const response = await lastValueFrom(observable);
        return this.HandleResponse(response)
    }

    private HandleResponse(response: HttpResponse<Object>): HttpObject | PromiseLike<HttpObject> {
        if(response.ok) {
            return {
                Code: response.status,
                Data: response.body
            }
        }
        return {
            Code: response.status,
            Error: response.body?.toString()
        }
    }
}