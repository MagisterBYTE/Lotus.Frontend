import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/* eslint-disable jsx-a11y/alt-text */
import { BrowserHelper, ImageHelper } from 'lotus-core/helpers';
import { ColorCssHelper } from 'lotus-core/modules/color';
import { Assert } from 'lotus-core/utils';
import { isValidElement } from 'react';
import { IconContext } from 'react-icons';
import { IconSizes } from '#designSystem/sizes';
/**
 * Вспомогательный класс для отрисовки иконки
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
        const iconColorCss = ColorCssHelper.getColor(iconColor);
        // Если строка и формат данных DataURL или AbsoluteUrl
        if (typeof icon === 'string' && (ImageHelper.isDataURL(icon) || BrowserHelper.isAbsoluteUrl(icon))) {
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
        // Если это число или просто строка есть база данных
        if ((typeof icon === 'number' || typeof icon === 'string') && imageDatabase) {
            const iconData = imageDatabase.getImageByIdOrName(icon);
            if (!iconData)
                return _jsx(_Fragment, { children: icon });
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
        // Это иконка React
        if (isValidElement(icon)) {
            const sizeIcon = IconSizes.Default.toRemCss(size);
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