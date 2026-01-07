import { TColorPalette } from './ColorPalette';
import { TColorSemantic } from './ColorSemantic';
import { ColorVariants } from './ColorVariants';
import { DarkColorPalette, LightColorPalette } from './ColorVariantsConstants';

export type TColorPaletteVariants = Record<TColorPalette | TColorSemantic, ColorVariants>;

/**
 * Набор цветов палитры с вариативностью цвета для темной и светлой схемы
 */
export abstract class ColorPaletteVariants
{
  // #region Fields
  public static readonly Light:TColorPaletteVariants = {
    primary: LightColorPalette.Primary,
    secondary: LightColorPalette.Secondary,
    error: LightColorPalette.Error,
    warning: LightColorPalette.Warning,
    info: LightColorPalette.Info,
    success: LightColorPalette.Success,
    blue: LightColorPalette.MuiBlue,
    blueGray: LightColorPalette.MuiBlueGray,
    indigo: LightColorPalette.MuiIndigo,
    green: LightColorPalette.MuiGreen,
    teal: LightColorPalette.MuiTeal,
    yellow: LightColorPalette.MuiYellow,
    amber: LightColorPalette.MuiAmber,
    red: LightColorPalette.MuiRed,
    brown: LightColorPalette.MuiBrown,
    gray: LightColorPalette.MantineGray,
    dark: LightColorPalette.MantineDark
  } as const;

  public static readonly Dark:TColorPaletteVariants = {
    primary: DarkColorPalette.Primary,
    secondary: DarkColorPalette.Secondary,
    error: DarkColorPalette.Error,
    warning: DarkColorPalette.Warning,
    info: DarkColorPalette.Info,
    success: DarkColorPalette.Success,
    blue: DarkColorPalette.MuiBlue,
    blueGray: DarkColorPalette.MuiBlueGray,
    indigo: DarkColorPalette.MuiIndigo,
    green: DarkColorPalette.MuiGreen,
    teal: DarkColorPalette.MuiTeal,
    yellow: DarkColorPalette.MuiYellow,
    amber: DarkColorPalette.MuiAmber,
    red: DarkColorPalette.MuiRed,
    brown: DarkColorPalette.MuiBrown,
    gray: DarkColorPalette.MantineGray,
    dark: DarkColorPalette.MantineDark
  };
  // #endregion
}