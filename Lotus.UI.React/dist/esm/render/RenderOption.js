import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StringHelper } from 'lotus-core/helpers';
import { Assert } from 'lotus-core/utils';
import { HorizontalStack } from '#components/Layout';
import { RenderIcon } from './RenderIcon';
/**
 * Отрисовка опции
 */
export class RenderOption {
    /**
     * Отрисовка иконки и контента
     * @param size Размер элемента UI
     * @param option Опция
     * @param context Контекст вызова
     * @param imageDatabase База данных изображений
     * @param wrapContainer Следует ли обвернуть в блок div
     * @returns ReactElement
     */
    // eslint-disable-next-line max-params
    static renderOption(size, option, context, imageDatabase, wrapContainer) {
        // 1) Может отрисовать сама
        if (option.render) {
            return _jsx(_Fragment, { children: option.render(option, context) });
        }
        // 2) Пустая label
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
                    return (_jsxs(HorizontalStack, { hAlign: 'center', spacing: 'xs', vAlign: 'center', children: [RenderIcon.renderIcon(size, option.icon, undefined, undefined, undefined, imageDatabase), _jsx(_Fragment, { children: option.label })] }));
                }
                else {
                    return (_jsxs(_Fragment, { children: [RenderIcon.renderIcon(size, option.icon, undefined, undefined, undefined, imageDatabase), _jsx(_Fragment, { children: option.label })] }));
                }
            }
            else {
                return _jsx(_Fragment, { children: option.label });
            }
        }
    }
}
//# sourceMappingURL=RenderOption.js.map