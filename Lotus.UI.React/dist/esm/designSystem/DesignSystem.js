import { BackgroundDesignSystem } from './background';
import { BorderDesignSystem } from './border';
import { ColorDesignSystem } from './colors';
import { FontDesignSystem } from './font';
import { FontSizes, GapSizes, LineSpacingSizes, MarginSizes, PaddingSizes, RadiusSizes } from './sizes';
import { TextDesignSystem } from './text';
/**
 * Дизайн-система представляет собой совокупность визуальных настроек
 */
export class DesignSystem {
    // #region Fields
    /**
     * Текущая цветовая схема
     */
    colorScheme;
    //
    // РАЗМЕРЫ
    //
    /**
     * Размеры связанные со шрифтами
     */
    fontSizes;
    /**
     * Размеры связанные с межстрочным интервалом
     */
    lineSpacingSizes;
    /**
     * Размеры связанные с внутренним отступом
     */
    marginSizes;
    /**
     * Размеры связанные с внешним отступом
     */
    paddingSizes;
    /**
     * Размеры связанные с расстоянием между элементами
     */
    gapSizes;
    /**
     * Размеры связанные с радиусом закругления
     */
    radiusSizes;
    //
    // ШРИФТ
    //
    /**
     * Определение данных дизайн-системы для шрифтов
     */
    font;
    //
    // ГРАНИЦА
    //
    /**
     * Определение данных дизайн-системы для границы
     */
    border;
    //
    // ТЕКСТ
    //
    /**
     * Определение данных дизайн-системы для текста
     */
    text;
    //
    // ФОН
    //
    /**
     * Определение данных дизайн-системы для фона
     */
    background;
    //
    // ЦВЕТА
    //
    /**
     * Набор цветов с учетом вариативности без привязки к цветовой схеме
     */
    colors;
    // #endregion
    // eslint-disable-next-line complexity
    constructor(props, colorScheme) {
        this.colorScheme = colorScheme ?? 'light';
        //
        // РАЗМЕРЫ
        //
        this.fontSizes = props?.fontSizes ?? FontSizes.Default;
        this.lineSpacingSizes = props?.lineSpacingSizes ?? LineSpacingSizes.Default;
        this.marginSizes = props?.marginSizes ?? MarginSizes.Default;
        this.paddingSizes = props?.paddingSizes ?? PaddingSizes.Default;
        this.gapSizes = props?.gapSizes ?? GapSizes.Default;
        this.radiusSizes = props?.radiusSizes ?? RadiusSizes.Default;
        //
        // ШРИФТ
        //
        this.font = props?.font ?? FontDesignSystem.Default;
        //
        // ГРАНИЦА
        //
        const borderDark = BorderDesignSystem.DarkDefault;
        const borderLight = BorderDesignSystem.LightDefault;
        this.border = props?.border ?? (colorScheme == 'light' ? borderLight : borderDark);
        //
        // ТЕКСТ
        //
        this.text = props?.text ?? (colorScheme == 'light' ? TextDesignSystem.LightDefault : TextDesignSystem.DarkDefault);
        //
        // ФОН
        //
        this.background = props?.background ?? (colorScheme == 'light' ? BackgroundDesignSystem.LightDefault : BackgroundDesignSystem.DarkDefault);
        //
        // ЦВЕТА
        //
        this.colors = props?.colors ?? (colorScheme == 'light' ? ColorDesignSystem.LightDefault : ColorDesignSystem.DarkDefault);
    }
    /**
     * Применить текущие значения элементов дизайн-системы к соответствующим переменным Css. Смотреть класс {@link CssVariables}
     */
    applyToCssVariable() {
        this.fontSizes.applyToCssVariable();
        this.lineSpacingSizes.applyToCssVariable();
        this.marginSizes.applyToCssVariable();
        this.paddingSizes.applyToCssVariable();
        this.gapSizes.applyToCssVariable();
        this.radiusSizes.applyToCssVariable();
        this.font.applyToCssVariable();
        this.border.applyToCssVariable();
        this.text.applyToCssVariable();
        this.background.applyToCssVariable();
        this.colors.applyToCssVariable();
    }
}
//# sourceMappingURL=DesignSystem.js.map