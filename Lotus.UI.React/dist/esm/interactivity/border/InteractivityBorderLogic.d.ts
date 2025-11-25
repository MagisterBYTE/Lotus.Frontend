import { TInteractivityState } from '#interactivity';
import { TThemePaletteActionType, TThemePaletteComponentStructuralPart } from '#theme/types';
import { TCssProperties } from '#types';
import { TInteractivityBorderType } from './InteractivityBorderType';
export declare abstract class InteractivityBorderLogic {
    static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static getProperties(element: any, type: TInteractivityBorderType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityBorderType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
}
//# sourceMappingURL=InteractivityBorderLogic.d.ts.map