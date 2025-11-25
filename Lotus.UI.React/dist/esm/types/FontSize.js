export const TFontSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
export const instanceOfFontSize = (value) => {
    if (value && typeof value === 'string') {
        return TFontSizes.includes(value);
    }
    return false;
};
export const castToFontSize = (value) => {
    if (instanceOfFontSize(value)) {
        return value;
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=FontSize.js.map