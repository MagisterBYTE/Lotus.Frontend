/**
 * Проверка на наличие любой свойства из границ элемента UI
 * @param borderStyle Тип стиля границы
 * @param borderWidth Ширина границы
 * @param borderColor Цвет границы
 */
export function hasBorderProperties(borderStyle, borderWidth, borderColor) {
    return !!borderStyle || !!borderWidth || !!borderColor;
}
/**
 * Проверка на наличие любой свойства из границ элемента UI
 * @param borderProps Общие свойства для границы элемента UI
 */
export function hasBorderProps(borderProps) {
    return (!!borderProps.borderStyle ||
        !!borderProps.borderWidth ||
        !!borderProps.borderColor ||
        !!borderProps.borderRadius ||
        !!borderProps.borderRadiusBottomLeft ||
        !!borderProps.borderRadiusBottomRight ||
        !!borderProps.borderRadiusTopLeft ||
        !!borderProps.borderRadiusTopRight);
}
/**
 * Проверка на наличие полных свойства радиуса из границ элемента UI
 * @param borderProps Общие свойства для границы элемента UI
 */
export function hasNonShorthandBorderRadiusProps(borderProps) {
    return (!!borderProps.borderRadiusBottomLeft || !!borderProps.borderRadiusBottomRight || !!borderProps.borderRadiusTopLeft || !!borderProps.borderRadiusTopRight);
}
//# sourceMappingURL=GeneralBorderProperties.js.map