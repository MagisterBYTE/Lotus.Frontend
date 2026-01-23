import { BackgroundDesignSystem } from './background';
import { BorderDesignSystem } from './border';
import { ColorDesignSystem } from './colors';
import { FontDesignSystem } from './font';
import { FontSizes, GapSizes, LineSpacingSizes, MarginSizes, PaddingSizes, RadiusSizes } from './sizes';
import { TextDesignSystem } from './text';
import { TColorScheme } from './types';

/**
 * Дизайн система представляет собой совокупность визуальных настроек
 */
export interface IDesignSystem
{
  /**
   * Текущая цветовая схема
   */
  colorScheme: TColorScheme;

  //
  // РАЗМЕРЫ
  //
  /**
   * Размеры связанные со шрифтами
   */
  fontSizes: FontSizes;

  /**
   * Размеры связанные с межстрочным интервалом
   */
  lineSpacingSizes: LineSpacingSizes;

  /**
   * Размеры связанные с внутренним отступом
   */
  marginSizes: MarginSizes;

  /**
   * Размеры связанные с внешним отступом
   */
  paddingSizes: PaddingSizes;

  /**
   * Размеры связанные с расстоянием между элементами
   */
  gapSizes: GapSizes;

  /**
   * Размеры связанные с радиусом закругления
   */
  radiusSizes: RadiusSizes;

  //
  // ШРИФТ
  //
  /**
   * Определение данных дизайн-системы для шрифтов
   */
  font: FontDesignSystem;

  //
  // ГРАНИЦА
  //
  /**
   * Определение данных дизайн-системы для границы
   */
  border: BorderDesignSystem;

  //
  // ТЕКСТ
  //
  /**
   * Определение данных дизайн-системы для текста
   */
  text: TextDesignSystem;

  //
  // ФОН
  //
  /**
   * Определение данных дизайн-системы для фона
   */
  background: BackgroundDesignSystem;

  //
  // ЦВЕТА
  //
  /**
   * Набор цветов с учетом вариативности без привязки к цветовой схеме
   */
  colors: ColorDesignSystem;
}

/**
 * Дизайн-система представляет собой совокупность визуальных настроек
 */
export class DesignSystem implements IDesignSystem
{
  // #region Fields
  /**
   * Текущая цветовая схема
   */
  public colorScheme: TColorScheme;

  //
  // РАЗМЕРЫ
  //
  /**
   * Размеры связанные со шрифтами
   */
  public fontSizes: FontSizes;

  /**
   * Размеры связанные с межстрочным интервалом
   */
  public lineSpacingSizes: LineSpacingSizes;

  /**
   * Размеры связанные с внутренним отступом
   */
  public marginSizes: MarginSizes;

  /**
   * Размеры связанные с внешним отступом
   */
  public paddingSizes: PaddingSizes;

  /**
   * Размеры связанные с расстоянием между элементами
   */
  public gapSizes: GapSizes;

  /**
   * Размеры связанные с радиусом закругления
   */
  public radiusSizes: RadiusSizes;

  //
  // ШРИФТ
  //
  /**
   * Определение данных дизайн-системы для шрифтов
   */
  public font: FontDesignSystem;

  //
  // ГРАНИЦА
  //
  /**
   * Определение данных дизайн-системы для границы
   */
  public border: BorderDesignSystem;

  //
  // ТЕКСТ
  //
  /**
   * Определение данных дизайн-системы для текста
   */
  public text: TextDesignSystem;

  //
  // ФОН
  //
  /**
   * Определение данных дизайн-системы для фона
   */
  public background: BackgroundDesignSystem;

  //
  // ЦВЕТА
  //
  /**
   * Набор цветов с учетом вариативности без привязки к цветовой схеме
   */
  public colors: ColorDesignSystem;
  // #endregion

  // eslint-disable-next-line complexity
  constructor(props?: Partial<IDesignSystem>, colorScheme?: TColorScheme)
  {
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
  public applyToCssVariable(): void
  {
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
