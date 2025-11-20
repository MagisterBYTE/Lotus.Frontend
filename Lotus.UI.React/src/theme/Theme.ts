import { ThemeColorPalettes } from '#theme/constants';
import { Color, Colors, TColorSemantic, TColorVariantName } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import
  {
    createThemeColor,
    deconstructionThemeColor,
    IThemePalette,
    IThemePaletteColor,
    TThemeColor,
    TThemeColorPalette,
    TThemeData,
    TThemePaletteActionType,
    TThemePaletteComponentStructuralPart
  } from './types';

/**
 * Тема приложения
 */
export class Theme
{
  // #region Const
  /**
   * Ключ под которым сохраняется тема сайта
   */
  public static readonly SaveKey: string = 'lotus-core-theme';

  /**
   * Названия атрибута в документа под которым сохраняется тема сайта
   */
  public static readonly DataAttributeThemeMode: string = 'data-theme';

  /**
   * Названия атрибута в документа под которым сохраняется цвет темы сайта
   */
  public static readonly DataAttributeThemeColor: string = 'data-color';

  /**
   * Шрифт по умолчанию
   */
  public static readonly FontDefault: string = 'Verdana, Geneva, Tahoma, sans-serif';

  /**
   * Шрифт для акцента
   */
  public static readonly FontAccent: string = 'Arial, Helvetica, sans-serif';

  /**
   * Скорость переходов анимации/состояния, в миллисекундах
   */
  public static readonly TransitionSpeed: number = 400;

  /**
   * Скорость переходов анимации/состояния, в миллисекундах
   */
  public static readonly TransitionSpeedFast: number = 250;

  /**
   * Прозрачность для элементов UI которые недоступны
   */
  public static readonly OpacityForDisabled: number = 0.65;

  /**
   * Прозрачность тени для границы элементов UI которые при наведении
   */
  public static readonly OpacityForBorderShadowHover: number = 0.2;

  /**
   * Прозрачность тени для границы элементов UI которые при активном состоянии
   */
  public static readonly OpacityForBorderShadowActive: number = 0.4;
  // #endregion

  // #region Static fields
  private static _Instance: Theme;

  public static get Instance(): Theme
  {
    return this._Instance || (this._Instance = new this());
  }
  //#endregion

  // #region Static properties

  //#endregion

  // #region Fields
  private _currentPalette: IThemePalette;
  private _currentColor: TThemeColorPalette;
  //#endregion

  // #region Properties
  /**
   * Получить текущую палитру цвета
   */
  public get currentPalette(): IThemePalette
  {
    if (this._currentPalette) return this._currentPalette;
    return ThemeColorPalettes.Palettes['light'];
  }

  /**
   * Установить текущую палитру цвета
   */
  public set currentPalette(palette: IThemePalette)
  {
    this._currentPalette = palette;
  }

  /**
   * Получить основной цвет
   */
  public get currentColor(): TThemeColorPalette
  {
    if (this._currentColor) return this._currentColor;
    return 'blue';
  }

  /**
   * Установить основной цвет
   */
  public set currentColor(themePaletteColor: TThemeColorPalette)
  {
    this._currentColor = themePaletteColor;
  }
  // #endregion

  constructor()
  {
    this._currentPalette = ThemeColorPalettes.Palettes['light'];
    this._currentColor = 'blue';
  }

