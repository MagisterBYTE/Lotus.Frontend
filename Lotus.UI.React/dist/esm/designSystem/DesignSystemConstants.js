/**
 * Константы дизайн-системы
 */
export class DesignSystemConstants {
    /**
     * Ключ под которым сохраняется тема сайта
     */
    static SaveKey = 'lotus-design-system';
    /**
     * Названия атрибута в документа под которым сохраняется цветовая схема сайта
     */
    static DataAttributeColorScheme = 'data-lotus-color-scheme';
    /**
     * Названия атрибута в документа под которым сохраняется основной цвет сайта
     */
    static DataAttributePrimaryColor = 'data-lotus-primary-color';
    //
    // ШРИФТ
    //
    /**
     * Шрифт по умолчанию
     */
    static FontDefault = 'Verdana, Geneva, Tahoma, sans-serif';
    /**
     * Шрифт для акцента
     */
    static FontAccent = 'Arial, Helvetica, sans-serif';
    /**
     * Моноширинный шрифт
     */
    static FontMonospace = 'Consolas, Courier New';
    //
    // Transition
    //
    /**
     * Скорость переходов анимации/состояния, в миллисекундах
     */
    static TransitionSpeed = 400;
    /**
     * Скорость переходов анимации/состояния, в миллисекундах
     */
    static TransitionSpeedFast = 250;
    //
    // Opacity
    //
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
}
//# sourceMappingURL=DesignSystemConstants.js.map