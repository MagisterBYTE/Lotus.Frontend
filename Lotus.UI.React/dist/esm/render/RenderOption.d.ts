import { IOption } from 'lotus-core/modules/option';
import { IImageDatabase } from 'lotus-core/resources/image';
import { ReactElement } from 'react';
import { IHorizontalStackProps } from '#components/Layout';
import { TSizeType } from '#types';
/**
 * Вспомогательный класс для отрисовки опции
 */
export declare abstract class RenderOption {
    /**
     * Отрисовка иконки и контента опции
     * @param size Размер элемента UI
     * @param option Опция
     * @param imageDatabase База данных изображений
     * @param wrapContainer Следует ли обвернуть в горизонтальный контейнер
     * @returns ReactElement
     */
    static renderOption(size: TSizeType, option: IOption, imageDatabase?: IImageDatabase, wrapContainer?: IHorizontalStackProps): ReactElement;
}
//# sourceMappingURL=RenderOption.d.ts.map