import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable jsx-a11y/alt-text */
import { ColorCssHelper } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { IconContext } from 'react-icons';
import { IconSizes } from '#designSystem/sizes';
/**
 * Отрисовка иконки
 */
export class RenderIcon {
    /**
     * Отрисовка иконки и контента
     * @param size Размер элемента UI
     * @param icon Данные иконки
     * @param other Другие данные
     * @param iconStyle Стиль иконки
     * @param iconColor Цвет иконки (влияет только на векторные)
     * @param imageDatabase База данных изображений
     * @param wrapDiv Следует ли обвернуть в блок div
     * @returns ReactElement
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, max-params
    static renderIcon(size, icon, other, iconStyle, iconColor, imageDatabase, wrapDiv, wrapDivStyle) {
        if (Assert.emptyValue(icon))
            return undefined;
        const iconColorCss = ColorCssHelper.getColorCss(iconColor);
        // Если строка
        if (typeof icon === 'string') {
            const sizeIcon = `${IconSizes.Default.toPixel(size)}px`;
            if (other) {
                if (wrapDiv) {
                    return (_jsxs("div", { style: wrapDivStyle, children: [_jsx("img", { height: sizeIcon, src: icon, style: iconStyle, width: sizeIcon }), other] }));
                }
                else {
                    return (_jsxs(_Fragment, { children: [_jsx("img", { height: sizeIcon, src: icon, style: iconStyle, width: sizeIcon }), other] }));
                }
            }
            else {
                return _jsx("img", { height: sizeIcon, src: icon, style: iconStyle, width: sizeIcon });
            }
        }
        // Если это число есть база данных
        if (typeof icon === 'number' && imageDatabase) {
            const iconData = imageDatabase.getImageByIdOrName(icon);
            if (iconData) {
                const sizeIcon = `${IconSizes.Default.toPixel(size)}px`;
                if (other) {
                    if (wrapDiv) {
                        return (_jsxs("div", { style: wrapDivStyle, children: [_jsx("img", { height: sizeIcon, src: iconData.source, style: iconStyle, width: sizeIcon }), other] }));
                    }
                    else {
                        return (_jsxs(_Fragment, { children: [_jsx("img", { height: sizeIcon, src: iconData.source, style: iconStyle, width: sizeIcon }), other] }));
                    }
                }
                else {
                    return _jsx("img", { height: sizeIcon, src: iconData.source, style: iconStyle, width: sizeIcon });
                }
            }
            return _jsx(_Fragment, {});
        }
        // Это иконка React
        else {
            const sizeIcon = IconSizes.Default.toRem(size);
            if (other) {
                if (wrapDiv) {
                    return (_jsxs("div", { style: wrapDivStyle, children: [_jsx(IconContext.Provider, { value: { size: sizeIcon, color: iconColorCss, style: iconStyle }, children: icon }), other] }));
                }
                else {
                    return (_jsxs(_Fragment, { children: [_jsx(IconContext.Provider, { value: { size: sizeIcon, color: iconColorCss, style: iconStyle }, children: icon }), other] }));
                }
            }
            else {
                return (_jsx(IconContext.Provider, { value: { size: sizeIcon, color: iconColorCss, style: iconStyle }, children: icon }));
            }
        }
    }
}
//# sourceMappingURL=RenderIcon.js.map