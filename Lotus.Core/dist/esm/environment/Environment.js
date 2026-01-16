/* eslint-disable @typescript-eslint/no-explicit-any */
import { BooleanConverter } from '#converters';
import { TEnvironmentFeatures } from './EnvironmentFeature';
export class Environment {
    // #region Properties
    static get options() {
        if (!globalThis.__ENVIRONMENT_OPTIONS__) {
            globalThis.__ENVIRONMENT_OPTIONS__ = {};
        }
        const options = globalThis.__ENVIRONMENT_OPTIONS__;
        return options;
    }
    static get isDevelopment() {
        return Environment.options.type === 'development';
    }
    static get isProduction() {
        return Environment.options.type === 'production';
    }
    static get version() {
        return Environment.options.version ?? 'unknown';
    }
    static get buildId() {
        return Environment.options.buildId ?? 'unknown';
    }
    static get isCookieAuth() {
        return BooleanConverter.toBoolean(Environment.options.features?.[TEnvironmentFeatures.CookieAuth]);
    }
    static get isTokenAuth() {
        return BooleanConverter.toBoolean(Environment.options.features?.[TEnvironmentFeatures.TokenAuth]);
    }
    static get frontApi() {
        return Environment.options.features?.[TEnvironmentFeatures.FrontApi] ?? 'not_front_api';
    }
    static get backendApi() {
        return Environment.options.features?.[TEnvironmentFeatures.BackendApi] ?? 'not_backend_api';
    }
    // #endregion
    // #region Main methods
    static init(options) {
        globalThis.__ENVIRONMENT_OPTIONS__ = options;
    }
    static featureEnabled(feature) {
        return BooleanConverter.toBoolean(Environment.options.features?.[feature]);
    }
    static getInfo() {
        if (Environment.options) {
            return `
      Environment: ${Environment.options.type}
      Version: ${Environment.version}
      BuildId: ${Environment.buildId}
      FrontApi: ${Environment.frontApi}
      BackendApi: ${Environment.backendApi}
      CookieAuth: ${Environment.isCookieAuth}
      TokenAuth: ${Environment.isTokenAuth}
    `;
        }
        else {
            return 'options is null';
        }
    }
    // #endregion
    // #region Log methods
    static log(...args) {
        if (!Environment.isProduction) {
            // eslint-disable-next-line no-console
            console.log('[DEV]', ...args);
        }
    }
    static warn(...args) {
        if (!Environment.isProduction) {
            console.warn('[DEV]', ...args);
        }
    }
}
//# sourceMappingURL=Environment.js.map