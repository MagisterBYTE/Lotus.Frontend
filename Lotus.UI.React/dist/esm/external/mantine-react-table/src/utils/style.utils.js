export const parseCSSVarId = (id) => id.replace(/[^a-zA-Z0-9]/g, '_');
export const getPrimaryShade = (theme) => typeof theme.primaryShade === 'number'
    ? theme.primaryShade
    : (theme.primaryShade?.dark ?? 7);
export const getPrimaryColor = (theme, shade) => theme.colors[theme.primaryColor][shade ?? getPrimaryShade(theme)];
export function dataVariable(name, value) {
    const key = `data-${name}`;
    switch (typeof value) {
        case 'boolean':
            return value ? { [key]: '' } : null;
        case 'number':
            return { [key]: `${value}` };
        case 'string':
            return { [key]: value };
        default:
            return null;
    }
}
//# sourceMappingURL=style.utils.js.map