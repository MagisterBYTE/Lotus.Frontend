export const TElementSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
export const instanceOfElementSize = (value) => {
    if (value && typeof value === 'string') {
        return TElementSizes.includes(value);
    }
    return false;
};
export const castToElementSize = (value) => {
    if (instanceOfElementSize(value)) {
        return value;
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=ElementSize.js.map