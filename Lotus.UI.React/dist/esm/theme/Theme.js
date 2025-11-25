import { Colors } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { ThemeColorPalettes } from '#theme/constants';
import { createThemeColor, deconstructionThemeColor } from './types';
/**
 * Тема приложения
 */
export class Theme {
    // #region Const
    /**
     * Ключ под которым сохраняется тема сайта
     */
    static SaveKey = 'lotus-core-theme';
    /**
     * Названия атрибута в документа под которым сохраняется тема сайта
     */
    static DataAttributeThemeMode = 'data-theme';
    /**
     * Названия атрибута в документа под которым сохраняется цвет темы сайта
     */
    static DataAttributeThemeColor = 'data-color';
    /**
     * Шрифт по умолчанию
     */
    static FontDefault = 'Verdana, Geneva, Tahoma, sans-serif';
    /**
     * Шрифт для акцента
     */
    static FontAccent = 'Arial, Helvetica, sans-serif';
    /**
     * Скорость переходов анимации/состояния, в миллисекундах
     */
    static TransitionSpeed = 400;
    /**
     * Скорость переходов анимации/состояния, в миллисекундах
     */
    static TransitionSpeedFast = 250;
    /**
     * Прозрачность для элементов UI которые недоступны
     */
    static OpacityForDisabled = 0.65;
    /**
     * Прозрачность тени для границы элементов UI которые при наведении
     */
    static OpacityForBorderShadowHover = 0.2;
    /**
     * Прозрачность тени для границы элементов UI которые при активном состоянии
     */
    static OpacityForBorderShadowActive = 0.4;
    // #endregion
    // #region Static fields
    static _Instance;
    static get Instance() {
        return this._Instance || (this._Instance = new this());
    }
    // #endregion
    // #region Static properties
    // #endregion
    // #region Fields
    _currentPalette;
    _currentColor;
    // #endregion
    // #region Properties
    /**
     * Получить текущую палитру цвета
     */
    get currentPalette() {
        if (this._currentPalette)
            return this._currentPalette;
        return ThemeColorPalettes.Palettes['light'];
    }
    /**
     * Установить текущую палитру цвета
     */
    set currentPalette(palette) {
        this._currentPalette = palette;
    }
    /**
     * Получить основной цвет
     */
    get currentColor() {
        if (this._currentColor)
            return this._currentColor;
        return 'blue';
    }
    /**
     * Установить основной цвет
     */
    set currentColor(themePaletteColor) {
        this._currentColor = themePaletteColor;
    }
    // #endregion
    constructor() {
        this._currentPalette = ThemeColorPalettes.Palettes['light'];
        this._currentColor = 'blue';
    }
    // #region Color methods
    /**
     * Получить степень прозрачности
     * @param actionType Тип действия
     */
    getOpacity(actionType) {
        let opacity = undefined;
        if (actionType) {
            switch (actionType) {
                case 'active':
                    opacity = this.currentPalette.action.activatedOpacity;
                    break;
                case 'hover':
                    opacity = this.currentPalette.action.hoverOpacity;
                    break;
                case 'selected':
                    opacity = this.currentPalette.action.selectedOpacity;
                    break;
                case 'disabled':
                    opacity = this.currentPalette.action.disabledOpacity;
                    break;
                case 'focus':
                    opacity = this.currentPalette.action.focusOpacity;
                    break;
            }
        }
        return opacity;
    }
    /**
     * Получить палитру цвета
     * @param color Доступный цвет темы
     */
    getPaletteColor(color) {
        const colorData = deconstructionThemeColor(color);
        if (!colorData)
            return;
        const palette = Assert.existValue(colorData.colorPalette)
            ? this.currentPalette.colors[colorData.colorPalette]
            : this.currentPalette.colors[colorData.colorSemantic];
        return palette;
    }
    /**
     * Получить цвет текущей темы
     * @param color Доступный цвет темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    getElementColor(color, actionType) {
        const colorData = deconstructionThemeColor(color);
        if (!colorData)
            return Colors.red;
        const palette = Assert.existValue(colorData.colorPalette)
            ? this.currentPalette.colors[colorData.colorPalette]
            : this.currentPalette.colors[colorData.colorSemantic];
        return palette.variants.getByName(colorData.colorVariant, this.getOpacity(actionType));
    }
    /**
     * Получить цвет текста текущей темы
     * @param color Доступный цвет темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    getTextColor(color, actionType) {
        const colorData = deconstructionThemeColor(color);
        if (!colorData)
            return Colors.red;
        let opacity = undefined;
        if (actionType) {
            switch (actionType) {
                case 'active':
                    opacity = this.currentPalette.action.activatedOpacity;
                    break;
                case 'hover':
                    opacity = this.currentPalette.action.hoverOpacity;
                    break;
                case 'selected':
                    opacity = this.currentPalette.action.selectedOpacity;
                    break;
                case 'disabled':
                    opacity = this.currentPalette.text.disabledOpacity;
                    break;
                case 'focus':
                    opacity = this.currentPalette.action.focusOpacity;
                    break;
            }
        }
        // Если указан семантический цвет
        if (colorData.colorSemantic) {
            // Специальные цвета
            if (colorData.colorSemantic == 'primary') {
                return this.currentPalette.text.primary.toModifyAlphaOrThis(opacity);
            }
            if (colorData.colorSemantic == 'secondary') {
                return this.currentPalette.text.secondary.toModifyAlphaOrThis(opacity);
            }
            // Остальные берем из темы
            const palette = this.currentPalette.colors[colorData.colorSemantic];
            return palette.variants.getByName('main', opacity);
        }
        else if (colorData.colorPalette) {
            // Берем из темы
            const palette = this.currentPalette.colors[colorData.colorPalette];
            // Если есть вариант то берем его
            if (colorData.colorVariant) {
                return palette.variants.getByName(colorData.colorVariant, opacity);
            }
            else {
                return palette.variants.getByName('main', opacity);
            }
        }
        return Colors.red;
    }
    /**
     * Получить цвет фона текущей темы
     * @param color Доступный цвет темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    getBackgroundColor(color, actionType) {
        const colorData = deconstructionThemeColor(color);
        if (!colorData)
            return Colors.red;
        let opacity = undefined;
        if (actionType) {
            switch (actionType) {
                case 'active':
                    opacity = this.currentPalette.action.activatedOpacity;
                    break;
                case 'hover':
                    opacity = this.currentPalette.action.hoverOpacity;
                    break;
                case 'selected':
                    opacity = this.currentPalette.action.selectedOpacity;
                    break;
                case 'disabled':
                    opacity = this.currentPalette.background.disabledOpacity;
                    break;
                case 'focus':
                    opacity = this.currentPalette.action.focusOpacity;
                    break;
            }
        }
        // Если указан семантический цвет
        if (colorData.colorSemantic) {
            // Специальные цвета
            if (colorData.colorSemantic == 'primary') {
                return this.currentPalette.background.default.toModifyAlphaOrThis(opacity);
            }
            if (colorData.colorSemantic == 'secondary') {
                return this.currentPalette.background.secondary.toModifyAlphaOrThis(opacity);
            }
            // Остальные берем из темы
            const palette = this.currentPalette.colors[colorData.colorSemantic];
            return palette.variants.getByName(colorData.colorVariant ?? 'main', opacity);
        }
        else if (colorData.colorPalette) {
            // Берем из темы
            const palette = this.currentPalette.colors[colorData.colorPalette];
            // Если есть вариант то берем его
            return palette.variants.getByName(colorData.colorVariant ?? 'main', opacity);
        }
        return Colors.red;
    }
    /**
     * Получить цвет границы текущей темы
     * @param color Доступный цвет темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    getBorderColor(color, actionType) {
        const colorData = deconstructionThemeColor(color);
        if (!colorData)
            return Colors.red;
        let opacity = undefined;
        if (actionType) {
            switch (actionType) {
                case 'active':
                    opacity = this.currentPalette.action.activatedOpacity;
                    break;
                case 'hover':
                    opacity = this.currentPalette.action.hoverOpacity;
                    break;
                case 'selected':
                    opacity = this.currentPalette.action.selectedOpacity;
                    break;
                case 'disabled':
                    opacity = this.currentPalette.border.disabledOpacity;
                    break;
                case 'focus':
                    opacity = this.currentPalette.action.focusOpacity;
                    break;
            }
        }
        // Если указан семантический цвет
        if (colorData.colorSemantic) {
            // Специальные цвета
            if (colorData.colorSemantic == 'primary') {
                return this.currentPalette.border.primary.toModifyAlphaOrThis(opacity);
            }
            if (colorData.colorSemantic == 'secondary') {
                return this.currentPalette.border.secondary.toModifyAlphaOrThis(opacity);
            }
            // Остальные берем из темы
            const palette = this.currentPalette.colors[colorData.colorSemantic];
            return palette.variants.getByName('main', opacity);
        }
        else if (colorData.colorPalette) {
            // Берем из темы
            const palette = this.currentPalette.colors[colorData.colorPalette];
            // Если есть вариант то берем его
            if (colorData.colorVariant) {
                return palette.variants.getByName(colorData.colorVariant, opacity);
            }
            else {
                return palette.variants.getByName('main', opacity);
            }
        }
        return Colors.red;
    }
    /**
     * Получить цвет текущей темы для указанной структурной части элемента
     * @param part Структурная часть UI
     * @param color Доступный цвет темы
     * @param actionType Тип действия
     * @returns Цвет
     */
    getColorByStructuralPart(part, color, actionType) {
        switch (part) {
            case 'element':
                return this.getElementColor(color, actionType);
            case 'background':
                return this.getBackgroundColor(color, actionType);
            case 'text':
                return this.getTextColor(color, actionType);
            case 'border':
                return this.getBorderColor(color, actionType);
        }
        return Colors.red;
    }
    getColorInfoHSL(colorTheme, colorVariant) {
        const color = this.getElementColor(createThemeColor(colorTheme, colorVariant));
        const hsl = color.getHSL();
        return `h=${hsl.h.toFixed(3)}, s=${hsl.s.toFixed(3)}, l=${hsl.l.toFixed(3)}`;
    }
    // #endregion
    // #region Load/Save
    /**
     * Загрузка темы из локального хранилища
     * @returns Данные текущей темы данные по умолчанию
     */
    loadFromStorage() {
        const value = localStorage.getItem(Theme.SaveKey);
        if (value) {
            return JSON.parse(value);
        }
        else {
            return { mode: 'light', color: 'blue' };
        }
    }
    /**
     * Сохранение темы в локальное хранилище
     * @param theme Тема
     */
    saveToStorage(theme) {
        localStorage.setItem(Theme.SaveKey, JSON.stringify(theme));
    }
}
export const ThemeInstance = Theme.Instance;
//# sourceMappingURL=Theme.js.map