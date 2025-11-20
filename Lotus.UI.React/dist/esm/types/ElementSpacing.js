export const TElementSpacings = ['xs', 'sm', 'md', 'lg', 'xl'];
export const instanceOfElementSpacing = (value) => {
    if (value && typeof value === 'string') {
        return TElementSpacings.includes(value);
    }
    return false;
};
export const castToElementSpacing = (value) => {
    if (instanceOfElementSpacing(value)) {
        return value;
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=ElementSpacing.js.map