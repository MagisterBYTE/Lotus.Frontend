import { TColorSemantic, TColorVariantTuple } from 'lotus-core/modules/color';
import { TColorPalette } from './ColorPalette';
import { ColorPaletteVariants } from './ColorPaletteVariants';

/**
 * Тип для обозначения всех доступных цветов с учетом вариативности без привязки к цветовой схеме
 */
export type TColorDesignSystemTuples = Record<TColorPalette | TColorSemantic, TColorVariantTuple>;

/**
 * Набор стандартных цветов для дизайн системы
 */
export abstract class ColorDesignSystem
{
  public static readonly Default:TColorDesignSystemTuples = {
    primary: ColorPaletteVariants.Primary.toArrayCss(false),
    secondary: ColorPaletteVariants.Secondary.toArrayCss(false),
    error: ColorPaletteVariants.Error.toArrayCss(false),
    warning: ColorPaletteVariants.Warning.toArrayCss(false),
    info: ColorPaletteVariants.Info.toArrayCss(false),
    success: ColorPaletteVariants.Success.toArrayCss(false),
    blue: ColorPaletteVariants.MuiBlue.toArrayCss(false),
    blueGray: ColorPaletteVariants.MuiBlueGrey.toArrayCss(false),
    indigo: ColorPaletteVariants.MuiIndigo.toArrayCss(false),
    green: ColorPaletteVariants.MuiGreen.toArrayCss(false),
    teal: ColorPaletteVariants.MuiTeal.toArrayCss(false),
    yellow: ColorPaletteVariants.MuiYellow.toArrayCss(false),
    amber: ColorPaletteVariants.MuiAmber.toArrayCss(false),
    red: ColorPaletteVariants.MuiRed.toArrayCss(false),
    brown: ColorPaletteVariants.MuiBrown.toArrayCss(false),
    gray: ColorPaletteVariants.MantineGray.toArrayCss(false),
    dark: ColorPaletteVariants.MantineDark.toArrayCss(false)
  };
}