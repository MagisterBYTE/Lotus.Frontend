/* eslint-disable no-console */
import axios from 'axios';
import { ObjectHelper } from '#helpers';
import { LocalizationCore } from '#localization';
import { castToResult } from '#types';
import { Assert } from '#utils';
/**
 * Базовый класс для сервисов Api
 */
export class ApiService {
    // #region Fields
    _api;
    // #endregion
    // #region Properties
    get api() {
        return this._api;
    }
    // #endregion
    // #region Constructors
    constructor(baseURL) {
        const api = axios.create({
            baseURL: baseURL
        });
        // Используем стрелочные функции для сохранения контекста
        api.interceptors.request.use((config) => this.handleRequest(config), (error) => this.handleRequestError(error));
        api.interceptors.response.use((response) => this.handleResponse(response), (error) => this.handleResponseError(error));
        this._api = api;
    }
    // #endregion
    // #region Methods
    handleRequest(config) {
        config.timeout = 10 * 60 * 1000;
        return config;
    }
    handleRequestError(error) {
        console.error(`[request error] [${JSON.stringify(error)}]`);
        return Promise.reject(error);
    }
    handleResponse(response) {
        return response;
    }
    // eslint-disable-next-line complexity
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
                // 401
                if (error.response.status === 401) {
                    const message = LocalizationCore.data.api.errorAuth;
                    const resultNotAuth = {
                        succeeded: false,
                        code: 401,
                        message: message
                    };
                    return Promise.reject(resultNotAuth);
                }
                // Ошибка аутентификации по стандарту RFC 6749
                const errorAuthResponse = error.response.data;
                if (errorAuthResponse && typeof errorAuthResponse === 'object'
                    && errorAuthResponse !== null
                    && errorAuthResponse !== undefined
                    && 'error' in errorAuthResponse && typeof errorAuthResponse.error === 'string'
                    && 'error_description' in errorAuthResponse && typeof errorAuthResponse.error_description === 'string') {
                    const errorAuth = errorAuthResponse.error;
                    const errorDescAuth = errorAuthResponse.error_description;
                    if (Assert.existValue(errorDescAuth)) {
                        const resultAuth = {
                            succeeded: false,
                            code: Number(error.response.status ?? 500),
                            message: errorDescAuth
                        };
                        return Promise.reject(resultAuth);
                    }
                    const message = ObjectHelper.getValue(LocalizationCore.data.api.auth, errorAuth, undefined);
                    if (Assert.existValue(message)) {
                        const resultAuth = {
                            succeeded: false,
                            code: Number(error.response.status ?? 500),
                            message: message
                        };
                        return Promise.reject(resultAuth);
                    }
                }
                const resultError = {
                    data: error.response.data, // Сохраняем данные оригинальной ошибки
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
    get(path, config) {
        return this._api.get(path, config);
    }
    post(path, payload) {
        return this._api.post(path, payload);
    }
    put(path, payload) {
        return this._api.put(path, payload);
    }
    delete(path, config) {
        return this._api.delete(path, config);
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