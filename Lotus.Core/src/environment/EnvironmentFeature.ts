/**
 * Массив значений типов стандартных свойств/фич для окружения
 */
export const TEnvironmentFeatureValues = ['cookieAuth', 'tokenAuth', 'frontApi', 'backendApi'] as const;

/**
 * Типы стандартных свойств/фич для окружения
 */
export type TEnvironmentFeature = (typeof TEnvironmentFeatureValues)[number];

/**
 * Набор стандартных свойств/фич для окружения
 */
export const TEnvironmentFeatures = {
  CookieAuth: TEnvironmentFeatureValues[0],
  TokenAuth: TEnvironmentFeatureValues[1],
  FrontApi: TEnvironmentFeatureValues[2],
  BackendApi: TEnvironmentFeatureValues[3],

  getAllValues(): typeof TEnvironmentFeatureValues
  {
    return TEnvironmentFeatureValues;
  },

  isEnvironmentFeature(value: unknown): value is TEnvironmentFeature
  {
    return (TEnvironmentFeatureValues as readonly unknown[]).includes(value);
  },

  getByIndex(index: number): TEnvironmentFeature | undefined
  {
    return TEnvironmentFeatureValues[index];
  },

  getByName(name: string): TEnvironmentFeature | undefined
  {
    return TEnvironmentFeatureValues.find((v) => v === name);
  }
} as const;