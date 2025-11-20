import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Theme } from '#theme/types';
import { IconContext } from 'react-icons';
import { CssSizerHelper } from './CssSizerHelper';
/**
 * Отрисовка вспомогательных элементов UI
 */
export class RenderComponentHelper {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static renderIconAndValue(size, icon, other, iconStyle, iconColor, imageDatabase, wrapDiv, wrapDivStyle) {
        const iconColorText = (iconColor !== undefined) ? Theme.getColor(iconColor)?.toCSSRgbValue() : undefined;
        // Если строка
        if (typeof icon === 'string') {
            const sizeIcon = `${CssSizerHelper.convertControlSizeToIconSizeInPixel(size)}px`;
            if (other) {
                if (wrapDiv) {
                    return _jsxs("div", { style: wrapDivStyle, children: [_jsx("img", { src: icon, width: sizeIcon, height: sizeIcon, style: iconStyle }), other] });
                }
                else {
                    return _jsxs(_Fragment, { children: [_jsx("img", { src: icon, width: sizeIcon, height: sizeIcon, style: iconStyle }), other] });
                }
            }
            else {
                return _jsx("img", { src: icon, width: sizeIcon, height: sizeIcon, style: iconStyle });
            }
        }
        // Если это число есть база данных
        if (typeof icon === 'number' && imageDatabase) {
            const iconData = imageDatabase.getImageByIdOrName(icon);
            if (iconData) {
                const sizeIcon = `${CssSizerHelper.convertControlSizeToIconSizeInPixel(size)}px`;
                if (other) {
                    if (wrapDiv) {
                        return _jsxs("div", { style: wrapDivStyle, children: [_jsx("img", { src: iconData.source, width: sizeIcon, height: sizeIcon, style: iconStyle }), other] });
                    }
                    else {
                        return _jsxs(_Fragment, { children: [_jsx("img", { src: iconData.source, width: sizeIcon, height: sizeIcon, style: iconStyle }), other] });
                    }
                }
                else {
                    return _jsx("img", { src: iconData.source, width: sizeIcon, height: sizeIcon, style: iconStyle });
                }
            }
            return _jsx(_Fragment, {});
        }
        // Это иконка React
        else {
            const sizeIcon = `${CssSizerHelper.convertControlSizeToIconSizeInRem(size)}rem`;
            if (other) {
                if (wrapDiv) {
                    return _jsxs("div", { style: wrapDivStyle, children: [_jsx(IconContext.Provider, { value: { size: sizeIcon, color: iconColorText, style: iconStyle }, children: icon }), other] });
                }
                else {
                    return _jsxs(_Fragment, { children: [_jsx(IconContext.Provider, { value: { size: sizeIcon, color: iconColorText, style: iconStyle }, children: icon }), other] });
                }
            }
            else {
                return _jsx(IconContext.Provider, { value: { size: sizeIcon, color: iconColorText, style: iconStyle }, children: icon });
            }
        }
    }
}
//# sourceMappingURL=RenderComponentHelper.js.map