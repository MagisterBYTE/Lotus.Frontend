import axios from 'axios';
import { instanceOfResult } from '../../types/Result';
/**
 * Базовый класс для сервисов Api
 */
export class ApiService {
    api;
    constructor(baseURL) {
        const api = axios.create({
            baseURL: baseURL
        });
        api.interceptors.request.use(this.handleRequest, this.handleRequestError);
        api.interceptors.response.use(this.handleResponse, this.handleResponseError);
        this.api = api;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleRequest(config) {
        config.timeout = 10 * 60 * 1000;
        config.cancelToken = axios.CancelToken.source().token;
        return config;
    }
    handleRequestError(error) {
        console.error(`[request error] [${JSON.stringify(error)}]`);
        return Promise.reject(error);
    }
    handleResponse(response) {
        return response;
    }
    handleResponseError(error) {
        // Запрос был сделан, и сервер ответил кодом состояния, который выходит за пределы 2xx
        if (error.response) {
            // Все ошибки приводим к типу IResult для унификации обработки и реагирования
            const result = instanceOfResult(error.response.data);
            if (result) {
                console.log(error.response.data);
                return Promise.reject(result);
            }
            else {
                const resultError = {
                    succeeded: false,
                    code: Number(error.response.status ?? 500),
                    message: error.message
                };
                return Promise.reject(resultError);
            }
        }
        else {
            // Запрос был сделан, но ответ не получен - `error.request`- это экземпляр XMLHttpRequest в браузере
            if (error.request) {
                // Проверка на отдельные коды ошибок
                if (error.code === 'ERR_NETWORK') {
                    const result = { succeeded: false, code: 500, message: error.message };
                    return Promise.reject(result);
                }
                console.log(error);
                console.log('Error is not result!!!');
                return Promise.reject(error);
            }
            else {
                // Произошло что-то при настройке запроса, вызвавшее ошибку
                console.log(error);
                console.log('Error is not result!!!');
                return Promise.reject(error);
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(path, config) {
        return this.api.get(path, config);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    post(path, payload) {
        return this.api.post(path, payload);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    put(path, payload) {
        return this.api.put(path, payload);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete(path, config) {
        return this.api.delete(path, config);
    }
    getConfigAcceptJson() {
        const config = {
            headers: {
                Accept: 'application/json'
            }
        };
        return config;
    }
}
//# sourceMappingURL=ApiService.js.map