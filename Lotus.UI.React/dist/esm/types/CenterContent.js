/**
 * Массив доступных значений центрирования контента
 */
export const TCenterContentValues = ['horizontally', 'vertically', 'center'];
/**
 * Enum типа центрирования контента
 */
export const TCenterContents = {
    Horizontally: TCenterContentValues[0],
    Vertically: TCenterContentValues[1],
    Center: TCenterContentValues[2],
    getAllValues() {
        return TCenterContentValues;
    },
    isCenterContent(value) {
        if (typeof value === 'string') {
            return TCenterContentValues.includes(value);
        }
        return false;
    },
    getByIndex(index) {
        return TCenterContentValues[index];
    },
    getByName(name) {
        return TCenterContentValues.find((v) => v === name);
    }
};
//# sourceMappingURL=CenterContent.js.map