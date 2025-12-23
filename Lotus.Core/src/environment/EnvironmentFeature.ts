
/**
 * Типы стандартных свойств/фич для окружения
 */
export type TEnvironmentFeature = 'cookieAuth' | 'tokenAuth' | 'frontApi' | 'backendApi';

/**
 * Набор стандартных свойств/фич для окружения
 */
export const EnvironmentFeatures = 
{
  cookieAuth: 'cookieAuth' as TEnvironmentFeature,
  tokenAuth: 'tokenAuth' as TEnvironmentFeature,
  frontApi: 'frontApi' as TEnvironmentFeature,
  backendApi: 'backendApi' as TEnvironmentFeature
} as const;