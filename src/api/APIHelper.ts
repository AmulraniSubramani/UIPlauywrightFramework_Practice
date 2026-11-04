import { APIRequestContext } from "@playwright/test";


export class APIHelper {
    private readonly request: APIRequestContext;
    private readonly baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    };

    //GET   -- record also kind of map
    async get(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.get(`${this.baseUrl}${endPoint}`, {
            headers: headers
        });
        // console.log('API GET RESPONSE: ', response);
        return {
            status: response.status(),
            body: await response.json(),
        }
    }


    //post 

    async post(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseUrl}${endPoint}`, {
            data: data,
            headers: headers
        });

        return {
            status: response.status(),
            body: await response.json(),
        }
    }

    
    //PUT
    async put(endPoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseUrl}${endPoint}`, {
            data: data,
            headers: headers
        });
        return {
            status: response.status(),
            body: await response.json()
        }
    }


    //delete

    async delete(endPoint: string, headers?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseUrl}${endPoint}`, {
            headers: headers
        });

        return {
            status: response.status(),
            
        }
    }
}