import { Color, Colors, ColorVariantsHelper } from 'lotus-core/modules/color';
import { ThemeColorVariants } from './ThemeColorVariants';
/**
 * Наборы палитр тем
 */
export class ThemeColorPalettes {
    // #region Static methods
    static getMuiBlueColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiBlue.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return ColorVariantsHelper.getIndexByName(colorVariant) <= 5 ? Colors.black : Colors.white;
        }
    }
    static getMuiBlueGreyColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiBlueGrey.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return ColorVariantsHelper.getIndexByName(colorVariant) <= 5 ? Colors.black : Colors.white;
        }
    }
    static getMuiIndigoColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiIndigo.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return ColorVariantsHelper.getIndexByName(colorVariant) <= 3 ? Colors.black : Colors.white;
        }
    }
    static getMuiGreenColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiGreen.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return ColorVariantsHelper.getIndexByName(colorVariant) <= 6 ? Colors.black : Colors.white;
        }
    }
    static getMuiTealColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiTeal.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return ColorVariantsHelper.getIndexByName(colorVariant) <= 4 ? Colors.black : Colors.white;
        }
    }
    static getMuiYellowColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiYellow.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return Colors.black;
        }
    }
    static getMuiAmberColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiAmber.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return Colors.black;
        }
    }
    static getMuiRedColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiRed.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return ColorVariantsHelper.getIndexByName(colorVariant) <= 4 ? Colors.black : Colors.white;
        }
    }
    static getMuiBrownColor(colorVariant, isHarmonious) {
        if (isHarmonious) {
            return ThemeColorVariants.MuiBrown.getByName(colorVariant).createHarmoniousColor();
        }
        else {
            return ColorVariantsHelper.getIndexByName(colorVariant) <= 3 ? Colors.black : Colors.white;
        }
    }
    // #endregion
    static Palettes = {
        light: {
            mode: 'light',
            text: {
                primary: new Color('rgba(0, 0, 0, 0.87)'),
                secondary: new Color('rgba(0, 0, 0, 0.6)'),
                disabledOpacity: 0.38
            },
            background: {
                default: new Color('#fff'),
                secondary: new Color('#fff'),
                disabledOpacity: 0.12
            },
            border: {
                primary: new Color('rgba(0, 0, 0, 0.25)'),
                secondary: new Color('rgba(0, 0, 0, 0.4)'),
                disabledOpacity: 0.26
            },
            action: {
                activatedOpacity: 0.12,
                hoverOpacity: 0.1,
                selectedOpacity: 0.08,
                disabledOpacity: 0.38,
                focusOpacity: 0.12
            },
            colors: {
                primary: {
                    variants: ThemeColorVariants.Primary,
                    onText: () => Colors.white
                },
                secondary: {
                    variants: ThemeColorVariants.Secondary,
                    onText: () => Colors.white
                },
                error: {
                    variants: ThemeColorVariants.Error,
                    onText: () => Colors.white
                },
                warning: {
                    variants: ThemeColorVariants.Warning,
                    onText: () => Colors.white
                },
                info: {
                    variants: ThemeColorVariants.Info,
                    onText: () => Colors.white
                },
                success: {
                    variants: ThemeColorVariants.Success,
                    onText: () => Colors.white
                },
                blue: {
                    variants: ThemeColorVariants.MuiBlue,
                    onText: ThemeColorPalettes.getMuiBlueColor
                },
                blueGrey: {
                    variants: ThemeColorVariants.MuiBlueGrey,
                    onText: ThemeColorPalettes.getMuiBlueGreyColor
                },
                indigo: {
                    variants: ThemeColorVariants.MuiIndigo,
                    onText: ThemeColorPalettes.getMuiIndigoColor
                },
                green: {
                    variants: ThemeColorVariants.MuiGreen,
                    onText: ThemeColorPalettes.getMuiGreenColor
                },
                teal: {
                    variants: ThemeColorVariants.MuiTeal,
                    onText: ThemeColorPalettes.getMuiTealColor
                },
                yellow: {
                    variants: ThemeColorVariants.MuiYellow,
                    onText: ThemeColorPalettes.getMuiYellowColor
                },
                amber: {
                    variants: ThemeColorVariants.MuiAmber,
                    onText: ThemeColorPalettes.getMuiAmberColor
                },
                red: {
                    variants: ThemeColorVariants.MuiRed,
                    onText: ThemeColorPalettes.getMuiRedColor
                },
                brown: {
                    variants: ThemeColorVariants.MuiBrown,
                    onText: ThemeColorPalettes.getMuiBrownColor
                }
            }
        },
        dark: {
            mode: 'dark',
            text: {
                primary: new Color('rgba(255, 255, 255, 0.9)'),
                secondary: new Color('rgba(255, 255, 255, 0.7)'),
                disabledOpacity: 0.5
            },
            background: {
                default: new Color('#121212'),
                secondary: new Color('#121212'),
                disabledOpacity: 0.12
            },
            border: {
                primary: new Color('rgba(255, 255, 255, 0.25)'),
                secondary: new Color('rgba(255, 255, 255, 0.4)'),
                disabledOpacity: 0.26
            },
            action: {
                activatedOpacity: 0.12,
                hoverOpacity: 0.1,
                selectedOpacity: 0.16,
                disabledOpacity: 0.3,
                focusOpacity: 0.12
            },
            colors: {
                primary: {
                    variants: ThemeColorVariants.Primary,
                    onText: () => new Color('rgba(0, 0, 0, 0.87)')
                },
                secondary: {
                    variants: ThemeColorVariants.Secondary,
                    onText: () => new Color('rgba(0, 0, 0, 0.87)')
                },
                error: {
                    variants: ThemeColorVariants.Error,
                    onText: () => Colors.white
                },
                warning: {
                    variants: ThemeColorVariants.Warning,
                    onText: () => new Color('rgba(0, 0, 0, 0.87)')
                },
                info: {
                    variants: ThemeColorVariants.Info,
                    onText: () => new Color('rgba(0, 0, 0, 0.87)')
                },
                success: {
                    variants: ThemeColorVariants.Success,
                    onText: () => new Color('rgba(0, 0, 0, 0.87)')
                },
                blue: {
                    variants: ThemeColorVariants.MuiBlue,
                    onText: ThemeColorPalettes.getMuiBlueColor
                },
                blueGrey: {
                    variants: ThemeColorVariants.MuiBlueGrey,
                    onText: ThemeColorPalettes.getMuiBlueGreyColor
                },
                indigo: {
                    variants: ThemeColorVariants.MuiIndigo,
                    onText: ThemeColorPalettes.getMuiIndigoColor
                },
                green: {
                    variants: ThemeColorVariants.MuiGreen,
                    onText: ThemeColorPalettes.getMuiGreenColor
                },
                teal: {
                    variants: ThemeColorVariants.MuiTeal,
                    onText: ThemeColorPalettes.getMuiTealColor
                },
                yellow: {
                    variants: ThemeColorVariants.MuiYellow,
                    onText: ThemeColorPalettes.getMuiYellowColor
                },
                amber: {
                    variants: ThemeColorVariants.MuiAmber,
                    onText: ThemeColorPalettes.getMuiAmberColor
                },
                red: {
                    variants: ThemeColorVariants.MuiRed,
                    onText: ThemeColorPalettes.getMuiRedColor
                },
                brown: {
                    variants: ThemeColorVariants.MuiBrown,
                    onText: ThemeColorPalettes.getMuiBrownColor
                }
            }
        }
    };
}
//# sourceMappingURL=ThemeColorPalettes.js.map