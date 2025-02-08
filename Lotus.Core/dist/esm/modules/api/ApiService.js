/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Базовый класс для сервисов Api
 */
export class ApiService {
    constructor() {
    }
    get(path, config) {
    }
    post(path, payload, config) {
    }
    put(path, payload, config) {
    }
    delete(path, config) {
    }
    getConfigAcceptJson() {
        const config = {
            headers: {
                'Accept': 'application/json'
            }
        };
        return config;
    }
}
