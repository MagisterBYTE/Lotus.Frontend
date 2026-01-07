import { TCssProperties } from '#types';
import { IEffectContextProps, TInteractivityState } from '../types';
import { TInteractivityBackgroundType } from './InteractivityBackgroundType';
/**
 * Класс для применения логики интерактивности к фону элемента
 */
export declare abstract class InteractivityBackgroundLogic {
    /**
     * Построить свойства Css на основании контекста и указанного состояния элемента
     * @param element Элемент (его пропсы)
     * @param state Состояние интерактивности элемента UI
     * @param context Текущий контекст элемента
     * @returns
     */
    static buildEffectByState(element: any, state: TInteractivityState, context?: IEffectContextProps): TCssProperties;
    /**
     * Создать свойства Css
     * @param element Элемент (его пропсы)
     * @param type Тии интерактивности фона
     * @param state Состояние интерактивности элемента UI
     * @param context Текущий контекст элемента
     * @returns
     */
    static createProperties(element: any, type: TInteractivityBackgroundType, state: TInteractivityState, context?: IEffectContextProps): TCssProperties;
    /**
     * Заполнить указанные свойства Css
     * @param target Свойства Css
     * @param element Элемент (его пропсы)
     * @param type Тии интерактивности фона
     * @param state Состояние интерактивности элемента UI
     * @param context Текущий контекст элемента
     * @returns
     */
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityBackgroundType, state: TInteractivityState, context?: IEffectContextProps): TCssProperties;
}
//# sourceMappingURL=InteractivityBackgroundLogic.d.ts.map