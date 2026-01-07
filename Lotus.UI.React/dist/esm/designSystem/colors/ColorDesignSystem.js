import { ColorPaletteVariants } from './ColorPaletteVariants';
/**
 * Набор стандартных цветов для дизайн системы
 */
export class ColorDesignSystem {
    static Default = {
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
//# sourceMappingURL=ColorDesignSystem.js.map