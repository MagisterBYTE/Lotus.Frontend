import { TCssProperties } from '#types';
import { IEffectContextProps, TInteractivityState } from '../types';
import { TInteractivityBorderType } from './InteractivityBorderType';
/**
 * Класс для применения логики интерактивности к границе элемента
 */
export declare abstract class InteractivityBorderLogic {
    /**
     * Построить свойства Css на основании контекста и указанного состояния элемента
     * @param element Элемент (его пропсы)
     * @param state Состояние интерактивности элемента UI
     * @param context Текущий контекст элемента
     * @returns
     */
    static getEffectByState(element: any, state: TInteractivityState, context?: IEffectContextProps): TCssProperties;
    /**
     * Создать свойства Css
     * @param element Элемент (его пропсы)
     * @param type Тии интерактивности фона
     * @param state Состояние интерактивности элемента UI
     * @param context Текущий контекст элемента
     * @returns
     */
    static createProperties(element: any, type: TInteractivityBorderType, state: TInteractivityState, context?: IEffectContextProps): TCssProperties;
    /**
     * Заполнить указанные свойства Css
     * @param target Свойства Css
     * @param element Элемент (его пропсы)
     * @param type Тип интерактивности границы
     * @param state Состояние интерактивности элемента UI
     * @param context Текущий контекст элемента
     * @returns
     */
    static fillProperties(target: TCssProperties, element: any, type: TInteractivityBorderType, state: TInteractivityState, context?: IEffectContextProps): TCssProperties;
}
//# sourceMappingURL=InteractivityBorderLogic.d.ts.map