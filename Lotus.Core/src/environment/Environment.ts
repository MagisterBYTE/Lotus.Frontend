/* eslint-disable @typescript-eslint/no-explicit-any */
import { BooleanConverter } from '#converters';
import { EnvironmentFeatures, TEnvironmentFeature } from './EnvironmentFeature';
import { IEnvironmentOptions } from './EnvironmentOptions';

export abstract class Environment 
{
  // #region Properties
  public static get options():IEnvironmentOptions
  {
    if (!(globalThis as any).__ENVIRONMENT_OPTIONS__) 
    {
      (globalThis as any).__ENVIRONMENT_OPTIONS__ = {};
    }

    const options = (globalThis as any).__ENVIRONMENT_OPTIONS__;

    return options;
  }

  public static get isDevelopment(): boolean 
  {
    return Environment.options.type === 'development';
  }

  public static get isProduction(): boolean 
  {
    return Environment.options.type === 'production';
  }

  public static get version(): string 
  {
    return Environment.options.version  ?? 'unknown';
  }

  public static get buildId(): string 
  {
    return Environment.options.buildId ?? 'unknown';
  }

  public static get isCookieAuth(): boolean 
  {
    return BooleanConverter.toBoolean(Environment.options.features?.[EnvironmentFeatures.cookieAuth]);
  }

  public static get isTokenAuth(): boolean 
  {
    return BooleanConverter.toBoolean(Environment.options.features?.[EnvironmentFeatures.tokenAuth]);
  }

  public static get frontApi(): string 
  {
    return Environment.options.features?.[EnvironmentFeatures.frontApi] ?? 'not_front_api';
  }

  public static get backendApi(): string 
  {
    return Environment.options.features?.[EnvironmentFeatures.backendApi] ?? 'not_backend_api';
  }
  // #endregion

  // #region Main methods
  public static init(options: IEnvironmentOptions): void 
  {
    (globalThis as any).__ENVIRONMENT_OPTIONS__ = options;
  }

  public static featureEnabled(feature: TEnvironmentFeature): boolean 
  {
    return BooleanConverter.toBoolean(Environment.options.features?.[feature]);
  }

  public static getInfo(): string
  {
    if (Environment.options)
    {
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
    else
    {
      return 'options is null';
    }
  }
  // #endregion

  // #region Log methods
  public static log(...args: any[]): void 
  {
    if (!Environment.isProduction) 
    {
      // eslint-disable-next-line no-console
      console.log('[DEV]', ...args);
    }
  }

  public static warn(...args: any[]): void 
  {
    if (!Environment.isProduction) 
    {
      console.warn('[DEV]', ...args);
    }
  }
  // #endregion
}
