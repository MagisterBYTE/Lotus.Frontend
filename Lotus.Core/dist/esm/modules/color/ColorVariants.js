import { Color } from './Color';
import { ColorNames } from './ColorNames';
import { ColorVariantsHelper } from './ColorVariantsHelper';
/**
 * Вариативность цветов
 */
export class ColorVariants {
    // #region  Static methods
    static createFromColorLightness(red, green, blue) {
        const main = new Color(red, green, blue);
        const white = main.increaseLightness(0.95);
        const palest = main.increaseLightness(0.87);
        const pale = main.increaseLightness(0.82);
        const lighter = main.increaseLightness(0.77);
        const light = main.increaseLightness(0.67);
        const dark = main.decreaseLightness(0.15);
        const darker = main.decreaseLightness(0.40);
        const darkest = main.decreaseLightness(0.60);
        const black = main.decreaseLightness(0.80);
        return new ColorVariants(white, palest, pale, lighter, light, main, dark, darker, darkest, black);
    }
    static createFromColorCombine(red, green, blue) {
        const main = new Color(red, green, blue);
        const white = main.combine(ColorNames['white'], 0.95);
        const palest = main.combine(ColorNames['white'], 0.87);
        const pale = main.combine(ColorNames['white'], 0.82);
        const lighter = main.combine(ColorNames['white'], 0.77);
        const light = main.combine(ColorNames['white'], 0.67);
        const dark = main.combine(ColorNames['black'], 0.15);
        const darker = main.combine(ColorNames['black'], 0.40);
        const darkest = main.combine(ColorNames['black'], 0.60);
        const black = main.combine(ColorNames['black'], 0.80);
        return new ColorVariants(white, palest, pale, lighter, light, main, dark, darker, darkest, black);
    }
    static createFromColorRelativeLightness(mainColor, lightColor, darkColor) {
        const main = new Color(mainColor);
        const white = main.increaseLightness(0.95);
        const palest = main.increaseLightness(0.87);
        const pale = main.increaseLightness(0.82);
        const lighter = main.increaseLightness(0.77);
        const light = new Color(lightColor);
        const dark = new Color(darkColor);
        const darker = main.decreaseLightness(0.40);
        const darkest = main.decreaseLightness(0.60);
        const black = main.decreaseLightness(0.80);
        return new ColorVariants(white, palest, pale, lighter, light, main, dark, darker, darkest, black);
    }
    // #endregion
    white; // 1
    palest; // 2
    pale; // 3
    lighter; // 4
    light; // 5
    main; // 6
    dark; // 7
    darker; // 8
    darkest; // 9
    black; // 10
    constructor(white, palest, pale, lighter, light, main, dark, darker, darkest, black) {
        this.white = white;
        this.palest = palest;
        this.pale = pale;
        this.lighter = lighter;
        this.light = light;
        this.main = main;
        this.dark = dark;
        this.darker = darker;
        this.darkest = darkest;
        this.black = black;
        this.getByName = this.getByName.bind(this);
        this.getByIndex = this.getByIndex.bind(this);
    }
    /**
     * Получить цвет по его имени
     * @param name Именованный тип в палитре цветов
     * @param modifyAlpha Модификация значения альфы от 0 до 1
     */
    getByName(name, modifyAlpha) {
        if (name) {
            const color = this[name];
            if (modifyAlpha) {
                return color.toModifyAlpha(modifyAlpha);
            }
            else {
                return color;
            }
        }
        else {
            if (modifyAlpha) {
                return this.main.toModifyAlpha(modifyAlpha);
            }
            else {
                return this.main;
            }
        }
    }
    /**
     * Получить цвет по его индексу
     * @param index  Числовой индекс в палитре цветов
     * @param modifyAlpha Модификация значения альфы от 0 до 1
     */
    getByIndex(index, modifyAlpha) {
        const name = ColorVariantsHelper.getNameByIndex(index);
        return this.getByName(name, modifyAlpha);
    }
    /**
     * Получить следующий цвет по его имени
     * @param name Именованный тип в палитре цветов
     * @param delta Смещение
     * @param modifyAlpha Модификация значения альфы от 0 до 1
     */
    getNextByName(name, delta, modifyAlpha) {
        const nextName = ColorVariantsHelper.getNameByIndex(ColorVariantsHelper.getNextIndex(ColorVariantsHelper.getIndexByName(name), delta));
        const color = this[nextName];
        if (modifyAlpha) {
            return color.toModifyAlpha(modifyAlpha);
        }
        else {
            return color;
        }
    }
}
//# sourceMappingURL=ColorVariants.js.map