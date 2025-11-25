import { TInteractivityState } from '#interactivity';
import { TThemePaletteActionType, TThemePaletteComponentStructuralPart } from '#theme/types';
import { TCssProperties } from '#types';
import { TInteractivityBackgroundType } from './InteractivityBackgroundType';
export declare abstract class InteractivityBackgroundLogic {
    static getEffectByState(element: any, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static getProperties(element: any, type: TInteractivityBackgroundType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityBackgroundType, state: TInteractivityState, part: TThemePaletteComponentStructuralPart, actionType?: TThemePaletteActionType): TCssProperties;
}
//# sourceMappingURL=InteractivityBackgroundLogic.d.ts.map