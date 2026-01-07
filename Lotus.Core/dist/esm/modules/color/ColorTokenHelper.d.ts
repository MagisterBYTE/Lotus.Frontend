import { TColorPalette } from './ColorPalette';
import { TColorSemantic } from './ColorSemantic';
import { TColorToken, TColorTokenTuple } from './ColorToken';
import { TColorVariantName } from './ColorVariantsTypes';
/**
 * Вспомогательный класс для работы с доступным типом цвета
 */
export declare abstract class ColorTokenHelper {
    /**
     * Карта для преобразования TColorToken в TColorTokenTuple
     * Доступна только для чтения
     */
    static readonly ColorTokenMap: ReadonlyMap<TColorToken, TColorTokenTuple>;
    /**
     * Функция для проверки, является ли цвет доступным цветом
     * @param color Проверяемый цвет
     * @returns Статус проверки
     */
    static instanceOf(color: unknown): color is TColorToken;
    /**
     * Создание вариант доступного цвета
     * @param color Цвета палитры или семантический тип цвета
     * @param colorVariant Именованный тип в вариативности цветов
     * @returns Доступный цвет
     */
    static create(color: TColorPalette | TColorSemantic, colorVariant: TColorVariantName): TColorToken;
    /**
     * Проверить, является ли токен семантическим
     */
    static isSemanticToken(token: TColorToken): boolean;
    /**
     * Проверить, является ли токен палитрой
     */
    static isPaletteToken(token: TColorToken): boolean;
    /**
     * Получить вариацию цвета из токена
     */
    static getVariantFromToken(token: TColorToken): TColorVariantName;
    /**
     * Получить базовое имя цвета из токена (без вариации)
     */
    static getBaseColorFromToken(token: TColorToken): string;
    /**
     * Деконструкция доступного цвета
     * @param color Доступный цвет
     * @returns Соответствующий кортеж данных или undefined
     */
    static deconstruction(color: unknown): TColorTokenTuple | undefined;
    /**
     * Получить доступный цвета смещенный на указанную величину
     * @param color Доступный цвет
     * @returns Смещенный доступный цвет
     */
    static next(color: unknown, delta?: number): TColorToken | undefined;
}
//# sourceMappingURL=ColorTokenHelper.d.ts.map