  // #region Color methods
  /**
   * Получить степень прозрачности
   * @param actionType Тип действия
   */
  public getOpacity(actionType?: TThemePaletteActionType): number | undefined
  {
    let opacity: number | undefined = undefined;
    if (actionType)
    {
      switch (actionType)
      {
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
  public getPaletteColor(color: TThemeColor): IThemePaletteColor | undefined
  {
    const colorData = deconstructionThemeColor(color);
    if (!colorData) return;

    const palette = Assert.existValue(colorData.colorPalette)
      ? this.currentPalette.colors[colorData.colorPalette!]
      : this.currentPalette.colors[colorData.colorSemantic!];

    // eslint-disable-next-line consistent-return
    return palette;
  }

  /**
   * Получить цвет текущей темы
   * @param color Доступный цвет темы
   * @param actionType Тип действия
   * @returns Цвет
   */
  public getElementColor(color: TThemeColor, actionType?: TThemePaletteActionType): Color
  {
    const colorData = deconstructionThemeColor(color);
    if (!colorData) return Colors.red;

    const palette = Assert.existValue(colorData.colorPalette)
      ? this.currentPalette.colors[colorData.colorPalette!]
      : this.currentPalette.colors[colorData.colorSemantic!];

    return palette.variants.getByName(colorData.colorVariant, this.getOpacity(actionType));
  }

  /**
   * Получить цвет текста текущей темы
   * @param color Доступный цвет темы
   * @param actionType Тип действия
   * @returns Цвет
   */
  public getTextColor(color: TThemeColor, actionType?: TThemePaletteActionType): Color
  {
    const colorData = deconstructionThemeColor(color);
    if (!colorData) return Colors.red;

    let opacity: number | undefined = undefined;
    if (actionType)
    {
      switch (actionType)
      {
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
    if (colorData.colorSemantic)
    {
      // Специальные цвета
      if (colorData.colorSemantic == 'primary')
      {
        return this.currentPalette.text.primary.toModifyAlphaOrThis(opacity);
      }
      if (colorData.colorSemantic == 'secondary')
      {
        return this.currentPalette.text.secondary.toModifyAlphaOrThis(opacity);
      }

      // Остальные берем из темы
      const palette = this.currentPalette.colors[colorData.colorSemantic!];
      return palette.variants.getByName('main', opacity);
    } else if (colorData.colorPalette)
    {
      // Берем из темы
      const palette = this.currentPalette.colors[colorData.colorPalette!];

      // Если есть вариант то берем его
      if (colorData.colorVariant)
      {
        return palette.variants.getByName(colorData.colorVariant, opacity);
      } else
      {
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
  public getBackgroundColor(color: TThemeColor, actionType?: TThemePaletteActionType): Color
  {
    const colorData = deconstructionThemeColor(color);
    if (!colorData) return Colors.red;

    let opacity: number | undefined = undefined;
    if (actionType)
    {
      switch (actionType)
      {
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
    if (colorData.colorSemantic)
    {
      // Специальные цвета
      if (colorData.colorSemantic == 'primary')
      {
        return this.currentPalette.background.default.toModifyAlphaOrThis(opacity);
      }
      if (colorData.colorSemantic == 'secondary')
      {
        return this.currentPalette.background.secondary.toModifyAlphaOrThis(opacity);
      }

      // Остальные берем из темы
      const palette = this.currentPalette.colors[colorData.colorSemantic!];
      return palette.variants.getByName(colorData.colorVariant ?? 'main', opacity);
    } else if (colorData.colorPalette)
    {
      // Берем из темы
      const palette = this.currentPalette.colors[colorData.colorPalette!];

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
  public getBorderColor(color: TThemeColor, actionType?: TThemePaletteActionType): Color
  {
    const colorData = deconstructionThemeColor(color);
    if (!colorData) return Colors.red;

    let opacity: number | undefined = undefined;
    if (actionType)
    {
      switch (actionType)
      {
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
    if (colorData.colorSemantic)
    {
      // Специальные цвета
      if (colorData.colorSemantic == 'primary')
      {
        return this.currentPalette.border.primary.toModifyAlphaOrThis(opacity);
      }
      if (colorData.colorSemantic == 'secondary')
      {
        return this.currentPalette.border.secondary.toModifyAlphaOrThis(opacity);
      }

      // Остальные берем из темы
      const palette = this.currentPalette.colors[colorData.colorSemantic!];
      return palette.variants.getByName('main', opacity);
    } else if (colorData.colorPalette)
    {
      // Берем из темы
      const palette = this.currentPalette.colors[colorData.colorPalette!];

      // Если есть вариант то берем его
      if (colorData.colorVariant)
      {
        return palette.variants.getByName(colorData.colorVariant, opacity);
      } else
      {
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
  public getColorByStructuralPart(part: TThemePaletteComponentStructuralPart, color: TThemeColor, actionType?: TThemePaletteActionType): Color
  {
    switch (part)
    {
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

  public getColorInfoHSL(colorTheme: TThemeColorPalette | TColorSemantic, colorVariant: TColorVariantName):string
  {
    const color = this.getElementColor(createThemeColor(colorTheme, colorVariant));
    const hsl = color.getHSL();
    return `h=${hsl.h.toFixed(3)}, s=${hsl.s.toFixed(3)}, l=${hsl.l.toFixed(3)}`; 
  }
  //#endregion

  // #region Load/Save
  /**
   * Загрузка темы из локального хранилища
   * @returns Данные текущей темы данные по умолчанию
   */
  public loadFromStorage(): TThemeData
  {
    const value = localStorage.getItem(Theme.SaveKey);
    if (value)
    {
      return JSON.parse(value);
    } else
    {
      return { mode: 'light', color: 'blue' };
    }
  }

  /**
   * Сохранение темы в локальное хранилище
   * @param theme Тема
   */
  public saveToStorage(theme: TThemeData)
  {
    localStorage.setItem(Theme.SaveKey, JSON.stringify(theme));
  }
  // #endregion
}

export const ThemeInstance = Theme.Instance;
