import { Property, Properties } from 'csstype';
/**
 * Все свойства Css
 */
export type TCssProperties = Properties<string | number>;
/**
 * Тип свойства - ширина Css
 */
export type TCssWidth = Property.Width<number | string>;
/**
 * Тип свойства высота Css
 */
export type TCssHeight = Property.Height<number | string>;
/**
 * Тип свойства внутреннего отступа Css
 */
export type TCssPadding = Property.Padding;
/**
 * Тип свойства внешнего отступа Css
 */
export type TCssMargin = Property.Margin;
/**
 * Тип свойства размер шрифта Css
 */
export type TCssFontSize = Property.FontSize<number | string>;
/**
 * Тип свойства вес шрифта Css
 */
export type TCssFontWeight = Property.FontWeight;
/**
 * Тип свойства семейства шрифта Css
 */
export type TCssFontFamily = Property.FontFamily;
/**
 * Тип свойства стиля границы Css
 */
export type TCssBorderStyle = 'solid' | 'inset' | 'outset' | 'double' | 'groove' | 'ridge' | 'dotted';
export declare const TCssBorderStyles: readonly TCssBorderStyle[];
/**
 * Тип свойства ширины границы Css
 */
export type TCssBorderWidth = Property.BorderWidth;
/**
 * Тип свойства радиуса скругления границы Css
 */
export type TCssBorderRadius = Property.BorderRadius;
/**
 * Тип свойства цвета границы Css
 */
export type TCssBorderColor = Property.BorderColor;
/**
 * Тип свойства трансформации Css
 */
export type TCssTransform = Property.Transform;
/**
 * Тип свойства выравнивания текста Css
 */
export type TCssTextAlign = Property.TextAlign;
/**
 * Тип свойства межстрочного интервала текста Css
 */
export type TCssLineHeight = Property.LineHeight;
/**
 * Тип свойства тени границы Css
 */
export type TCssBoxShadow = Property.BoxShadow;
/**
 * Тип свойства основного цвета Css
 */
export type TCssColor = Property.Color;
/**
 * Тип свойства фонового цвета Css
 */
export type TCssBackgroundColor = Property.BackgroundColor;
/**
 * Тип свойства фонового изображения Css
 */
export type TCssBackgroundImage = Property.BackgroundImage;
/**
 * Тип свойства выравнивания контента по основной оси Css
 */
export type TCssJustifyContent = Property.JustifyContent;
/**
 * Тип свойства выравнивания дочернего контента по основной оси Css
 */
export type TCssJustifyItems = Property.JustifyItems;
/**
 * Тип свойства выравнивания контента по второстепенной оси Css
 */
export type TCssAlignContent = Property.AlignContent;
/**
 * Тип свойства выравнивания дочернего контента по второстепенной оси Css
 */
export type TCssAlignItems = Property.AlignItems;
export declare const TCssContentAligns: TCssJustifyContent | TCssAlignItems[];
/**
 * Тип свойства промежутка Css
 */
export type TCssGap = Property.Gap;
/**
 * Тип свойства коэффициента растяжения Css
 */
export type TCssFlexGrow = Property.FlexGrow;
/**
 * Тип свойства коэффициента сжатия Css
 */
export type TCssFlexShrink = Property.FlexShrink;
/**
 * Тип свойства шаблона колонок сетки
 */
export type TCssGridTemplateColumns = Property.GridTemplateColumns;
/**
 * Тип свойства шаблона строк сетки
 */
export type TCssGridTemplateRows = Property.GridTemplateRows;
/**
 * Тип свойства названия/индекса колонки сетки
 */
export type TCssGridColumn = Property.GridColumn;
/**
 * Тип свойства названия/индекса строки сетки
 */
export type TCssGridRow = Property.GridRow;
//# sourceMappingURL=CssTypes.d.ts.map