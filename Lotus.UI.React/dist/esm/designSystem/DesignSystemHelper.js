import { DesignSystemConstants } from './DesignSystemConstants';
/**
 * Вспомогательный класс для работы с дизайн-системой
 */
export class DesignSystemHelper {
    // #region Document
    /**
     * Установка данных дизайн-системы интерфейса для всей страницы
     * @returns Данные дизайн-системы
     */
    static setDocumentDesignSystem(data) {
        document.documentElement.setAttribute(DesignSystemConstants.DataAttributeColorScheme, data.colorScheme);
        document.documentElement.setAttribute(DesignSystemConstants.DataAttributePrimaryColor, data.primaryColor);
    }
    /**
     * Читает данные дизайн-системы интерфейса со страницы
     * @returns Данные дизайн-системы или undefined
     */
    static getDocumentDesignSystem() {
        const colorScheme = document.documentElement.getAttribute(DesignSystemConstants.DataAttributeColorScheme);
        const primaryColor = document.documentElement.getAttribute(DesignSystemConstants.DataAttributePrimaryColor);
        if (colorScheme && primaryColor) {
            return { colorScheme: colorScheme, primaryColor: primaryColor };
        }
        return undefined;
    }
    // #endregion
    // #region Load/Save
    /**
     * Загрузка данных дизайн-системы из локального хранилища
     * @param key Ключ
     * @returns Данные дизайн-системы или undefined
     */
    static loadFromStorage(key) {
        if (key) {
            const value = localStorage.getItem(key);
            if (value) {
                return JSON.parse(value);
            }
            else {
                return undefined;
            }
        }
        return undefined;
    }
    /**
     * Сохранение данных дизайн-системы в локальное хранилище
     * @param key Ключ
     * @param data Данные дизайн-системы
     */
    static saveToStorage(key, data) {
        if (key) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }
}
//# sourceMappingURL=DesignSystemHelper.js.map