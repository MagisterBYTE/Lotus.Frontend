export declare class EnumConverter {
    /**
     * Метод для получения всех значений перечисления.
     * @param enumValue - объект перечисления, где ключи - это имена, а значения - это соответствующие значения.
     * @returns массив всех значений перечисления.
     */
    static getValues<TEnum>(enumValue: Record<string, TEnum>): TEnum[];
    /**
     * Метод для получения всех имен перечисления.
     * @param enumValue - объект перечисления, где ключи - это имена, а значения - это соответствующие значения.
     * @returns массив всех имен перечисления.
     */
    static getNames<TEnum>(enumValue: Record<string, TEnum>): string[];
}
