export class EnumHelper {
    /**
     * Проверка на установленный флаг
     * @param value Значение
     * @param flag Проверяемый флаг
     * @returns Статус установки флага
     */
    static isFlagSet(value, flag) {
        if (value) {
            if (flag) {
                return (value & flag) != 0;
            }
        }
        return false;
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
