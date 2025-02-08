export class EnumConverter {
    /**
     * Метод для получения всех значений перечисления.
     * @param enumValue - объект перечисления, где ключи - это имена, а значения - это соответствующие значения.
     * @returns массив всех значений перечисления.
     */
    static getValues(enumValue) {
        return Object.keys(enumValue).map((key) => enumValue[key]); // Используем !, чтобы указать TypeScript, что значение не null и не undefined.
    }
    /**
     * Метод для получения всех имен перечисления.
     * @param enumValue - объект перечисления, где ключи - это имена, а значения - это соответствующие значения.
     * @returns массив всех имен перечисления.
     */
    static getNames(enumValue) {
        return Object.keys(enumValue).map((key) => key); // Получаем ключи объекта, что соответствует именам перечисления.
    }
}
