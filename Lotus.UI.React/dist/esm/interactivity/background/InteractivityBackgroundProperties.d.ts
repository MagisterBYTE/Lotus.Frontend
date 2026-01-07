import { TColorToken } from 'lotus-core/modules/color';
import { IGeneralBackgroundProperties } from '#base';
import { TCssBorderColor } from '#types';
/**
 * Интерактивное взаимодействие фона элемента
 */
export interface IInteractivityBackgroundProperties extends IGeneralBackgroundProperties {
    /**
     * Цвет фона при наведении
     */
    bgHoverColor?: TCssBorderColor | TColorToken;
    /**
     * Цвет фона при нажатии
     */
    bgPressedColor?: TCssBorderColor | TColorToken;
}
//# sourceMappingURL=InteractivityBackgroundProperties.d.ts.map