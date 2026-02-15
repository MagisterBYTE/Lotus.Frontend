/**
 * Массив доступных вариантов размещения иконки
 */
export const TIconPlacementValues = ['left', 'right', 'top', 'bottom'];
/**
 * Enum варианта размещения иконки
 */
export const TIconPlacements = {
    Left: TIconPlacementValues[0],
    Right: TIconPlacementValues[1],
    Top: TIconPlacementValues[2],
    Bottom: TIconPlacementValues[3],
    getAllValues() {
        return TIconPlacementValues;
    },
    isIconPlacement(value) {
        if (typeof value === 'string') {
            return TIconPlacementValues.includes(value);
        }
        return false;
    },
    getByIndex(index) {
        return TIconPlacementValues[index];
    },
    getByName(name) {
        return TIconPlacementValues.find((v) => v === name);
    }
};
//# sourceMappingURL=IconPlacement.js.map