import { IGeneralBorderProperties } from '../base';
import { ThemeColorVariant, TThemePaletteActionType, TThemePaletteComponentStructuralPart } from '../theme';
import { TCssProperties } from '../types';
import { TInteractivityState } from './InteractivityState';
export type TInteractivityBorderType = 'none' | 'maybe' | 'invisible' | 'mandatory';
/**
 * Интерактивное взаимодействие границы элемента
 */
export interface IInteractivityBorderProperties extends IGeneralBorderProperties {
    /**
     * Цвет границы при наведении
     */
    hoverBorderColor?: ThemeColorVariant;
    /**
     * Цвет границы при нажатии
     */
    pressedBorderColor?: ThemeColorVariant;
}
export declare class InteractivityBorderLogic {
    static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static getProperties(element: any, type: TInteractivityBorderType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityBorderType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
}
