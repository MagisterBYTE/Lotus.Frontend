export class ObjectHelper
{
  /**
   * Проверка значения на undefined или null
   * @param value Проверяемое значение
   * @returns Статус проверки
   */
  public static isNullOrUndefined(value: unknown)
  {
    return value === undefined || value === null;
  }

  /**
   * Проверка объекта на то, что все его свойства имеют значения undefined
   * @param object Проверяемый объект
   * @returns Статус проверки
   */
  public static isObjectValuesEmpty(object: object): boolean
  {
    return !Object.values(object).some((value) => value !== undefined)
  }

  /**
   * Получить значение по условию if
   * @param check Проверяемое значение
   * @param positive Значение возвращаемое в случае не нулевого значения
   * @param negative Значение возвращаемое в случае нулевого значения
   * @returns Значение
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getIf<TResult = any>(check: any, positive:TResult, negative:TResult):TResult 
  {
    if(check)
    {
      return positive;
    }
    else
    {
      return negative;
    }
  }

  /**
   * Получить значение по условию if
   * @param check Проверяемое значение
   * @param positive Функция вызываемая в случае не нулевого значения
   * @param negative Функция вызываемая в случае нулевого значения
   * @returns Значение
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getIfFun<TResult = any>(check: any, positive:(check:any) => TResult, negative:(check:any)=>TResult):TResult 
  {
    if(check)
    {
      return positive(check);
    }
    else
    {
      return negative(check);
    }
  }

  /**
   * Searches the supplied object, and then down it's prototype chain until it
   * finds the object where `prop` is its own property. In other words, finds
   * the object in which `prop` was actually defined on, skipping objects that
   * merely inherit `prop`. This is useful when using methods like
   * `Object.getOwnPropertyDescriptor()` which only work on "own" properties.
   *
   * @param scope   The scope on which to start checking for
   * @param prop    The name of the property we're searching for
   * @returns {*}
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getPropertyDefinitionObject(scope: object, prop: string): any 
  {
    if (!scope) return null;

    return Object.prototype.hasOwnProperty.call(scope, prop)
      ? scope
      : this.getPropertyDefinitionObject(Object.getPrototypeOf(scope), prop);
  }  
}
