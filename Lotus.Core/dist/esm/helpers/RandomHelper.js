export class RandomHelper {
    /**
     * Получает случайное число в диапазоне от min до max
     * @param min Минимальное значение
     * @param max Максимальное значение
     * @returns Случайное число в диапазоне от min до max
     */
    static getMinMax(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    /**
     * Получает случайное число в диапазоне от 0 до max
     * @param max Максимальное значение
     * @returns Случайное число в диапазоне от 0 до max
     */
    static getMax(max) {
        return Math.floor(Math.random() * max);
    }
}
//# sourceMappingURL=RandomHelper.js.map