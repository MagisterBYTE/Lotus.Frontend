import { ColorNames } from './ColorNames';
/**
 * Вспомогательный класс для работы с цветами в различных форматах (RGB, HSL, HEX, именованные цвета).
 * Предоставляет методы для проверки, конвертации и манипуляций с цветами.
 * Все методы статические - экземпляр класса не требуется.
 */
export class ColorHelper {
    /**
     * Проверяет, является ли число валидным значением цвета (0-255)
     * @param value - Проверяемое значение
     * @returns true если значение в диапазоне 0-255
     */
    static isColorValue(value) {
        return value >= 0 && value <= 255;
    }
    /**
     * Проверяет, является ли число валидным значением альфа-канала (0-1)
     * @param value - Проверяемое значение
     * @returns true если значение в диапазоне 0-1
     */
    static isAlphaValue(value) {
        return value >= 0 && value <= 1;
    }
    /**
     * Проверяет, является ли массив валидным RGB массивом [R, G, B]
     * @param rgb - Проверяемый массив
     * @returns true если массив содержит 3 валидных цветовых значения
     */
    static isRGBArray(rgb) {
        if (rgb.length === 3) {
            for (let i = 0; i < 3; i++) {
                if (!ColorHelper.isColorValue(rgb[i])) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    /**
     * Проверяет, является ли массив валидным RGBA массивом [R, G, B, A]
     * @param rgba - Проверяемый массив
     * @returns true если массив содержит 3 валидных цветовых значения и валидное альфа-значение
     */
    static isRGBAArray(rgba) {
        if (rgba.length === 4) {
            for (let i = 0; i < 3; i++) {
                if (!ColorHelper.isColorValue(rgba[i])) {
                    return false;
                }
            }
            return ColorHelper.isAlphaValue(rgba[3]);
        }
        return false;
    }
    /**
     * Проверяет, является ли строка валидным 3-значным HEX цветом (#RGB)
     * @param colorString - Проверяемая строка
     * @returns true если строка соответствует формату #RGB
     */
    static isHex3(colorString) {
        return /^#[0-9a-fA-F]{3}/.test(colorString);
    }
    /**
     * Проверяет, является ли строка валидным 6-значным HEX цветом (#RRGGBB)
     * @param colorString - Проверяемая строка
     * @returns true если строка соответствует формату #RRGGBB
     */
    static isHex6(colorString) {
        return /^#[0-9a-fA-F]{6}/.test(colorString);
    }
    /**
     * Парсит строку цвета в числовой массив [R, G, B] или [R, G, B, A]
     * Поддерживает форматы: HEX, RGB/RGBA строки, именованные цвета
     * @param colorString - Строка цвета для парсинга
     * @returns Числовой массив цветовых компонент или undefined если не удалось распарсить
     */
    // eslint-disable-next-line consistent-return
    static parseColorString(colorString) {
        const c = colorString.replaceAll(' ', '');
        // Обработка HEX форматов
        if (ColorHelper.isHex6(c)) {
            return [
                parseInt(c.substring(1, 3), 16),
                parseInt(c.substring(3, 5), 16),
                parseInt(c.substring(5, 7), 16)
            ];
        }
        if (ColorHelper.isHex3(c)) {
            return [
                parseInt(c[1] + c[1], 16),
                parseInt(c[2] + c[2], 16),
                parseInt(c[3] + c[3], 16)
            ];
        }
        // Обработка RGB/RGBA строк
        let m;
        // eslint-disable-next-line no-cond-assign
        if (m = c.match(/rgb\( ?(\d+), ?(\d+), ?(\d+) ?\)/)) {
            const r = parseInt(m[1], 10);
            const g = parseInt(m[2], 10);
            const b = parseInt(m[3], 10);
            if (ColorHelper.isColorValue(r) && ColorHelper.isColorValue(g) && ColorHelper.isColorValue(b)) {
                return [r, g, b];
            }
        }
        // eslint-disable-next-line no-cond-assign
        if (m = c.match(/rgba\( ?(\d+), ?(\d+), ?(\d+), ?(\d+.?\d*) ?\)/)) {
            const r = parseInt(m[1], 10);
            const g = parseInt(m[2], 10);
            const b = parseInt(m[3], 10);
            const a = parseFloat(m[4]);
            if (ColorHelper.isColorValue(r) && ColorHelper.isColorValue(g) &&
                ColorHelper.isColorValue(b) && ColorHelper.isAlphaValue(a)) {
                return [r, g, b, a];
            }
        }
        // Попытка распознать именованный цвет
        const name = ColorHelper.getColorName(colorString);
        if (name) {
            return name;
        }
    }
    /**
     * Возвращает числовое представление именованного цвета
     * @param colorString - Название цвета
     * @returns Числовой массив цветовых компонент или undefined если цвет не найден
     */
    // eslint-disable-next-line consistent-return
    static getColorName(colorString) {
        const colStr = colorString.toLowerCase();
        if (colStr in ColorNames) {
            return ColorNames[colStr];
        }
        // Обработка вариантов с суффиксом " 1" (устаревший формат)
        if (/ 1$/.test(colStr)) {
            const noOne = colStr.replace(/ 1$/, '');
            if (noOne in ColorNames) {
                return ColorNames[noOne];
            }
        }
    }
    /**
     * Проверяет, является ли объект валидным HSL цветом
     * @param hsla - Проверяемый объект
     * @returns true если объект содержит h, s, l свойства с валидными значениями
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isHSL(hsla) {
        return (typeof hsla === 'object' &&
            'h' in hsla && ColorHelper.isAlphaValue(hsla.h) &&
            's' in hsla && ColorHelper.isAlphaValue(hsla.s) &&
            'l' in hsla && ColorHelper.isAlphaValue(hsla.l) &&
            !('a' in hsla));
    }
    /**
     * Конвертирует RGB массив в HEX строку
     * @param c - RGB массив [R, G, B]
     * @returns HEX строка в формате #RRGGBB или #RGB (если возможно сокращение)
     */
    static rgb2hex(c) {
        const r = ColorHelper.int2hex(Math.round(c[0]));
        const g = ColorHelper.int2hex(Math.round(c[1]));
        const b = ColorHelper.int2hex(Math.round(c[2]));
        if (r[0] === r[1] && g[0] === g[1] && b[0] === b[1]) {
            return '#' + r[0] + g[0] + b[0]; // Сокращенная форма (#RGB)
        }
        return '#' + r + g + b; // Полная форма (#RRGGBB)
    }
    /**
     * Конвертирует число в HEX строку с ведущим нулем при необходимости
     * @param i - Число (0-255)
     * @returns HEX строка (2 символа)
     */
    static int2hex(i) {
        const v = i.toString(16);
        return v.length === 1 ? '0' + v : v;
    }
    /**
     * Вспомогательная функция для HSL преобразований
     */
    static hslval(x, y, r) {
        if (r < 0)
            r += 1;
        if (r > 1)
            r -= 1;
        let c;
        if (6 * r < 1)
            c = x + (y - x) * 6 * r;
        else if (2 * r < 1)
            c = y;
        else if (3 * r < 2)
            c = x + (y - x) * ((2 / 3) - r) * 6;
        else
            c = x;
        return c * 255;
    }
    /**
     * Конвертирует HSL цвет в RGB массив
     * @param hsl - HSL объект {h, s, l}
     * @returns RGB массив [R, G, B]
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static hsl2rgb(hsl) {
        const h = hsl.h, s = hsl.s, l = hsl.l;
        let r, g, b;
        if (s === 0) {
            // Оттенки серого
            r = g = b = l * 255;
        }
        else {
            const y = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const x = 2 * l - y;
            r = ColorHelper.hslval(x, y, h + 1 / 3);
            g = ColorHelper.hslval(x, y, h);
            b = ColorHelper.hslval(x, y, h - 1 / 3);
        }
        return [Math.round(r), Math.round(g), Math.round(b)];
    }
    /**
     * Конвертирует RGB массив в HSL объект
     * @param rgb - RGB массив [R, G, B]
     * @returns HSL объект {h, s, l}
     */
    static rgb2hsl(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const x = Math.max(r, g, b);
        const n = Math.min(r, g, b);
        const l = (x + n) / 2;
        let s = 0, h = 0;
        if (x !== n) {
            const d = x - n;
            s = l > 0.5 ? d / (2 - x - n) : d / (x + n);
            if (x === r)
                h = (g - b) / d + (g < b ? 6 : 0);
            if (x === g)
                h = 2 + (b - r) / d;
            if (x === b)
                h = 4 + (r - g) / d;
            h /= 6;
            if (h < 0)
                h += 1;
        }
        return { h, s, l };
    }
    /**
     * Смешивает два цвета в заданной пропорции
     * @param s - Исходный цвет [R, G, B] или [R, G, B, A]
     * @param t - Целевой цвет [R, G, B] или [R, G, B, A]
     * @param amount - Коэффициент смешивания (0-1)
     * @returns Новый цветовой массив
     */
    static combine(s, t, amount) {
        amount = typeof amount === 'number' ? amount : 0.5;
        const r = Math.round((t[0] - s[0]) * amount);
        const g = Math.round((t[1] - s[1]) * amount);
        const b = Math.round((t[2] - s[2]) * amount);
        const rgb = [s[0] + r, s[1] + g, s[2] + b];
        if (s.length === 4)
            rgb[3] = s[3]; // Сохраняем альфа-канал если был
        return rgb;
    }
    /**
     * Инвертирует цвет
     * @param c - Исходный цвет [R, G, B] или [R, G, B, A]
     * @returns Инвертированный цветовой массив
     */
    static invert(c) {
        const rgba = c.slice();
        for (let i = 0; i < 3; i++) {
            rgba[i] = 255 - rgba[i];
        }
        return rgba;
    }
    /**
     * Изменяет оттенок цвета
     * @param sourceHue - Исходный оттенок (0-1)
     * @param targetHue - Целевой оттенок (0-1)
     * @param amount - Коэффициент изменения (0-1)
     * @returns Новый оттенок (0-1)
     */
    static tint(sourceHue, targetHue, amount) {
        const diff = targetHue - sourceHue;
        const dH = diff * amount;
        let newh = sourceHue + dH;
        // Нормализация значения в диапазон 0-1
        if (newh < 0)
            newh += 1;
        if (newh > 1)
            newh -= 1;
        return newh;
    }
}
//# sourceMappingURL=ColorHelper.js.map