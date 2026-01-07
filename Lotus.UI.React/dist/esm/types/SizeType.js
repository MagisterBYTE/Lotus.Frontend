export const TSizeTypes = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
export const instanceOfSizeType = (value) => {
    if (value && typeof value === 'string') {
        return TSizeTypes.includes(value);
    }
    return false;
};
export const castToSizeType = (value) => {
    if (instanceOfSizeType(value)) {
        return value;
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=SizeType.js.map