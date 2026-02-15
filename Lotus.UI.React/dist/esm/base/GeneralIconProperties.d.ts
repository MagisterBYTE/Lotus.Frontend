import { IImageDatabase } from 'lotus-core/resources/image';
import { TCssProperties, TIconPlacement, TSizeType } from '#types';
/**
 * Общие свойства иконки для элемента UI
 */
export interface IGeneralIconProperties {
    /**
     * Данные иконки
     */
    icon?: any;
    /**
     * Размер иконки
     */
    iconSize?: TSizeType;
    /**
     * Цвет иконки (влияет только на векторные)
     */
    iconColor?: string;
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