export interface IHttpService {
    Get(url: string): Promise<HttpObject>;
    Post(url: string, data?: any): Promise<HttpObject>;

}

export interface HttpObject {
    Code: number;
    Data?: string;
    Error?: string;
}