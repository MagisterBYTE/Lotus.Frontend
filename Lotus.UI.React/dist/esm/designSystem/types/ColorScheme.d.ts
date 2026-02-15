import { IOption } from 'lotus-core/modules/option';
/**
 * Массив значений цветовой схемы
 */
export declare const TColorSchemeValues: readonly ["light", "dark"];
/**
 * Цветовая схема
 */
export type TColorScheme = (typeof TColorSchemeValues)[number];
/**
 * Enum цветовой схемы
 */
export declare const TColorSchemes: {
    readonly Light: "light";
    readonly Dark: "dark";
    /**
     * Возвращает массив всех возможных значений
     */
    readonly getAllValues: () => typeof TColorSchemeValues;
    /**
     * Type Guard для проверки принадлежности значения к TColorScheme
     */
    readonly isColorScheme: (value: unknown) => value is TColorScheme;
    /**
     * Возвращает значение по индексу
     */
    readonly getByIndex: (index: number) => TColorScheme | undefined;
    /**
     * Возвращает значение по строковому имени
     */
    readonly getByName: (name: string) => TColorScheme | undefined;
    /**
   * Набор цветовых схем в виде опций
   */
    readonly getAsOptions: () => IOption<TColorScheme>[];
};
//# sourceMappingURL=ColorScheme.d.ts.map