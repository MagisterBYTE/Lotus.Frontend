/**
 * Массив значений компонента для элемента команды
 */
export const TCommandElementTypeValues = ['button', 'icon', 'listItem', 'menuItem'];
/**
 * Enum компонента отображения для элемента команды
 */
export const TCommandElementTypes = {
    Button: TCommandElementTypeValues[0],
    Icon: TCommandElementTypeValues[1],
    ListItem: TCommandElementTypeValues[2],
    MenuItem: TCommandElementTypeValues[3],
    /**
     * Возвращает массив всех возможных значений
     */
    getAllValues() {
        return TCommandElementTypeValues;
    },
    /**
     * Type Guard для проверки принадлежности значения к TCommandElementType
     */
    isCommandElementType(value) {
        if (typeof value === 'string') {
            return TCommandElementTypeValues.includes(value);
        }
        return false;
    },
    /**
     * Возвращает значение по индексу
     */
    getByIndex(index) {
        return TCommandElementTypeValues[index];
    },
    /**
     * Возвращает значение по строковому имени
     */
    getByName(name) {
        return TCommandElementTypeValues.find((v) => v === name);
    }
};
//# sourceMappingURL=CommandElementType.js.map