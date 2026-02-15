
/**
 * Массив значений типов обратной связи
 */
export const TFeedbackTypeValues = ['alert', 'snackbar', 'modal', 'progress'] as const;

/**
 * Тип обратной связи
 */
export type TFeedbackType = (typeof TFeedbackTypeValues)[number];

/**
 * Enum типа обратной связи
 */
export const TFeedbackTypes = {

  /**
   * Простое предупреждение без взаимодействия
   */
  Alert: TFeedbackTypeValues[0],

  /**
   * Информирование с возможностью взаимодействия
   */
  Snackbar: TFeedbackTypeValues[1],

  /**
   * Модальное окно
   */
  Modal: TFeedbackTypeValues[2],

  /**
   * Информирование с прогрессом
   */
  Progress: TFeedbackTypeValues[3],

  /**
   * Возвращает массив всех возможных значений
   */
  getAllValues(): typeof TFeedbackTypeValues 
  {
    return TFeedbackTypeValues;
  },

  /**
   * Type Guard для проверки принадлежности значения к TFeedbackType
   */
  isFeedbackType(value: unknown): value is TFeedbackType 
  {
    if (typeof value === 'string') 
    {
      return TFeedbackTypeValues.includes(value as TFeedbackType);
    }
    return false;
  },

  /**
   * Возвращает значение по индексу
   */
  getByIndex(index: number): TFeedbackType | undefined 
  {
    return TFeedbackTypeValues[index];
  },

  /**
   * Возвращает значение по строковому имени
   */
  getByName(name: string): TFeedbackType | undefined 
  {
    return TFeedbackTypeValues.find((v) => v === name);
  }
} as const;
