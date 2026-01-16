/**
 * Массив значений типов стандартных свойств/фич для окружения
 */
export declare const TEnvironmentFeatureValues: readonly ["cookieAuth", "tokenAuth", "frontApi", "backendApi"];
/**
 * Типы стандартных свойств/фич для окружения
 */
export type TEnvironmentFeature = (typeof TEnvironmentFeatureValues)[number];
/**
 * Набор стандартных свойств/фич для окружения
 */
export declare const TEnvironmentFeatures: {
    readonly CookieAuth: "cookieAuth";
    readonly TokenAuth: "tokenAuth";
    readonly FrontApi: "frontApi";
    readonly BackendApi: "backendApi";
    readonly getAllValues: () => typeof TEnvironmentFeatureValues;
    readonly isEnvironmentFeature: (value: unknown) => value is TEnvironmentFeature;
    readonly getByIndex: (index: number) => TEnvironmentFeature | undefined;
    readonly getByName: (name: string) => TEnvironmentFeature | undefined;
};
//# sourceMappingURL=EnvironmentFeature.d.ts.map