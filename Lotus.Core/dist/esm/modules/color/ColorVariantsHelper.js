import { ColorNames } from './ColorNames';
import { TColorVariantNames, TColorVariantIndexMain, TColorVariantIndexBlack, TColorVariantIndexWhite } from './ColorVariantsTypes';
export class ColorVariantsHelper {
    /**
     * Получить цвет по его индексу
     * @param index Числовой индекс в палитре цветов
     * @returns Именованный тип в палитре цветов
     */
    static getNameByIndex(index) {
        return TColorVariantNames[(index ?? TColorVariantIndexMain) - 1];
    }
    /**
     * Получить индексу по имени цвета
     * @param name Именованный тип в палитре цветов
     * @returns Числовой индекс в палитре цветов
     */
    static getIndexByName(name) {
        if (name) {
            const index = TColorVariantNames.findIndex((x => x === name));
            return (index + 1);
        }
        return TColorVariantIndexMain;
    }
    /**
     * Получить индекс смещенный на определенную величину
     * @param index Числовой индекс в палитре цветов
     * @param delta Смещение
     * @returns Числовой индекс в палитре цветов
     */
    static getNextIndex(index, delta) {
        const next = (index ?? TColorVariantIndexMain) + (delta ?? 0);
        if (next > TColorVariantIndexBlack) {
            return (next % TColorVariantIndexBlack);
        }
        else {
            if (next < TColorVariantIndexWhite) {
                return (next + TColorVariantIndexBlack);
            }
            else {
                return next;
            }
        }
    }
    /**
     * Вычислить цвет на основании варианта
     * @param baseColor Базовый цвет
     * @param name Именованный тип в вариативности цветов
     */
    static calcColor(baseColor, name) {
        if (name) {
            switch (name) {
                case 'white': return baseColor.combine(ColorNames['white'], 0.95);
                case 'palest': return baseColor.combine(ColorNames['white'], 0.87);
                case 'pale': return baseColor.combine(ColorNames['white'], 0.82);
                case 'lighter': return baseColor.combine(ColorNames['white'], 0.77);
                case 'light': return baseColor.combine(ColorNames['white'], 0.67);
                case 'main': return baseColor;
                case 'dark': return baseColor.combine(ColorNames['black'], 0.15);
                case 'darker': return baseColor.combine(ColorNames['black'], 0.40);
                case 'darkest': return baseColor.combine(ColorNames['black'], 0.60);
                case 'black': return baseColor.combine(ColorNames['black'], 0.80);
            }
        }
        return baseColor;
    }
}
