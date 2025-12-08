/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalizationCore } from '#localization';
import { Assert } from '#utils';
import { ValidationHelper } from './ValidationHelper';
import { IValidationItem } from './ValidationItem';
import { TValidationLevel } from './ValidationLevel';

/**
 * Интерфейс для определения статуса валидации
 */
export interface IValidationResult
{
  items: Record<string, IValidationItem[]>;
}

/**
 * Класс для управления результатами валидации.
 * Предоставляет методы для добавления, проверки и управления ошибками, предупреждениями и информационными сообщениями.
 */
export class ValidationResult implements IValidationResult
{
  // #region Const
  public static readonly Success: ValidationResult = new ValidationResult();
  // #endregion

  // #region Static methods
  /**
   * Создает ValidationResult из объекта с ошибками
   * @param errors Объект с ошибками, где ключ - имя поля, значение - массив текстов ошибок
   * @returns Новый объект ValidationResult
   */
  public static createFromErrors(errors: Record<string, string[]>): ValidationResult
  {
    const result = new ValidationResult();

    for (const key in errors)
    {
      result.items[key] = errors[key].map(text => ({
        text,
        level: 'error',
        error: true
      }));
    }

    return result;
  }

  /**
   * Создает пустой (успешный) ValidationResult
   * @returns Новый пустой объект ValidationResult
   */
  public static createSuccess(): ValidationResult
  {
    return new ValidationResult();
  }

  /**
   * Создает ValidationResult с одной ошибкой
   * @param key Ключ ошибки
   * @param message Текст ошибки
   * @returns Новый объект ValidationResult с одной ошибкой
   */
  public static createSingleError(key: string, message: string): ValidationResult
  {
    const result = new ValidationResult();
    result.addErrorCustom(key, false, message);
    return result;
  }
  // #endregion

  // #region Fields
  /**
   * Коллекция элементов валидации, сгруппированных по ключам
   */
  public items: Record<string, IValidationItem[]>;
  // #endregion

  // #region Constructor
  /**
   * Создает новый экземпляр ValidationResult
   */
  constructor()
  {
    this.items = {};
  }
  // #endregion

  // #region Basic methods
  /**
   * Очищает все результаты валидации
   */
  public clear(): void
  {
    this.items = {};
  }

  /**
   * Проверяет, есть ли ошибки в результатах валидации
   * @returns true если есть хотя бы одна ошибка
   */
  public hasErrors(): boolean
  {
    for (const key in this.items)
    {
      if (this.items[key].some(x => x.error))
      {
        return true;
      }
    }

    return false;
  }

  /**
   * Проверяет, есть ли предупреждения в результатах валидации
   * @returns true если есть хотя бы одно предупреждение
   */
  public hasWarnings(): boolean
  {
    for (const key in this.items)
    {
      if (this.items[key].some(x => x.level === 'warning'))
      {
        return true;
      }
    }

    return false;
  }

  /**
   * Проверяет, прошла ли валидация успешно
   * @returns true если ошибок нет
   */
  public isValid(): boolean
  {
    return !this.hasErrors();
  }
  // #endregion

  // #region Item management
  /**
   * Добавляет элемент валидации
   * @param key Ключ для группировки элементов
   * @param item Элемент валидации для добавления
   */
  public addValidationItem(key: string, item: IValidationItem): void
  {
    const items = this.items[key] ?? [];
    items.push(item);
    this.items[key] = items;
  }

  /**
   * Добавляет пользовательскую проверку
   * @param key Ключ для группировки
   * @param isValid Результат проверки (true - валидно, false - невалидно)
   * @param errorText Текст сообщения
   * @param level Уровень валидации (по умолчанию 'error')
   */
  public addErrorCustom(key: string, isValid: boolean, errorText: string, level: TValidationLevel = 'error'): void
  {
    if (!isValid)
    {
      this.addValidationItem(key, {
        text: errorText,
        level,
        error: level === 'error'
      });
    }
  }

  /**
   * Добавляет предупреждение
   * @param key Ключ для группировки
   * @param warningText Текст предупреждения
   */
  public addWarning(key: string, warningText: string): void
  {
    this.addValidationItem(key, {
      text: warningText,
      level: 'warning',
      error: false
    });
  }

