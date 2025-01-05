import { type IHttpService, type HttpObject } from "../../../../adapters/http/IHttpService";
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

export class HttpService implements IHttpService {
    private readonly apiClient: AxiosInstance;
    constructor(apiUrl: string) {
        this.apiClient = axios.create({
            baseURL: apiUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
        

    async Get(url: string): Promise<HttpObject> {
        const response = await this.apiClient.get(url);
        if(response.status >= 200 || response.status <= 299) {
            return this.HandleSuccess(response)
        }

        return this.HandleError(response);
    }
    
    async Post(url: string, data?: any): Promise<HttpObject> {
        const response = await this.apiClient.post(url, data);
        if(response.status >= 200 || response.status <= 299) {
            return this.HandleSuccess(response)
        }

        return this.HandleError(response);
    }
    private HandleError(response: AxiosResponse): any {
        console.error(response.statusText)
        return {
            Code: response.status,
            Error: response.data
        }
    }

    private HandleSuccess(response: AxiosResponse): any {
        return {
            Code: response.status,
            Data: response.data
        }
    }

} 