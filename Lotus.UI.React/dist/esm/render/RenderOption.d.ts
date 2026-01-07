import { IOption } from 'lotus-core/modules/option';
import { IImageDatabase } from 'lotus-core/resources/image';
import { ReactElement } from 'react';
import { TSizeType } from '#types';
/**
 * Отрисовка опции
 */
export declare abstract class RenderOption {
    /**
     * Отрисовка иконки и контента
     * @param size Размер элемента UI
     * @param option Опция
     * @param context Контекст вызова
     * @param imageDatabase База данных изображений
     * @param wrapContainer Следует ли обвернуть в блок div
     * @returns ReactElement
     */
    static renderOption(size: TSizeType, option: IOption, context?: any, imageDatabase?: IImageDatabase, wrapContainer?: boolean): ReactElement;
}
//# sourceMappingURL=RenderOption.d.ts.map