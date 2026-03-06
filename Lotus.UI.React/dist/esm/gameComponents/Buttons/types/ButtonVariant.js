/**
 * Массив доступных значений вариантов кнопки
 */
export const TButtonVariantValues = ['default', 'light', 'gray', 'coffee'];
/**
 * Варианта кнопки
 */
export const TButtonVariants = {
    Default: TButtonVariantValues[0],
    Light: TButtonVariantValues[1],
    Gray: TButtonVariantValues[2],
    Coffee: TButtonVariantValues[3],
    getAllValues() {
        return TButtonVariantValues;
    },
    isButtonVariant(value) {
        if (typeof value === 'string') {
            return TButtonVariantValues.includes(value);
        }
        return false;
    },
    getByIndex(index) {
        return TButtonVariantValues[index];
    },
    getByName(name) {
        return TButtonVariantValues.find((v) => v === name);
    }
};
//# sourceMappingURL=ButtonVariant.js.map