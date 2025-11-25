export const TLineSpacings = ['xs', 'sm', 'md', 'lg', 'xl'];
export const instanceOfLineSpacing = (value) => {
    if (value && typeof value === 'string') {
        return TLineSpacings.includes(value);
    }
    return false;
};
export const castToLineSpacing = (value) => {
    if (instanceOfLineSpacing(value)) {
        return value;
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=LineSpacing.js.map