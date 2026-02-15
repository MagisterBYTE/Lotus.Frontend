/**
 * Тип события для включения/отключения кнопки сохранить
 */
export const DisabledSaveButtonEventType = 'DisabledSaveButtonEventType' as const;

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

export const createDisabledSaveButtonEvent = (disabled: boolean): Event => 
{
  const data: IDisabledSaveButtonEventData = { disabled };
  const event = new CustomEvent<IDisabledSaveButtonEventData>(DisabledSaveButtonEventType, { detail: data });
  return event;
};