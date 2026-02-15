/**
 * Массив форматов хранения файла в базе данных.
 */
export const TResourceFileSaveFormatValues = ['base64', 'raw'];
/**
 * Enum формата хранения файла в базе данных.
 */
export const TResourceFileSaveFormats = {
    /**
     * Данные файла в формате строки base64.
     */
    Base64: TResourceFileSaveFormatValues[0],
    /**
     * Данные файла в формате байтового массива.
     */
    Raw: TResourceFileSaveFormatValues[1],
    getAllValues() {
        return TResourceFileSaveFormatValues;
    },
    isResourceFileSaveFormat(value) {
        if (typeof value === 'string') {
            return TResourceFileSaveFormatValues.includes(value);
        }
        return false;
    },
    getByIndex(index) {
        return TResourceFileSaveFormatValues[index];
    },
    getByName(name) {
        return TResourceFileSaveFormatValues.find((v) => v === name);
    }
};
//# sourceMappingURL=ResourceFileSaveFormat.js.map