import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { HttpObject, IHttpService } from "../../../../../adapters/http/IHttpService";
import { lastValueFrom } from "rxjs";
import { AuthService } from "./authService";

export class HttpService implements IHttpService {
    private readonly apiUrl: string;
    private authToken?: string;

    constructor(private readonly httpClient: HttpClient, 
                apiUrl: string, 
                private readonly authService: AuthService) {
        this.apiUrl = apiUrl;
        this.authService.isAuthenticated$.subscribe(async (status) => {
            if(status) {
                this.authToken = localStorage.getItem('auth_token')!;
                return;
            }
            this.authToken = undefined;
        })
    }
    async Get(url: string): Promise<HttpObject> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.authToken}`,
            'Content-Type': 'application/json'
        });
        const observable = this.httpClient.get(`${this.apiUrl}/${url}`, { observe: 'response', headers: headers });
        const response = await lastValueFrom(observable);
        return this.HandleResponse(response)
    }
    
    async Post(url: string, data?: any): Promise<HttpObject> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.authToken}`,
            'Content-Type': 'application/json'
        });
        const observable = this.httpClient.post(`${this.apiUrl}/${url}`, data, { observe: 'response', headers: headers });
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