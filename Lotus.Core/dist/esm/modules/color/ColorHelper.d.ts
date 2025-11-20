import { IColorModelHSL } from './ColorModel';
/**
 * Вспомогательный класс для работы с цветами в различных форматах (RGB, HSL, HEX, именованные цвета).
 * Предоставляет методы для проверки, конвертации и манипуляций с цветами.
 * Все методы статические - экземпляр класса не требуется.
 */
export declare abstract class ColorHelper {
    /**
     * Проверяет, является ли число валидным значением цвета (0-255)
     * @param value - Проверяемое значение
     * @returns true если значение в диапазоне 0-255
     */
    static isColorValue(value: number): boolean;
    /**
     * Проверяет, является ли число валидным значением альфа-канала (0-1)
     * @param value - Проверяемое значение
     * @returns true если значение в диапазоне 0-1
     */
    static isAlphaValue(value: number): boolean;
    /**
     * Проверяет, является ли массив валидным RGB массивом [R, G, B]
     * @param rgb - Проверяемый массив
     * @returns true если массив содержит 3 валидных цветовых значения
     */
    static isRGBArray(rgb: number[]): boolean;
    /**
     * Проверяет, является ли массив валидным RGBA массивом [R, G, B, A]
     * @param rgba - Проверяемый массив
     * @returns true если массив содержит 3 валидных цветовых значения и валидное альфа-значение
     */
    static isRGBAArray(rgba: number[]): boolean;
    /**
     * Проверяет, является ли строка валидным 3-значным HEX цветом (#RGB)
     * @param colorString - Проверяемая строка
     * @returns true если строка соответствует формату #RGB
     */
    static isHex3(colorString: string): boolean;
    /**
     * Проверяет, является ли строка валидным 6-значным HEX цветом (#RRGGBB)
     * @param colorString - Проверяемая строка
     * @returns true если строка соответствует формату #RRGGBB
     */
    static isHex6(colorString: string): boolean;
    /**
     * Парсит строку цвета в числовой массив [R, G, B] или [R, G, B, A]
     * Поддерживает форматы: HEX, RGB/RGBA строки, именованные цвета
     * @param colorString - Строка цвета для парсинга
     * @returns Числовой массив цветовых компонент или undefined если не удалось распарсить
     */
    static parseColorString(colorString: string): number[] | undefined;
    /**
     * Возвращает числовое представление именованного цвета
     * @param colorString - Название цвета
     * @returns Числовой массив цветовых компонент или undefined если цвет не найден
     */
    static getColorName(colorString: string): number[] | undefined;
    /**
     * Проверяет, является ли объект валидным HSL цветом
     * @param hsla - Проверяемый объект
     * @returns true если объект содержит h, s, l свойства с валидными значениями
     */
    static isHSL(hsla: any): boolean;
    /**
     * Конвертирует RGB массив в HEX строку
     * @param c - RGB массив [R, G, B]
     * @returns HEX строка в формате #RRGGBB или #RGB (если возможно сокращение)
     */
    static rgb2hex(c: number[]): string;
    /**
     * Конвертирует число в HEX строку с ведущим нулем при необходимости
     * @param i - Число (0-255)
     * @returns HEX строка (2 символа)
     */
    private static int2hex;
    /**
     * Вспомогательная функция для HSL преобразований
     */
    private static hslval;
    /**
     * Конвертирует HSL цвет в RGB массив
     * @param hsl - HSL объект {h, s, l}
     * @returns RGB массив [R, G, B]
     */
    static hsl2rgbOld(hsl: any): number[];
    /**
   * Преобразует HSL цвет в RGB цвет (H в диапазоне 0-1)
   * @param hsl - объект HSL цвета
   * @returns объект RGB цвета
   */
    static hsl2rgb(hsl: any): number[];
    /**
     * Конвертирует RGB массив в HSL объект
     * @param rgb - RGB массив [R, G, B]
     * @returns HSL объект {h, s, l}
     */
    static rgb2hsl(rgb: number[]): IColorModelHSL;
    /**
     * Смешивает два цвета в заданной пропорции
     * @param s - Исходный цвет [R, G, B] или [R, G, B, A]
     * @param t - Целевой цвет [R, G, B] или [R, G, B, A]
     * @param amount - Коэффициент смешивания (0-1)
     * @returns Новый цветовой массив
     */
    static combine(s: number[], t: number[], amount: number): number[];
    /**
     * Инвертирует цвет
     * @param c - Исходный цвет [R, G, B] или [R, G, B, A]
     * @returns Инвертированный цветовой массив
     */
    static invert(c: number[]): number[];
    /**
     * Изменяет оттенок цвета
     * @param sourceHue - Исходный оттенок (0-1)
     * @param targetHue - Целевой оттенок (0-1)
     * @param amount - Коэффициент изменения (0-1)
     * @returns Новый оттенок (0-1)
     */
    static tint(sourceHue: number, targetHue: number, amount: number): number;
}
//# sourceMappingURL=ColorHelper.d.ts.map