export class NumberHelper {
    /**
     * Сравнение числовых значений
     * @param left Левое значение
     * @param right Правое значение
     * @param isDesc Статус сравнения по убыванию
     * @returns Статус сравнения
     */
    static compare(left, right, isDesc) {
        let status = 0;
        if (left) {
            if (right) {
                status = Math.sign(left - right);
            }
            else {
                status = 1;
            }
        }
        else {
            if (right) {
                status = -1;
            }
            else {
                status = 0;
            }
        }
        if (isDesc) {
            if (status > 0)
                return -1;
            else {
                if (status < 0)
                    return 1;
                else
                    return 0;
            }
        }
        return status;
    }
    /**
     * Проверка на установленный флаг
     * @param value Значение
     * @param flag Проверяемый флаг
     * @returns Статус установки флага
     */
    static isFlagSet(value, flag) {
        return (value & flag) != 0;
    }
    /**
     * Установка флага
     * @param value Значение
     * @param flag Флаг
     * @returns Новое значение
     */
    static setFlag(value, flags) {
        value |= flags;
        return value;
    }
    /**
     * Очистка флага
     * @param value Значение
     * @param flags Флаг
     * @returns Новое значение
     */
    static clearFlag(value, flags) {
        value &= ~flags;
        return value;
    }
}
//# sourceMappingURL=NumberHelper.js.map