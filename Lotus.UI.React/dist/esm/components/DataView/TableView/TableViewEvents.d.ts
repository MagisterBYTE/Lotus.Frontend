/**
 * Тип события для включения/отключения кнопки сохранить
 */
export declare const DisabledSaveButtonEventType: "DisabledSaveButtonEventType";
/**
 * Данные события для включения/отключения кнопки сохранить
 */
export interface IDisabledSaveButtonEventData {
    disabled: boolean;
}
/**
 * Событие для включения/отключения кнопки сохранить
 */
export type DisabledSaveButtonEvent = CustomEvent<IDisabledSaveButtonEventData>;
export declare const createDisabledSaveButtonEvent: (disabled: boolean) => Event;
//# sourceMappingURL=TableViewEvents.d.ts.map