/**
 * Массив доступных акцентов фона
 */
export const TBackgroundAccentValues = ['accent', 'glass'];
/**
 * Enum типа акцента фона
 */
export const TBackgroundAccents = {
    Accent: TBackgroundAccentValues[0],
    Glass: TBackgroundAccentValues[1],
    getAllValues() {
        return TBackgroundAccentValues;
    },
    isBackgroundAccent(value) {
        if (typeof value === 'string') {
            return TBackgroundAccentValues.includes(value);
        }
        return false;
    },
    getByIndex(index) {
        return TBackgroundAccentValues[index];
    },
    getByName(name) {
        return TBackgroundAccentValues.find((v) => v === name);
    }
};
//# sourceMappingURL=BackgroundAccent.js.map