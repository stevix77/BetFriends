export interface IRequestHandler<T, TOut> {
    Handle(request: T) : Promise<TOut>;
    GetRequestType(): string;
}