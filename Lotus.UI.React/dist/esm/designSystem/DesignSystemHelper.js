import { DesignSystemConstants } from './DesignSystemConstants';
/**
 * Вспомогательный класс для работы с дизайн-системой
 */
export class DesignSystemHelper {
    // #region Load/Save
    /**
     * Загрузка данных дизайн-системы из локального хранилища
     * @returns Данные дизайн-системы
     */
    loadFromStorage() {
        const value = localStorage.getItem(DesignSystemConstants.SaveKey);
        if (value) {
            return JSON.parse(value);
        }
        else {
            return { colorScheme: 'light', primaryColor: 'blue' };
        }
    }
    /**
     * Сохранение данных дизайн-системы в локальное хранилище
     * @param data Данные дизайн-системы
     */
    saveToStorage(data) {
        localStorage.setItem(DesignSystemConstants.SaveKey, JSON.stringify(data));
    }
}
//# sourceMappingURL=DesignSystemHelper.js.map