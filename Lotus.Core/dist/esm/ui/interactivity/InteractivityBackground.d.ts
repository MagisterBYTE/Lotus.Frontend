import { IGeneralBackgroundProperties } from '../base';
import { ThemeColorVariant, TThemePaletteActionType, TThemePaletteComponentStructuralPart } from '../theme/types';
import { TCssProperties } from '../types';
import { TInteractivityState } from './InteractivityState';
export type TInteractivityBackgroundType = 'initial' | 'none' | 'mandatory';
/**
 * Интерактивное взаимодействие фона элемента
 */
export interface IInteractivityBackgroundProperties extends IGeneralBackgroundProperties {
    /**
     * Цвет фона при наведении
     */
    hoverBackColor?: ThemeColorVariant;
    /**
     * Цвет фона при нажатии
     */
    pressedBackColor?: ThemeColorVariant;
}
export declare class InteractivityBackgroundLogic {
    static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static getProperties(element: any, type: TInteractivityBackgroundType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityBackgroundType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
}
