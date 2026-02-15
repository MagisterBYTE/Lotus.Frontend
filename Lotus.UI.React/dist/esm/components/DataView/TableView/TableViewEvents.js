/**
 * Тип события для включения/отключения кнопки сохранить
 */
export const DisabledSaveButtonEventType = 'DisabledSaveButtonEventType';
export const createDisabledSaveButtonEvent = (disabled) => {
    const data = { disabled };
    const event = new CustomEvent(DisabledSaveButtonEventType, { detail: data });
    return event;
};
//# sourceMappingURL=TableViewEvents.js.map