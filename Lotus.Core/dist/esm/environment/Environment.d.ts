import { TEnvironmentFeature } from './EnvironmentFeature';
import { IEnvironmentOptions } from './EnvironmentOptions';
export declare abstract class Environment {
    static get options(): IEnvironmentOptions;
    static get isDevelopment(): boolean;
    static get isProduction(): boolean;
    static get version(): string;
    static get buildId(): string;
    static get isCookieAuth(): boolean;
    static get isTokenAuth(): boolean;
    static get frontApi(): string;
    static get backendApi(): string;
    static init(options: IEnvironmentOptions): void;
    static featureEnabled(feature: TEnvironmentFeature): boolean;
    static getInfo(): string;
    static log(...args: any[]): void;
    static warn(...args: any[]): void;
}
//# sourceMappingURL=Environment.d.ts.map