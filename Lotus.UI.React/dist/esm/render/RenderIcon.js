import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Assert } from 'lotus-core/utils';
import { IconContext } from 'react-icons';
import { CssSizerHelper } from '#helpers';
import { ThemeInstance } from '#theme';
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
        const iconColorText = (iconColor !== undefined) ? ThemeInstance.getElementColor(iconColor)?.toCSSRgbValue() : undefined;
        // Если строка
        if (typeof icon === 'string') {
            const sizeIcon = `${CssSizerHelper.convertSizeToIconInPixel(size)}px`;
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
                const sizeIcon = `${CssSizerHelper.convertSizeToIconInPixel(size)}px`;
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
            const sizeIcon = `${CssSizerHelper.convertSizeToIconInRem(size)}rem`;
            if (other) {
                if (wrapDiv) {
                    return (_jsxs("div", { style: wrapDivStyle, children: [_jsx(IconContext.Provider, { value: { size: sizeIcon, color: iconColorText, style: iconStyle }, children: icon }), other] }));
                }
                else {
                    return (_jsxs(_Fragment, { children: [_jsx(IconContext.Provider, { value: { size: sizeIcon, color: iconColorText, style: iconStyle }, children: icon }), other] }));
                }
            }
            else {
                return (_jsx(IconContext.Provider, { value: { size: sizeIcon, color: iconColorText, style: iconStyle }, children: icon }));
            }
        }
    }
}
//# sourceMappingURL=RenderIcon.js.map