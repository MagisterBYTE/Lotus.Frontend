/**
 * Массив доступных акцентов шрифта
 */
export const TFontAccentValues = ['default', 'accent', 'monospace'];
/**
 * Enum типа акцента шрифта
 */
export const TFontAccents = {
    Default: TFontAccentValues[0],
    Accent: TFontAccentValues[1],
    Monospace: TFontAccentValues[2],
    getAllValues() {
        return TFontAccentValues;
    },
    isFontAccent(value) {
        if (typeof value === 'string') {
            return TFontAccentValues.includes(value);
        }
        return false;
    },
    getByIndex(index) {
        return TFontAccentValues[index];
    },
    getByName(name) {
        return TFontAccentValues.find((v) => v === name);
    }
};
//# sourceMappingURL=FontAccent.js.map