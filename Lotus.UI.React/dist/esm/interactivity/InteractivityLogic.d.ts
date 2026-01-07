import { TCssProperties } from '#types';
import { IInteractivityElementProperties } from './InteractivityElement';
import { IEffectContextProps, TInteractivityModel, TInteractivityState } from './types';
/**
 * Логика применения визуальных эффектов к элементу UI в зависимости от модель применения и состояния интерактивности элемента
 */
export declare abstract class InteractivityLogic {
    /**
     * Получить визуальный эффекты для фона элемента UI
     * @param model Модель применения визуальных эффектов к элементу UI
     * @param state Состояние интерактивности элемента UI
     * @param elem Интерактивный элемент
     * @param isSelected Контекст элемента UI для применения визуального эффекта
     * @returns Свойства CSSProperties
     */
    static getEffectProps(model: TInteractivityModel, state: TInteractivityState, element: IInteractivityElementProperties, context?: IEffectContextProps): TCssProperties;
}
//# sourceMappingURL=InteractivityLogic.d.ts.map