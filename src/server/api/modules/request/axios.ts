import axios, { AxiosRequestConfig, Method, AxiosInstance } from 'axios';
import { IRequestModule } from './IRequestModule';
import { RequestOptions } from './RequestOptions';

export class AxiosRequestModule implements IRequestModule {
    private _client: AxiosInstance;

    constructor(options: RequestOptions) {
        this._client = axios.create(this.convertToAxiosOpts(options));
    }

    public request<R>(options: RequestOptions): Promise<R> {
        return this._client.request(this.convertToAxiosOpts(options));
    }

    private convertToAxiosOpts(options: RequestOptions): AxiosRequestConfig {
        const axiosClientOpts: AxiosRequestConfig = {
            url: options.url,
            method: options.method as Method,
            baseURL: options.baseURL,
            headers: options.headers,
            params: options.params,
            data: options.body,
            withCredentials: options.CORS,
            maxRedirects: options.maxRedirects,
            httpAgent: options.httpAgent,
            httpsAgent: options.httpsAgent
        }

        return axiosClientOpts;
    }
}