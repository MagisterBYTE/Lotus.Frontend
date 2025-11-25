import { IImageDatabase } from 'lotus-core/resources/image';
import { TThemeColor } from '../theme/types';
import { TCssProperties, TElementSize, TIconPlacement } from '../types';
export type FunctionGeneralIconDelegate = (props: IGeneralIconProperties, context?: any) => any;
/**
 * Общие свойства иконки для элемента UI
 */
export interface IGeneralIconProperties {
    /**
     * Путь к изображению / либо компонент иконки / либо индекс изображения в базе
     */
    icon?: any | FunctionGeneralIconDelegate;
    /**
     * Размер иконки
     */
    iconSize?: TElementSize;
    /**
     * Цвет иконки (влияет только на векторные)
     */
    iconColor?: TThemeColor;
    /**
     * Стиль для отображения иконки
     */
    iconStyle?: TCssProperties;
    /**
     * Местоположение иконки
     */
    iconPlacement?: TIconPlacement;
    /**
     * База данных изображений
     */
    imageDatabase?: IImageDatabase;
}
//# sourceMappingURL=GeneralIconProperties.d.ts.map