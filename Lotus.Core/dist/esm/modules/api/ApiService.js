/* eslint-disable no-console */
import axios from 'axios';
import { ObjectHelper } from '#helpers';
import { LocalizationCore } from '#localization';
import { castToResult } from '#types';
/**
 * Базовый класс для сервисов Api
 */
export class ApiService {
    api;
    constructor(baseURL) {
        const api = axios.create({
            baseURL: baseURL
        });
        // Используем стрелочные функции для сохранения контекста
        api.interceptors.request.use((config) => this.handleRequest(config), (error) => this.handleRequestError(error));
        api.interceptors.response.use((response) => this.handleResponse(response), (error) => this.handleResponseError(error));
        this.api = api;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleRequest(config) {
        config.timeout = 10 * 60 * 1000;
        // eslint-disable-next-line import/no-named-as-default-member
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
            const result = castToResult(error.response.data);
            if (result) {
                // Дополнительная проверка на value
                const value = ObjectHelper.getValue(error.response.data, 'value', undefined);
                if (value !== undefined) {
                    result.data = value;
                }
                console.log(error.response.data);
                return Promise.reject(result);
            }
            else {
                // Проверяем типовые ошибки
                // 404
                if (error.response.status === 404) {
                    const uri = error.request.responseURL ?? '';
                    const message = LocalizationCore.data.api.errorNotFound.replace('{0}', uri);
                    const resultNotFound = {
                        succeeded: false,
                        code: 404,
                        message: message
                    };
                    return Promise.reject(resultNotFound);
                }
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
                    const result = { succeeded: false, code: 500, message: LocalizationCore.data.api.errorNotOnline };
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
                return Promise.reject(String(error));
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