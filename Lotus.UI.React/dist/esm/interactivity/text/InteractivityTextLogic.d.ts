import { TInteractivityState } from '#interactivity';
import { TThemePaletteActionType, TThemePaletteComponentStructuralPart } from '#theme/types';
import { TCssProperties } from '#types';
import { TInteractivityTextType } from './InteractivityTextType';
export declare abstract class InteractivityTextLogic {
    static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static getProperties(element: any, type: TInteractivityTextType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityTextType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
}
//# sourceMappingURL=InteractivityTextLogic.d.ts.map