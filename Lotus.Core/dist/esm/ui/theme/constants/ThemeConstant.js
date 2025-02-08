/**
 * Набор констант для темы
 */
export class ThemeConstant {
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
     * Прозрачность тени для границы элементов UI которые при наведении
     */
    static OpacityForBorderShadowHover = 0.2;
    /**
     * Прозрачность тени для границы элементов UI которые при активном состоянии
     */
    static OpacityForBorderShadowActive = 0.4;
}
