import { RequestOptions } from "./RequestOptions";

export interface IRequestModule {
    request<R>(options: RequestOptions): Promise<R>;
}