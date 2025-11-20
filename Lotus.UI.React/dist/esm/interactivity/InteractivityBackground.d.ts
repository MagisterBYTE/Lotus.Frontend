import { IGeneralBackgroundProperties } from '#base';
import { TThemeColor, TThemePaletteComponentStructuralPart, TThemePaletteActionType } from '#theme/types';
import { TCssProperties } from '#types';
import { TInteractivityState } from './InteractivityState';
export type TInteractivityBackgroundType = 'initial' | 'none' | 'mandatory';
/**
 * Интерактивное взаимодействие фона элемента
 */
export interface IInteractivityBackgroundProperties extends IGeneralBackgroundProperties {
    /**
     * Цвет фона при наведении
     */
    hoverBackColor?: TThemeColor;
    /**
     * Цвет фона при нажатии
     */
    pressedBackColor?: TThemeColor;
}
export declare abstract class InteractivityBackgroundLogic {
    static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static getProperties(element: any, type: TInteractivityBackgroundType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityBackgroundType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
}
//# sourceMappingURL=InteractivityBackground.d.ts.map