
/**
 * Функция-обработчик события изменения свойства.
 * Используется для уведомления подписчиков о том, что значение свойства объекта было изменено.
 * 
 * @callback PropertyChangedFunction
 * @param {string} [propertyName] - Имя изменившегося свойства. Если не указано, подразумевается изменение всех свойств объекта.
 * @param {unknown} [sender] - Объект, инициировавший событие (источник).
 * @returns {void}
 */
export type PropertyChangedFunction = (propertyName?: string, sender?: unknown) => void;

/**
 * Интерфейс для объектов, которые могут информировать об изменении свойства
 */
export interface INotifyPropertyChanged
{
  /**
   * Метод для добавления наблюдателя за объектом
   * @param handler Функция-обработчик события изменения свойства
   */
  addPropertyChanged: (handler: PropertyChangedFunction) => void

   /**
   * Метод для удаления наблюдателя за объектом
   * @param handler Функция-обработчик события изменения свойства
   */
  removePropertyChanged: (handler: PropertyChangedFunction) => void 
}

/**
 * Проверка объекта на поддержку интерфейса {@link INotifyPropertyChanged}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export function instanceOfNotifyPropertyChanged(value: unknown): value is INotifyPropertyChanged
{
  if (value && typeof value === 'object')
  {
    return 'addPropertyChanged' in value && typeof value.addPropertyChanged === 'function';
  }

  return false;
}

/**
 * Преобразование объекта к интерфейсу {@link INotifyPropertyChanged}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export function castToNotifyPropertyChanged(value: unknown): INotifyPropertyChanged | undefined
{
  if (instanceOfNotifyPropertyChanged(value))
  {
    return value;
  }
  else
  {
    return undefined;
  }
}
