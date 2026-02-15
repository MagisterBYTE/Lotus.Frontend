/**
 * Массив доступных ориентаций
 */
export const TOrientationValues = ['horizontal', 'vertical'];
/**
 * Enum типа ориентации
 */
export const TOrientations = {
    Horizontal: TOrientationValues[0],
    Vertical: TOrientationValues[1],
    getAllValues() {
        return TOrientationValues;
    },
    isOrientation(value) {
        if (typeof value === 'string') {
            return TOrientationValues.includes(value);
        }
        return false;
    },
    getByIndex(index) {
        return TOrientationValues[index];
    },
    getByName(name) {
        return TOrientationValues.find((v) => v === name);
    }
};
//# sourceMappingURL=Orientation.js.map