  /**
   * Добавляет информационное сообщение
   * @param key Ключ для группировки
   * @param infoText Текст информации
   */
  public addInfo(key: string, infoText: string): void
  {
    this.addValidationItem(key, {
      text: infoText,
      level: 'info',
      error: false
    });
  }
  // #endregion

  // #region Error retrieval methods
  /**
   * Получает первую ошибку для указанного ключа
   * @param key Ключ для поиска ошибок
   * @returns Текст первой ошибки или undefined если ошибок нет
   */
  public getErrorByKey(key: string): string | undefined
  {
    if (this.items[key])
    {
      return this.items[key].find(x => x.error)?.text;
    }
  }

  /**
   * Получает все ошибки для указанного ключа
   * @param key Ключ для поиска ошибок
   * @returns Массив элементов валидации с ошибками
   */
  public getErrorsByKey(key: string): IValidationItem[]
  {
    return this.items[key]?.filter(x => x.error) ?? [];
  }

  /**
   * Получает текст первой ошибки для указанного ключа
   * @param key Ключ для поиска ошибок
   * @returns Текст первой ошибки или undefined
   */
  public getFirstErrorText(key: string): string | undefined
  {
    return this.items[key]?.find(x => x.error)?.text;
  }

  /**
   * Получает все тексты ошибок для указанного ключа
   * @param key Ключ для поиска ошибок
   * @returns Массив текстов ошибок
   */
  public getAllErrorTexts(key: string): string[]
  {
    return this.items[key]?.filter(x => x.error).map(x => x.text!).filter(Boolean) ?? [];
  }

  /**
   * Получает все ошибки из всех ключей
   * @returns Объект с ошибками, сгруппированными по ключам
   */
  public getAllErrors(): Record<string, IValidationItem[]>
  {
    const result: Record<string, IValidationItem[]> = {};

    for (const key in this.items)
    {
      const errors = this.items[key].filter(x => x.error);
      if (errors.length > 0)
      {
        result[key] = errors;
      }
    }

    return result;
  }

  /**
   * Получает все предупреждения для указанного ключа
   * @param key Ключ для поиска предупреждений
   * @returns Массив элементов валидации с предупреждениями
   */
  public getWarningsByKey(key: string): IValidationItem[]
  {
    return this.items[key]?.filter(x => x.level === 'warning') ?? [];
  }

  /**
   * Получает все информационные сообщения для указанного ключа
   * @param key Ключ для поиска информационных сообщений
   * @returns Массив элементов валидации с информационными сообщениями
   */
  public getInfosByKey(key: string): IValidationItem[]
  {
    return this.items[key]?.filter(x => x.level === 'info') ?? [];
  }
  // #endregion

  // #region Specific validation methods
  /**
   * Проверяет обязательность заполнения поля
   * @param key Ключ поля
   * @param value Значение для проверки
   * @param errorText Текст ошибки (опционально)
   */
  public addErrorRequired(key: string, value: unknown, errorText?: string): void
  {
    if (Assert.emptyValue(value))
    {
      this.addValidationItem(key, {
        text: errorText ?? LocalizationCore.data.validation.required,
        level: 'error',
        error: true
      });
    }
  }
  // #endregion

  // #region Specific validation methods - String
  /**
   * Проверяет максимальную длину строки
   * @param key Ключ поля
   * @param value Значение для проверки
   * @param maxLength Максимальная длина
   * @param errorText Текст ошибки (опционально)
   */
  public addErrorMaxString(key: string, value: string, maxLength: number, errorText?: string): void
  {
    if (Assert.existValue(value) && value.length > maxLength)
    {
      this.addValidationItem(key, {
        text: errorText ?? LocalizationCore.data.validation.maxString(maxLength),
        level: 'error',
        error: true
      });
    }
  }

  /**
   * Проверяет минимальную длину строки
   * @param key Ключ поля
   * @param value Значение для проверки
   * @param minLength Минимальная длина
   * @param errorText Текст ошибки (опционально)
   */
  public addErrorMinString(key: string, value: string, minLength: number, errorText?: string): void
  {
    if (Assert.existValue(value) && value.length < minLength)
    {
      this.addValidationItem(key, {
        text: errorText ?? LocalizationCore.data.validation.minString(minLength),
        level: 'error',
        error: true
      });
    }
  }

