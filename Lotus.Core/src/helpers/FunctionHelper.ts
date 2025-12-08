/**
 * Вспомогательный класс для работы с функциями и методами
 */
export abstract class FunctionHelper 
{
  /**
   * Привязывает все методы объекта к его контексту (this)
   * 
   * Этот метод решает проблему потери контекста при передаче методов как колбэков.
   * Должен вызываться в конструкторе класса после определения всех методов.
   * 
   * @template T - Тип объекта
   * @param {T} scope - Объект, методы которого нужно привязать (обычно передается `this`)
   * @param exclude - Список свойств которые надо исключить 
   * @returns {T} Объект с привязанными методами
   * @example
   * class MyClass {
   *   constructor() {
   *     FunctionHelper.bindAllMethods(this);
   *   }
   *   
   *   method() {
   *     console.log(this); // Всегда будет указывать на экземпляр MyClass
   *   }
   * }
   */
  public static bindAllMethods<T extends object>(scope: T, exclude?: string[]): T 
  {
    // Получаем все свойства объекта, включая унаследованные
    let currentObj = scope;
    const properties = new Set<string>();

    // Собираем все свойства по цепочке прототипов
    while (currentObj && currentObj !== Object.prototype) 
    {
      for (const name of Object.getOwnPropertyNames(currentObj)) 
      {
        properties.add(name);
      }
      currentObj = Object.getPrototypeOf(currentObj);
    }

    // Обрабатываем каждое свойство
    for (const property of properties) 
    {
      // Пропускаем конструктор
      if (property === 'constructor') continue;

      // Получаем дескриптор свойства
      const descriptor = Object.getOwnPropertyDescriptor(currentObj, property);
      
      // Пропускаем геттеры/сеттеры
      if (descriptor && (descriptor.get || descriptor.set)) continue;

      // Получаем значение свойства
      const value = scope[property as keyof T];

      // Привязываем только функции
      if (typeof value === 'function') 
      {
        if (exclude)
        {
          if ((exclude.includes(property)) === false)
          {
            scope[property as keyof T] = value.bind(scope);
          }
        }
        else
        {
          scope[property as keyof T] = value.bind(scope);
        }
      }
    }

    return scope;
  }
}