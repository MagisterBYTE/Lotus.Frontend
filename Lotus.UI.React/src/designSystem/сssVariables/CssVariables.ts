
/**
 * Класс для определения всех доступных переменных css дизайн-системы
 */
export abstract class CssVariables
{
  /**
   * Регулярное выражение для извлечения имени переменной css
   */
  public static readonly RegExtractName:RegExp = /--[\w-]+/;

  //
  // РАЗМЕРЫ ШРИФТА
  //
  public static readonly FontSizeXXS = 'var(--lotus-font-size-xxs)'; 
  public static readonly FontSizeXS = 'var(--lotus-font-size-xs)'; 
  public static readonly FontSizeSM = 'var(--lotus-font-size-sm)'; 
  public static readonly FontSizeMD = 'var(--lotus-font-size-md)'; 
  public static readonly FontSizeLG = 'var(--lotus-font-size-lg)'; 
  public static readonly FontSizeXL = 'var(--lotus-font-size-xl)'; 
  public static readonly FontSizeXXL = 'var(--lotus-font-size-xxl)'; 

  //
  // РАЗМЕРЫ ИНТЕРВАЛА
  //
  public static readonly GapSizeXXS = 'var(--lotus-gap-size-xxs)'; 
  public static readonly GapSizeXS = 'var(--lotus-gap-size-xs)'; 
  public static readonly GapSizeSM = 'var(--lotus-gap-size-sm)'; 
  public static readonly GapSizeMD = 'var(--lotus-gap-size-md)'; 
  public static readonly GapSizeLG = 'var(--lotus-gap-size-lg)'; 
  public static readonly GapSizeXL = 'var(--lotus-gap-size-xl)'; 
  public static readonly GapSizeXXL = 'var(--lotus-gap-size-xxl)'; 

  //
  // РАЗМЕРЫ ВНЕШНЕГО ОТСТУПА
  //
  public static readonly MarginSizeXXS = 'var(--lotus-margin-size-xxs)'; 
  public static readonly MarginSizeXS = 'var(--lotus-margin-size-xs)'; 
  public static readonly MarginSizeSM = 'var(--lotus-margin-size-sm)'; 
  public static readonly MarginSizeMD = 'var(--lotus-margin-size-md)'; 
  public static readonly MarginSizeLG = 'var(--lotus-margin-size-lg)'; 
  public static readonly MarginSizeXL = 'var(--lotus-margin-size-xl)'; 
  public static readonly MarginSizeXXL = 'var(--lotus-margin-size-xxl)'; 

  //
  // РАЗМЕРЫ ВНУТРЕННЕГО ОТСТУПА
  //
  public static readonly PaddingSizeXXS = 'var(--lotus-padding-size-xxs)'; 
  public static readonly PaddingSizeXS = 'var(--lotus-padding-size-xs)'; 
  public static readonly PaddingSizeSM = 'var(--lotus-padding-size-sm)'; 
  public static readonly PaddingSizeMD = 'var(--lotus-padding-size-md)'; 
  public static readonly PaddingSizeLG = 'var(--lotus-padding-size-lg)'; 
  public static readonly PaddingSizeXL = 'var(--lotus-padding-size-xl)'; 
  public static readonly PaddingSizeXXL = 'var(--lotus-padding-size-xxl)'; 

  //
  // РАЗМЕРЫ МЕЖСТРОЧНОГО ИНТЕРВАЛА
  //
  public static readonly LineSpacingSizeXXS = 'var(--lotus-line-spacing-size-xxs)'; 
  public static readonly LineSpacingSizeXS = 'var(--lotus-line-spacing-size-xs)'; 
  public static readonly LineSpacingSizeSM = 'var(--lotus-line-spacing-size-sm)'; 
  public static readonly LineSpacingSizeMD = 'var(--lotus-line-spacing-size-md)'; 
  public static readonly LineSpacingSizeLG = 'var(--lotus-line-spacing-size-lg)'; 
  public static readonly LineSpacingSizeXL = 'var(--lotus-line-spacing-size-xl)'; 
  public static readonly LineSpacingSizeXXL = 'var(--lotus-line-spacing-size-xxl)'; 

  //
  // РАЗМЕРЫ РАДИУСА ЗАКРУГЛЕНИЯ 
  //
  public static readonly RadiusSizeXXS = 'var(--lotus-radius-size-xxs)'; 
  public static readonly RadiusSizeXS = 'var(--lotus-radius-size-xs)'; 
  public static readonly RadiusSizeSM = 'var(--lotus-radius-size-sm)'; 
  public static readonly RadiusSizeMD = 'var(--lotus-radius-size-md)'; 
  public static readonly RadiusSizeLG = 'var(--lotus-radius-size-lg)'; 
  public static readonly RadiusSizeXL = 'var(--lotus-radius-size-xl)'; 
  public static readonly RadiusSizeXXL = 'var(--lotus-radius-size-xxl)'; 

  //
  // ГРАНИЦА
  //
  /**
   * Радиус скругления границы по умолчанию
   */
  public static readonly BorderRadius = 'var(--lotus-border-radius)'; 

  /**
   * Толщина границы по умолчанию
   */
  public static readonly BorderWidth = 'var(--lotus-border-width)';

  /**
   * Цвет границы по умолчанию, зависит от темы
   */
  public static readonly BorderColor = 'var(--lotus-border-color)'; 

  /**
   * Цвет тени границы по умолчанию, зависит от темы
   */
  public static readonly BorderShadowColor = 'var(--lotus-border-shadow-color)'; 

  //
  // ШРИФТ
  //
  /**
   * Основной шрифт
   */
  public static readonly FontFamily = 'var(--lotus-font-family-normal)'; 

  /**
   * Моноширинный шрифт
   */
  public static readonly FontFamilyMonospace = 'var(--lotus-font-family-monospace)'; 

  /**
   * Шрифт для акцента данных
   */
  public static readonly FontFamilyAccent = 'var(--lotus-font-family-accent)'; 

  //
  // ТЕКСТ
  //
  public static readonly TextColor = 'var(--lotus-text-color)'; 

  //
  // ФОН
  //
  public static readonly BackgroundColor = 'var(--lotus-background-color)'; 

  //
  // ОСНОВНОЙ ЦВЕТ
  //
  public static readonly PrimaryColor0 = 'var(--lotus-primary-color-0)'; 
  public static readonly PrimaryColor1 = 'var(--lotus-primary-color-1)'; 
  public static readonly PrimaryColor2 = 'var(--lotus-primary-color-2)'; 
  public static readonly PrimaryColor3 = 'var(--lotus-primary-color-3)'; 
  public static readonly PrimaryColor4 = 'var(--lotus-primary-color-4)'; 
  public static readonly PrimaryColor5 = 'var(--lotus-primary-color-5)'; 
  public static readonly PrimaryColor6 = 'var(--lotus-primary-color-6)'; 
  public static readonly PrimaryColor7 = 'var(--lotus-primary-color-7)'; 
  public static readonly PrimaryColor8 = 'var(--lotus-primary-color-8)'; 
  public static readonly PrimaryColor9 = 'var(--lotus-primary-color-9)'; 
}