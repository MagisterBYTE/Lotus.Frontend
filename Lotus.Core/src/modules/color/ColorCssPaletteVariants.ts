import { TColorPalette } from './ColorPalette';
import { TColorSemantic } from './ColorSemantic';
import { DarkColorPalette, LightColorPalette } from './ColorVariantsConstants';
import { TColorVariantTuple } from './ColorVariantsTypes';

export type TColorCssPaletteVariant = Record<TColorPalette | TColorSemantic, TColorVariantTuple>;

/**
 * Набор цветов палитры с вариативностью цвета для темной и светлой схемы
 */
export abstract class ColorCssPaletteVariants
{
  // #region Fields
  public static readonly Light:TColorCssPaletteVariant = {
    primary: LightColorPalette.Primary.toArrayCss(false),
    secondary: LightColorPalette.Secondary.toArrayCss(false),
    error: LightColorPalette.Error.toArrayCss(false),
    warning: LightColorPalette.Warning.toArrayCss(false),
    info: LightColorPalette.Info.toArrayCss(false),
    success: LightColorPalette.Success.toArrayCss(false),
    blue: LightColorPalette.MuiBlue.toArrayCss(false),
    blueGray: LightColorPalette.MuiBlueGray.toArrayCss(false),
    indigo: LightColorPalette.MuiIndigo.toArrayCss(false),
    green: LightColorPalette.MuiGreen.toArrayCss(false),
    teal: LightColorPalette.MuiTeal.toArrayCss(false),
    yellow: LightColorPalette.MuiYellow.toArrayCss(false),
    amber: LightColorPalette.MuiAmber.toArrayCss(false),
    red: LightColorPalette.MuiRed.toArrayCss(false),
    brown: LightColorPalette.MuiBrown.toArrayCss(false),
    gray: LightColorPalette.MantineGray.toArrayCss(false),
    dark: LightColorPalette.MantineDark.toArrayCss(false)
  };

  public static readonly Dark:TColorCssPaletteVariant = {
    primary: DarkColorPalette.Primary.toArrayCss(false),
    secondary: DarkColorPalette.Secondary.toArrayCss(false),
    error: DarkColorPalette.Error.toArrayCss(false),
    warning: DarkColorPalette.Warning.toArrayCss(false),
    info: DarkColorPalette.Info.toArrayCss(false),
    success: DarkColorPalette.Success.toArrayCss(false),
    blue: DarkColorPalette.MuiBlue.toArrayCss(false),
    blueGray: DarkColorPalette.MuiBlueGray.toArrayCss(false),
    indigo: DarkColorPalette.MuiIndigo.toArrayCss(false),
    green: DarkColorPalette.MuiGreen.toArrayCss(false),
    teal: DarkColorPalette.MuiTeal.toArrayCss(false),
    yellow: DarkColorPalette.MuiYellow.toArrayCss(false),
    amber: DarkColorPalette.MuiAmber.toArrayCss(false),
    red: DarkColorPalette.MuiRed.toArrayCss(false),
    brown: DarkColorPalette.MuiBrown.toArrayCss(false),
    gray: DarkColorPalette.MantineGray.toArrayCss(false),
    dark: DarkColorPalette.MantineDark.toArrayCss(false)
  };
  // #endregion
}

