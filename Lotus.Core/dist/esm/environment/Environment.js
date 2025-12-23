/* eslint-disable @typescript-eslint/no-explicit-any */
import { BooleanConverter } from '#converters';
import { EnvironmentFeatures } from './EnvironmentFeature';
export class Environment {
    // #region Fields
    static options;
    // #endregion
    // #region Properties
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
        return BooleanConverter.toBoolean(Environment.options.features?.[EnvironmentFeatures.cookieAuth]);
    }
    static get isTokenAuth() {
        return BooleanConverter.toBoolean(Environment.options.features?.[EnvironmentFeatures.tokenAuth]);
    }
    static get frontApi() {
        return Environment.options.features?.[EnvironmentFeatures.frontApi] ?? 'not_front_api';
    }
    static get backendApi() {
        return Environment.options.features?.[EnvironmentFeatures.backendApi] ?? 'not_backend_api';
    }
    // #endregion
    // #region Main methods
    static init(options) {
        Environment.options = options;
    }
    static featureEnabled(feature) {
        return BooleanConverter.toBoolean(Environment.options.features?.[feature]);
    }
    static getInfo() {
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