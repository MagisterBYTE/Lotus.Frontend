import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OptionHelper } from 'lotus-core/modules/option';
import { RenderOption } from './RenderOption';
/**
 * Вспомогательный класс для отрисовки произвольного объекта
 */
export class RenderItem {
    /**
     * Отрисовка произвольного элемента
     * @param size Размер элемента UI
     * @param item Объект
     * @param imageDatabase База данных изображений
     * @param wrapContainer Следует ли обвернуть в горизонтальный контейнер
     * @returns ReactElement
     */
    static renderItem(size, item, imageDatabase, wrapContainer) {
        if (OptionHelper.instanceOfOption(item)) {
            return RenderOption.renderOption(size, item, imageDatabase, wrapContainer);
        }
        return _jsx(_Fragment, {});
    }
}
//# sourceMappingURL=RenderItem.js.map