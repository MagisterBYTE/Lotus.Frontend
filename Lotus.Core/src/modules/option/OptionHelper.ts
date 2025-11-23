import { ArrayHelper, GuidHelper } from '#helpers';
import { TKey } from '#types';
import { Assert } from '#utils';
import { IOption } from './Option';

export abstract class OptionHelper
{
  /**
   * Проверка объекта на поддержку интерфейса IOption
   * @param value Проверяемый объект
   * @returns true, если объект поддерживает интерфейс, false в противном случае
   */
  public static instanceOfOption(value: unknown): value is IOption
  {
    if (value && typeof value === 'object')
    {
      return 'value' in value && 'label' in value;
    }

    return false;
  }

  /**
   * Проверка проверка массива на поддержку любого его объекта интерфейса IOption
   * @param value Проверяемый массив
   * @returns true, если хотя бы один объект массива поддерживает интерфейс, false в противном случае
   */
  public static instanceOfOptions(value: unknown[]): value is IOption[]
  {
    if (value && Array.isArray(value))
    {
      for (const v of value)
      {
        if (OptionHelper.instanceOfOption(v))
        {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Преобразование объекта к интерфейсу IOption
   * @param value Объект для преобразования
   * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
   */
  public static castToOption(value: unknown): IOption | undefined
  {
    if (OptionHelper.instanceOfOption(value))
    {
      return value;
    }
    else
    {
      return undefined;
    }
  }

  /**
   * Преобразование массива к массиву объектов интерфейса IOption
   * @param value Объект для преобразования
   * @returns Массив объектов интерфейса IOption или undefined если объект не поддерживает интерфейс
   */
  public static castToOptions(value: unknown[]): IOption[] | undefined
  {
    if (OptionHelper.instanceOfOptions(value))
    {
      return value;
    }
    else
    {
      return undefined;
    }
  }

  /**
   * Проверка опции на тип ключа number
   * @param options Список опций
   * @returns true, тип ключа number, false в противном случае
   */
  public static isNumber(options: IOption[]): boolean
  {
    if (options && options.length > 0)
    {
      return typeof options[0].value == 'number';
    }

    return false;
  }

  /**
   * Проверка опции на тип ключа string
   * @param options Список опций
   * @returns true, тип ключа string, false в противном случае
   */
  public static isString(options: IOption[]): boolean
  {
    if (options && options.length > 0)
    {
      return typeof options[0].value == 'string';
    }

    return false;
  }

  /**
   * Проверка опции на тип ключа guid
   * @param options Список опций
   * @returns true, тип ключа guid, false в противном случае
   */
  public static isGuid(options: IOption[]): boolean
  {
    if (options && options.length > 0)
    {
      return typeof options[0].value == 'string' && GuidHelper.instanceOfGuid(typeof options[0].value);
    }

    return false;
  }

  /**
   * Преобразование значение в значение корректного типа
   * @param options Список опций
   * @param value Значение
   * @returns Значение корректного типа
   */
  public static convertValue(options: IOption[], value: TKey): TKey
  {
    if (typeof options[0].value == 'string')
    {
      if (typeof value == 'string') return value;
      if (typeof value == 'number') return value.toString();
    }

    if (typeof options[0].value == 'number')
    {
      if (typeof value == 'string') return Number(value);
      if (typeof value == 'number') return value;
    }

    return value;
  }

  /**
   * Преобразование в типизированный массив
   * @param options Список опций
   * @returns
   */
  public static convertToNumber(options: IOption[]): IOption<number>[]
  {
    const result = options.map((x) =>
    {
      const value: IOption<number> = { label: x.label, value: Number(x.value) };
      return value;
    });

    return result;
  }

  /**
   * Преобразование в типизированный массив
   * @param options Список опций
   * @returns
   */
  public static convertToString(options: IOption[]): IOption<string>[]
  {
    const result = options.map((x) =>
    {
      const value: IOption<string> = { label: x.label, value: String(x.value) };
      return value;
    });

    return result;
  }

  /**
   * Получение корректного значения по умолчанию или первого значения из списка опций
   * @param options Список опций
   * @param initialSelectedValue Начальное значение
   * @returns Значение по умолчанию или первого значения из списка опций
   */
  public static getValueOrFirst<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValue?: TValueOption): TValueOption
  {
    if (Assert.existValue(initialSelectedValue))
    {
      return initialSelectedValue!;
    }

    return options[0].value as TValueOption;
  }

  /**
   * Получение корректного текста по умолчанию или первого значения текста из списка опций
   * @param options Список опций
   * @param initialSelectedValue Начальное значение
   * @returns Корректный текст по умолчанию или первое значения текста из списка опций
   */
  public static getLabelOrFirst<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValue?: TValueOption): string
  {
    if (Assert.existValue(initialSelectedValue))
    {
      let text = '';
      options.forEach((element) =>
      {
        if (element.value === initialSelectedValue)
        {
          text = element.label;
        }
      });

      return text;
    }

    return options[0].label;
  }

  /**
   * Получение корректной иконки по умолчанию или первой иконки из списка опций
   * @param options Список опций
   * @param initialSelectedValue Начальное значение
   * @returns Корректная иконка по умолчанию или первая иконка из списка опций
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getIconOrFirst<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValue?: TValueOption): any
  {
    if (Assert.existValue(initialSelectedValue))
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let icon: any = undefined;
      options.forEach((element) =>
      {
        if (element.value === initialSelectedValue)
        {
          icon = element.icon;
        }
      });

      return icon;
    }

    return options[0].icon;
  }

  /**
   * Получение корректного списка текста по умолчанию или пустой список
   * @param options Список опций
   * @param initialSelectedValues Список начальных значение
   * @returns Массив текста выбранных значений или пустой список
   */
  public static getLabelsOrEmpty<TValueOption extends TKey = TKey>(options: IOption[], initialSelectedValues?: TValueOption[]): string[]
  {
    if (initialSelectedValues && initialSelectedValues.length > 0)
    {
      const texts: string[] = [];

      options.forEach((element) =>
      {
        if (initialSelectedValues.find((x) => x === element.value))
        {
          texts.push(element.label);
        }
      });

      return texts;
    }
    else
    {
      return [];
    }
  }

  /**
   * Получение опций из значения опций или первой опции
   * @param options Массив всех опций
   * @param selectedValue Выбранное значение
   * @returns Опция
   */
  public static getOptionByValueOrFirst(options: IOption[], selectedValue?: TKey): IOption
  {
    if (Assert.existValue(selectedValue))
    {
      for (const option of options)
      {
        if (option.value === selectedValue)
        {
          return option;
        }
      }
    }

    return options[0];
  }

  /**
   * Получение опций из значения опций или undefined
   * @param options Массив всех опций
   * @param selectedValue Выбранное значение
   * @returns Опция или undefined
   */
  public static getOptionByValueOrUndefined(options: IOption[], selectedValue?: TKey): IOption | undefined
  {
    if (Assert.existValue(selectedValue))
    {
      for (const element of options)
      {
        if (element.value === selectedValue)
        {
          return element;
        }
      }
    }

    return undefined;
  }

  /**
   * Получение текста из значения опций
   * @param options Массив всех опций
   * @param selectedValue Выбранное значение
   * @returns Текст выбранного значения
   */
  public static getLabelByValue(options: IOption[], selectedValue?: TKey): string
  {
    let text = '';
    if (Assert.existValue(selectedValue))
    {
      options.forEach((element) =>
      {
        if (element.value === selectedValue)
        {
          text = element.label;
        }
      });
    }

    return text;
  }

  /**
   * Получение иконки из значения опций
   * @param options Массив всех опций
   * @param selectedValue Выбранное значение
   * @returns Иконка выбранного значения
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getIconByValue(options: IOption[], selectedValue?: TKey): any
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let icon: any = undefined;
    if (Assert.existValue(selectedValue))
    {
      options.forEach((element) =>
      {
        if (element.value === selectedValue)
        {
          icon = element.icon;
        }
      });
    }

    return icon;
  }

  /**
   * Получение массива опций из выбранных значений опций
   * @param options Массив всех опций
   * @param selectedValues Выбранные значения
   * @returns Массив опций
   */
  public static getOptionsByValues(options: IOption[], selectedValues?: TKey | TKey[]): IOption[]
  {
    if (selectedValues)
    {
      if (Array.isArray(selectedValues))
      {
        if (selectedValues.length > 0)
        {
          const optionsSelected: IOption[] = [];

          options.forEach((element) =>
          {
            if (selectedValues.find((x) => x === element.value))
            {
              optionsSelected.push(element);
            }
          });

          return optionsSelected;
        }
      }
      else
      {
        for (const element of options)
        {
          if (element.value === selectedValues)
          {
            return [element];
          }
        }
      }
    }

    return [];
  }

  /**
   * Получение массива текста из выбранных значений опций
   * @param options Массив всех опций
   * @param selectedValues Выбранные значения
   * @returns Массив текста выбранных значений
   */
  public static getLabelsByValues(options: IOption[], selectedValues?: TKey[]): string[]
  {
    if (selectedValues && selectedValues.length > 0)
    {
      const texts: string[] = [];

      options.forEach((element) =>
      {
        if (selectedValues.find((x) => x === element.value))
        {
          texts.push(element.label);
        }
      });

      return texts;
    }
    else
    {
      return [];
    }
  }

  /**
   * Получение массива текста из неопределённого значения(свойства объекта)
   * @param options Массив всех опций
   * @param item Неопределённое значение
   * @returns Массив текста выбранных значений
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getLabelsByUnknownValues(options: IOption[], item: any): string[]
  {
    if (Array.isArray(item))
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const massive: any[] = item;
      if (ArrayHelper.checkIsNumbers(massive))
      {
        const numbers = massive.map((x) =>
        {
          const value: number = Number(x);
          return value;
        });

        const result = OptionHelper.getLabelsByValues(options, numbers);
        return result;
      }
      else
      {
        const texts = massive.map((x) =>
        {
          const value: string = String(x);
          return value;
        });

        const result = OptionHelper.getLabelsByValues(options, texts);
        return result;
      }
    }

    return [];
  }

  /**
   * Проверка на наличие опции
   * @param options Массив всех опций
   * @param value Выбранное значение
   * @returns Статус наличия опции
   */
  public static hasOption(options: IOption[], value?: TKey): boolean
  {
    if (Assert.existValue(value))
    {
      return options.find((x) => x.value == value) !== undefined;
    }

    return false;
  }

  /**
   * Проверка на наличие иконки
   * @param options Массив всех опций
   * @param context Контекст вызова
   * @returns Статус наличия иконки
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static hasIcons(options: IOption[], context?: any): boolean
  {
    for (const option of options)
    {
      if (option.icon)
      {
        if (typeof option.icon == 'function')
        {
          if (option.icon(option, context)) return true;
        }
        else
        {
          return true;
        }
      }
    }

    return false;
  }
}
