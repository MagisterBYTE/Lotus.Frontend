import { instanceOfDisplayNameable, instanceOfNameable } from '#types';

/**
 * Класс для получение имени объекта
 */
export abstract class ObjectName
{
  /**
   * Получение имени объекта
   * @param obj Объект
   * @param defaultName Значение по умолчанию
   * @returns Имя объекта или значение по умолчанию
   */
  public static getName(obj: unknown, defaultName: string = ''):string
  {
    if (typeof obj === 'string') return obj;
    if (typeof obj === 'number') return obj.toString();

    if (instanceOfDisplayNameable(obj)) return  obj.displayName;
    if (instanceOfNameable(obj)) return  obj.name;

    return defaultName;
  }
}