  /**
   * Проверяет значение на вхождение в диапазон
   * @param key Ключ поля
   * @param value Значение для проверки
   * @param minLength Минимальная длина строки
   * @param maxLength Максимальная длина строки
   * @param errorText Текст ошибки (опционально)
   */
  // eslint-disable-next-line max-params
  public addErrorRangeString(key: string, value: string, minLength: number, maxLength: number, errorText?: string): void
  {
    if (Assert.existValue(value))
    {
      if (value.length < minLength || value.length > maxLength)
      {
        this.addValidationItem(key, {
          text: errorText ?? LocalizationCore.data.validation.rangeString(minLength, maxLength),
          level: 'error',
          error: true
        });
      }
    }
  }
  // #endregion

  // #region Specific validation methods - Number
  /**
   * Проверяет максимальное значение числа
   * @param key Ключ поля
   * @param value Значение для проверки
   * @param max Максимальное число
   * @param errorText Текст ошибки (опционально)
   */
  public addErrorMaxNumber(key: string, value: number, max: number, errorText?: string): void
  {
    if (Assert.existValue(value) && value > max)
    {
      this.addValidationItem(key, {
        text: errorText ?? LocalizationCore.data.validation.maxNumber(max),
        level: 'error',
        error: true
      });
    }
  }

  /**
   * Проверяет минимальное значение числа
   * @param key Ключ поля
   * @param value Значение для проверки
   * @param min Минимальное число
   * @param errorText Текст ошибки (опционально)
   */
  public addErrorMinNumber(key: string, value: number, min: number, errorText?: string): void
  {
    if (Assert.existValue(value) && value < min)
    {
      this.addValidationItem(key, {
        text: errorText ?? LocalizationCore.data.validation.minNumber(min),
        level: 'error',
        error: true
      });
    }
  }

  /**
   * Проверяет значение на вхождение в диапазон
   * @param key Ключ поля
   * @param value Числовое значение для проверки
   * @param min Минимальное значение
   * @param max Максимальное значение
   * @param errorText Текст ошибки (опционально)
   */
  // eslint-disable-next-line max-params
  public addErrorRangeNumber(key: string, value: number, min: number, max: number, errorText?: string): void
  {
    if (Assert.existValue(value))
    {
      if (value < min || value > max)
      {
        this.addValidationItem(key, {
          text: errorText ?? LocalizationCore.data.validation.rangeNumber(min, max),
          level: 'error',
          error: true
        });
      }
    }
  }
  // #endregion

  // #region Specific validation methods - Format
  /**
   * Проверяет соответствие регулярному выражению
   * @param key Ключ поля
   * @param value Значение для проверки
   * @param pattern Регулярное выражение
   * @param errorText Текст ошибки (опционально)
   */
  public addErrorPattern(key: string, value: string, pattern: RegExp, errorText?: string): void
  {
    if (Assert.existValue(value) && !pattern.test(value))
    {
      this.addValidationItem(key, {
        text: errorText ?? LocalizationCore.data.validation.invalidFormat,
        level: 'error',
        error: true
      });
    }
  }

  /**
   * Проверяет формат email
   * @param key Ключ поля
   * @param email Email для проверки
   * @param errorText Текст ошибки (опционально)
   */
  public addErrorEmail(key: string, email: string, errorText?: string): void
  {
    if (ValidationHelper.isValidEmail(email) === false)
    {
      this.addValidationItem(key, {
        text: errorText ?? LocalizationCore.data.validation.invalidEmail,
        level: 'error',
        error: true
      });
    }
  }

  /**
   * Проверяет формат телефонного номера
   * @param key Ключ поля
   * @param phone Телефонный номер для проверки
   * @param errorText Текст ошибки (опционально)
   */
  public addErrorPhone(key: string, phone: string, errorText?: string): void
  {
    if (Assert.existValue(phone))
    {
      if (ValidationHelper.isValidPhone(phone) === false)
      {
        this.addValidationItem(key, {
          text: errorText ?? LocalizationCore.data.validation.invalidPhone,
          level: 'error',
          error: true
        });
      }
    }
  }

