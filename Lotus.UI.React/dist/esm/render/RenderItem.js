import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OptionHelper } from 'lotus-core/modules/option';
import { RenderOption } from './RenderOption';
/**
 * Отрисовка объекта как опции
 */
export class RenderItem {
    /**
     * Отрисовка иконки и контента
     * @param size Размер элемента UI
     * @param item Объект
     * @param context Контекст вызова
     * @param imageDatabase База данных изображений
     * @param wrapContainer Следует ли обвернуть в блок div
     * @returns ReactElement
     */
    // eslint-disable-next-line max-params
    static renderItem(size, item, context, imageDatabase, wrapContainer) {
        if (OptionHelper.instanceOfOption(item)) {
            return RenderOption.renderOption(size, item, context, imageDatabase, wrapContainer);
        }
        return _jsx(_Fragment, {});
    }
}
//# sourceMappingURL=RenderItem.js.map