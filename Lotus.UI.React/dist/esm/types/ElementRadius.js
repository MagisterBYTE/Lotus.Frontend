export const TElementRadiuses = ['xs', 'sm', 'md', 'lg', 'xl'];
export const instanceOfElementRadius = (value) => {
    if (value && typeof value === 'string') {
        return TElementRadiuses.includes(value);
    }
    return false;
};
export const castToElementRadius = (value) => {
    if (instanceOfElementRadius(value)) {
        return value;
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=ElementRadius.js.map