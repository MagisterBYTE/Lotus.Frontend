/**
 * Массив значений типов стандартных свойств/фич для окружения
 */
export const TEnvironmentFeatureValues = ['cookieAuth', 'tokenAuth', 'frontApi', 'backendApi'];
/**
 * Набор стандартных свойств/фич для окружения
 */
export const TEnvironmentFeatures = {
    CookieAuth: TEnvironmentFeatureValues[0],
    TokenAuth: TEnvironmentFeatureValues[1],
    FrontApi: TEnvironmentFeatureValues[2],
    BackendApi: TEnvironmentFeatureValues[3],
    getAllValues() {
        return TEnvironmentFeatureValues;
    },
    isEnvironmentFeature(value) {
        return TEnvironmentFeatureValues.includes(value);
    },
    getByIndex(index) {
        return TEnvironmentFeatureValues[index];
    },
    getByName(name) {
        return TEnvironmentFeatureValues.find((v) => v === name);
    }
};
//# sourceMappingURL=EnvironmentFeature.js.map