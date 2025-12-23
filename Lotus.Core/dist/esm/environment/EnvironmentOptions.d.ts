import { TEnvironmentFeature } from './EnvironmentFeature';
import { TEnvironmentType } from './EnvironmentType';
/**
 * Опции окружения
 */
export interface IEnvironmentOptions {
    /**
     * Тип окружения
     */
    type: TEnvironmentType;
    /**
     * Версия фронта
     */
    version?: string;
    /**
     * Номер сборки фронта
     */
    buildId?: string;
    /**
     * Набор фич
     */
    features?: Record<TEnvironmentFeature, string>;
}
//# sourceMappingURL=EnvironmentOptions.d.ts.map