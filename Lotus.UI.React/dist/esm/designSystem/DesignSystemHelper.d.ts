import { IDesignSystemData } from './types/DesignSystemData';
/**
 * Вспомогательный класс для работы с дизайн-системой
 */
export declare abstract class DesignSystemHelper {
    /**
     * Загрузка данных дизайн-системы из локального хранилища
     * @returns Данные дизайн-системы
     */
    loadFromStorage(): IDesignSystemData;
    /**
     * Сохранение данных дизайн-системы в локальное хранилище
     * @param data Данные дизайн-системы
     */
    saveToStorage(data: IDesignSystemData): void;
}
//# sourceMappingURL=DesignSystemHelper.d.ts.map