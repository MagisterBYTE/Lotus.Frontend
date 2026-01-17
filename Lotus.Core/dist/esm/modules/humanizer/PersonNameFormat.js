/**
 * Массив значений форматов имени
 */
export const TPersonNameFormatValues = ['short', 'full', 'display', 'initials'];
/**
 * Объект для представления форматов имени
 */
export const TPersonNameFormats = {
    Short: TPersonNameFormatValues[0],
    Full: TPersonNameFormatValues[1],
    Display: TPersonNameFormatValues[2],
    Initials: TPersonNameFormatValues[3],
    getAllValues() {
        return TPersonNameFormatValues;
    },
    isPersonNameFormat(value) {
        return TPersonNameFormatValues.includes(value);
    },
    getByIndex(index) {
        return TPersonNameFormatValues[index];
    },
    getByName(name) {
        return TPersonNameFormatValues.find((v) => v === name);
    }
};
//# sourceMappingURL=PersonNameFormat.js.map