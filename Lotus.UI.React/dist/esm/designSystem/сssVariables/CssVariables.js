/**
 * Класс для определения всех доступных переменных css дизайн-системы
 */
export class CssVariables {
    /**
     * Регулярное выражение для извлечения имени переменной css
     */
    static RegExtractName = /--[\w-]+/;
    //
    // РАЗМЕРЫ ШРИФТА
    //
    static FontSizeXXS = 'var(--lotus-font-size-xxs)';
    static FontSizeXS = 'var(--lotus-font-size-xs)';
    static FontSizeSM = 'var(--lotus-font-size-sm)';
    static FontSizeMD = 'var(--lotus-font-size-md)';
    static FontSizeLG = 'var(--lotus-font-size-lg)';
    static FontSizeXL = 'var(--lotus-font-size-xl)';
    static FontSizeXXL = 'var(--lotus-font-size-xxl)';
    //
    // РАЗМЕРЫ ИНТЕРВАЛА
    //
    static GapSizeXXS = 'var(--lotus-gap-size-xxs)';
    static GapSizeXS = 'var(--lotus-gap-size-xs)';
    static GapSizeSM = 'var(--lotus-gap-size-sm)';
    static GapSizeMD = 'var(--lotus-gap-size-md)';
    static GapSizeLG = 'var(--lotus-gap-size-lg)';
    static GapSizeXL = 'var(--lotus-gap-size-xl)';
    static GapSizeXXL = 'var(--lotus-gap-size-xxl)';
    //
    // РАЗМЕРЫ ВНЕШНЕГО ОТСТУПА
    //
    static MarginSizeXXS = 'var(--lotus-margin-size-xxs)';
    static MarginSizeXS = 'var(--lotus-margin-size-xs)';
    static MarginSizeSM = 'var(--lotus-margin-size-sm)';
    static MarginSizeMD = 'var(--lotus-margin-size-md)';
    static MarginSizeLG = 'var(--lotus-margin-size-lg)';
    static MarginSizeXL = 'var(--lotus-margin-size-xl)';
    static MarginSizeXXL = 'var(--lotus-margin-size-xxl)';
    //
    // РАЗМЕРЫ ВНУТРЕННЕГО ОТСТУПА
    //
    static PaddingSizeXXS = 'var(--lotus-padding-size-xxs)';
    static PaddingSizeXS = 'var(--lotus-padding-size-xs)';
    static PaddingSizeSM = 'var(--lotus-padding-size-sm)';
    static PaddingSizeMD = 'var(--lotus-padding-size-md)';
    static PaddingSizeLG = 'var(--lotus-padding-size-lg)';
    static PaddingSizeXL = 'var(--lotus-padding-size-xl)';
    static PaddingSizeXXL = 'var(--lotus-padding-size-xxl)';
    //
    // РАЗМЕРЫ МЕЖСТРОЧНОГО ИНТЕРВАЛА
    //
    static LineSpacingSizeXXS = 'var(--lotus-line-spacing-size-xxs)';
    static LineSpacingSizeXS = 'var(--lotus-line-spacing-size-xs)';
    static LineSpacingSizeSM = 'var(--lotus-line-spacing-size-sm)';
    static LineSpacingSizeMD = 'var(--lotus-line-spacing-size-md)';
    static LineSpacingSizeLG = 'var(--lotus-line-spacing-size-lg)';
    static LineSpacingSizeXL = 'var(--lotus-line-spacing-size-xl)';
    static LineSpacingSizeXXL = 'var(--lotus-line-spacing-size-xxl)';
    //
    // РАЗМЕРЫ РАДИУСА ЗАКРУГЛЕНИЯ 
    //
    static RadiusSizeXXS = 'var(--lotus-radius-size-xxs)';
    static RadiusSizeXS = 'var(--lotus-radius-size-xs)';
    static RadiusSizeSM = 'var(--lotus-radius-size-sm)';
    static RadiusSizeMD = 'var(--lotus-radius-size-md)';
    static RadiusSizeLG = 'var(--lotus-radius-size-lg)';
    static RadiusSizeXL = 'var(--lotus-radius-size-xl)';
    static RadiusSizeXXL = 'var(--lotus-radius-size-xxl)';
    //
    // ГРАНИЦА
    //
    /**
     * Радиус скругления границы по умолчанию
     */
    static BorderRadius = 'var(--lotus-border-radius)';
    /**
     * Толщина границы по умолчанию
     */
    static BorderWidth = 'var(--lotus-border-width)';
    /**
     * Цвет границы по умолчанию, зависит от темы
     */
    static BorderColor = 'var(--lotus-border-color)';
    /**
     * Цвет тени границы по умолчанию, зависит от темы
     */
    static BorderShadowColor = 'var(--lotus-border-shadow-color)';
    //
    // ШРИФТ
    //
    /**
     * Основной шрифт
     */
    static FontFamily = 'var(--lotus-font-family-normal)';
    /**
     * Моноширинный шрифт
     */
    static FontFamilyMonospace = 'var(--lotus-font-family-monospace)';
    /**
     * Шрифт для акцента данных
     */
    static FontFamilyAccent = 'var(--lotus-font-family-accent)';
    //
    // ТЕКСТ
    //
    static TextColor = 'var(--lotus-text-color)';
    //
    // ФОН
    //
    static BackgroundColor = 'var(--lotus-background-color)';
    //
    // ОСНОВНОЙ ЦВЕТ
    //
    static PrimaryColor0 = 'var(--lotus-primary-color-0)';
    static PrimaryColor1 = 'var(--lotus-primary-color-1)';
    static PrimaryColor2 = 'var(--lotus-primary-color-2)';
    static PrimaryColor3 = 'var(--lotus-primary-color-3)';
    static PrimaryColor4 = 'var(--lotus-primary-color-4)';
    static PrimaryColor5 = 'var(--lotus-primary-color-5)';
    static PrimaryColor6 = 'var(--lotus-primary-color-6)';
    static PrimaryColor7 = 'var(--lotus-primary-color-7)';
    static PrimaryColor8 = 'var(--lotus-primary-color-8)';
    static PrimaryColor9 = 'var(--lotus-primary-color-9)';
}
//# sourceMappingURL=CssVariables.js.map