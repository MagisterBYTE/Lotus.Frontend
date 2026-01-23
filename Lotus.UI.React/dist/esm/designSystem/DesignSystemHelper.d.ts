import { IDesignSystemData } from './types/DesignSystemData';
/**
 * Вспомогательный класс для работы с дизайн-системой
 */
export declare abstract class DesignSystemHelper {
    /**
     * Установка данных дизайн-системы интерфейса для всей страницы
     * @returns Данные дизайн-системы
     */
    static setDocumentDesignSystem(data: IDesignSystemData): void;
    /**
     * Читает данные дизайн-системы интерфейса со страницы
     * @returns Данные дизайн-системы или undefined
     */
    static getDocumentDesignSystem(): IDesignSystemData | undefined;
    /**
     * Загрузка данных дизайн-системы из локального хранилища
     * @param key Ключ
     * @returns Данные дизайн-системы или undefined
     */
    static loadFromStorage(key?: string): IDesignSystemData | undefined;
    /**
     * Сохранение данных дизайн-системы в локальное хранилище
     * @param key Ключ
     * @param data Данные дизайн-системы
     */
    static saveToStorage(key: string | undefined, data: IDesignSystemData): void;
}
//# sourceMappingURL=DesignSystemHelper.d.ts.map