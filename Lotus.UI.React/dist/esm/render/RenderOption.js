import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StringHelper } from 'lotus-core/helpers';
import { Assert } from 'lotus-core/utils';
import { Text } from '#components/Display';
import { HorizontalStack } from '#components/Layout';
import { RenderIcon } from './RenderIcon';
/**
 * Вспомогательный класс для отрисовки опции
 */
export class RenderOption {
    /**
     * Отрисовка иконки и контента опции
     * @param size Размер элемента UI
     * @param option Опция
     * @param imageDatabase База данных изображений
     * @param wrapContainer Следует ли обвернуть в горизонтальный контейнер
     * @returns ReactElement
     */
    static renderOption(size, option, imageDatabase, wrapContainer) {
        if (StringHelper.isNullOrEmpty(option.label)) {
            if (Assert.existValue(option.icon)) {
                return RenderIcon.renderIcon(size, option.icon, undefined, undefined, undefined, imageDatabase);
            }
            else {
                return _jsx(_Fragment, {});
            }
        }
        else {
            if (Assert.existValue(option.icon)) {
                if (wrapContainer) {
                    return (_jsxs(HorizontalStack, { ...wrapContainer, hAlign: wrapContainer.hAlign ?? 'flex-start', spacing: size, vAlign: wrapContainer.vAlign ?? 'center', children: [RenderIcon.renderIcon(size, option.icon, undefined, undefined, undefined, imageDatabase), _jsx(Text, { disabled: option.disabled, fontSize: size, children: option.label })] }));
                }
                else {
                    return (_jsxs(_Fragment, { children: [RenderIcon.renderIcon(size, option.icon, undefined, undefined, undefined, imageDatabase), _jsx(Text, { disabled: option.disabled, fontSize: size, children: option.label })] }));
                }
            }
            else {
                if (wrapContainer) {
                    return (_jsx(HorizontalStack, { ...wrapContainer, hAlign: wrapContainer.hAlign ?? 'flex-start', spacing: size, vAlign: wrapContainer.vAlign ?? 'center', children: _jsx(Text, { disabled: option.disabled, fontSize: size, children: option.label }) }));
                }
                else {
                    return (_jsx(Text, { disabled: option.disabled, fontSize: size, children: option.label }));
                }
            }
        }
    }
}
//# sourceMappingURL=RenderOption.js.map