  /**
   * Проверяет формат URL
   * @param key Ключ поля
   * @param url URL для проверки
   * @param errorText Текст ошибки (опционально)
   */
  public addErrorUrl(key: string, url: string, errorText?: string): void
  {
    if (Assert.existValue(url))
    {
      try
      {
        new URL(url);
      }
      catch
      {
        this.addValidationItem(key, {
          text: errorText ?? LocalizationCore.data.validation.invalidUrl,
          level: 'error',
          error: true
        });
      }
    }
  }
  // #endregion

  // #region Bulk validation methods
  /**
   * Добавляет ошибки из объекта с правилами валидации
   * @param data Объект с данными для валидации
   * @param rules Объект с правилами валидации для каждого поля
   */
  public addErrorsFromObject(
    data: Record<string, any>,
    rules: Record<string, (value: any) => IValidationItem | null>
  ): void
  {
    for (const key in rules)
    {
      if (Object.prototype.hasOwnProperty.call(data, key))
      {
        const validationResult = rules[key](data[key]);
        if (validationResult)
        {
          this.addValidationItem(key, validationResult);
        }
      }
    }
  }

  /**
   * Объединяет результаты валидации с другим объектом ValidationResult
   * @param other Другой объект ValidationResult для объединения
   */
  public merge(other: ValidationResult): void
  {
    for (const key in other.items)
    {
      if (other.items[key].length > 0)
      {
        const existingItems = this.items[key] ?? [];
        this.items[key] = [...existingItems, ...other.items[key]];
      }
    }
  }

  /**
   * Проверяет объект по заданным правилам валидации
   * @param obj Объект для валидации
   * @param validators Объект с валидаторами для каждого свойства
   * @returns true если объект валиден
   */
  public validateObject<T extends object>(
    obj: T,
    validators: {
      [K in keyof T]?: Array<(value: T[K]) => IValidationItem | null>
    }
  ): boolean
  {
    this.clear();

    for (const key in validators)
    {
      const value = obj[key];
      const keyValidators = validators[key];

      if (keyValidators)
      {
        for (const validator of keyValidators)
        {
          const result = validator(value);
          if (result)
          {
            this.addValidationItem(key as string, result);
          }
        }
      }
    }

    return this.isValid();
  }
  // #endregion

  // #region Utility methods
  /**
   * Проверяет, есть ли ошибки для указанного ключа
   * @param key Ключ для проверки
   * @returns true если есть ошибки для указанного ключа
   */
  public hasErrorsForKey(key: string): boolean
  {
    return this.items[key]?.some(x => x.error) ?? false;
  }

  /**
   * Проверяет, есть ли предупреждения для указанного ключа
   * @param key Ключ для проверки
   * @returns true если есть предупреждения для указанного ключа
   */
  public hasWarningsForKey(key: string): boolean
  {
    return this.items[key]?.some(x => x.level === 'warning') ?? false;
  }

  /**
   * Возвращает количество ошибок во всех ключах
   * @returns Общее количество ошибок
   */
  public getErrorCount(): number
  {
    let count = 0;
    for (const key in this.items)
    {
      count += this.items[key].filter(x => x.error).length;
    }
    return count;
  }

  /**
   * Возвращает количество предупреждений во всех ключах
   * @returns Общее количество предупреждений
   */
  public getWarningCount(): number
  {
    let count = 0;
    for (const key in this.items)
    {
      count += this.items[key].filter(x => x.level === 'warning').length;
    }
    return count;
  }

  /**
   * Создает копию текущего объекта ValidationResult
   * @returns Новый объект ValidationResult с теми же данными
   */
  public clone(): ValidationResult
  {
    const clone = new ValidationResult();
    for (const key in this.items)
    {
      clone.items[key] = [...this.items[key]];
    }
    return clone;
  }

  /**
   * Выполняет валидацию и выбрасывает исключение если есть ошибки
   * @param key Ключ для проверки (опционально, если не указан - проверяются все ключи)
   * @throws Error если есть ошибки валидации
   */
  public validateOrThrow(key?: string): void
  {
    if (key)
    {
      if (this.hasErrorsForKey(key))
      {
        const errorText = this.getFirstErrorText(key);
        throw new Error(`Validation failed for ${key}: ${errorText}`);
      }
    }
    else
    {
      if (this.hasErrors())
      {
        throw new Error(`Validation failed with ${this.getErrorCount()} errors`);
      }
    }
  }
  // #endregion
}