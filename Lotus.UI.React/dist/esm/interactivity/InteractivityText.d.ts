import { IGeneralTextProperties } from '#base';
import { TThemeColor, TThemePaletteActionType, TThemePaletteComponentStructuralPart } from '#theme/types';
import { TCssProperties } from '#types';
import { TInteractivityState } from './InteractivityState';
export type TInteractivityTextType = 'default' | 'background';
/**
 * Интерактивное взаимодействие текста элемента
 */
export interface IInteractivityTextProperties extends IGeneralTextProperties {
    /**
     * Цвет текста при наведении
     */
    hoverTextColor?: TThemeColor;
    /**
     * Цвет текста при нажатии
     */
    pressedTextColor?: TThemeColor;
}
export declare abstract class InteractivityTextLogic {
    static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static getProperties(element: any, type: TInteractivityTextType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityTextType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
}
//# sourceMappingURL=InteractivityText.d.ts.map