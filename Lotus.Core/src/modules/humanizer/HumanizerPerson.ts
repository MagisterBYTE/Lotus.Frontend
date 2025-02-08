import { StringHelper } from '../../helpers';

export class HumanizerPerson 
{
  /**
   * Возвращает фамилию с инициалами имени и отчества.
   * Если фамилия отсутствует, возвращает первый непустой элемент из массива substitutes или пустую строку.
   * 
   * @param lastName Фамилия (может быть null).
   * @param firstName Имя (может быть null).
   * @param patronymic Отчество (может быть null).
   * @param substitutes Массив строк-заменителей, которые будут использованы, если фамилия отсутствует.
   * @returns Строка с фамилией и инициалами (например, "Иванов И.И.") или заменитель, если фамилия отсутствует.
   */
  public static getLastNameWithInitials(lastName: string | null, firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>): string 
  {
    // Если фамилия отсутствует, возвращаем первый непустой заменитель или пустую строку
    if (!lastName) 
    {
      return (substitutes && substitutes.find((sub: string | null) => !!sub)) || '';
    }

    // Формируем строку с фамилией и инициалами
    return StringHelper.toUpperCaseAllFirstLetters(
      `${lastName}${firstName ? ` ${firstName[0]}.` : ''}${patronymic ? ` ${patronymic[0]}.` : ''}`
    );
  }

  /**
   * Возвращает имя и отчество.
   * Если имя отсутствует, возвращает первый непустой элемент из массива substitutes или пустую строку.
   * 
   * @param firstName Имя (может быть null).
   * @param patronymic Отчество (может быть null).
   * @param substitutes Массив строк-заменителей, которые будут использованы, если имя отсутствует.
   * @returns Строка с именем и отчеством (например, "Иван Иванович") или заменитель, если имя отсутствует.
   */
  public static getNameWithPatronymic(firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>): string 
  {
    // Если имя отсутствует, возвращаем первый непустой заменитель или пустую строку
    if (!firstName) 
    {
      return (substitutes && substitutes.find((sub: string | null) => !!sub)) || '';
    }

    // Формируем строку с именем и отчеством
    return StringHelper.toUpperCaseAllFirstLetters(`${firstName}${patronymic ? ` ${patronymic}` : ''}`);
  }

  /**
   * Возвращает полное имя (фамилия, имя и отчество).
   * Если фамилия отсутствует, возвращает имя и отчество с использованием метода getNameWithPatronymic.
   * 
   * @param lastName Фамилия (может быть null).
   * @param firstName Имя (может быть null).
   * @param patronymic Отчество (может быть null).
   * @param substitutes Массив строк-заменителей, которые будут использованы, если фамилия отсутствует.
   * @returns Строка с полным именем (например, "Иванов Иван Иванович") или имя и отчество, если фамилия отсутствует.
   */
  public static getFullName(lastName: string | null, firstName: string | null, patronymic: string | null, substitutes?: Array<string | null>): string 
  {
    // Если фамилия отсутствует, возвращаем имя и отчество
    if (!lastName) 
    {
      return HumanizerPerson.getNameWithPatronymic(firstName, patronymic, substitutes);
    }

    // Получаем имя и отчество
    const nameWithPatronymic = HumanizerPerson.getNameWithPatronymic(firstName, patronymic);

    // Если имя и отчество существуют, добавляем их к фамилии
    if (nameWithPatronymic) 
    {
      return StringHelper.toUpperCaseAllFirstLetters(`${lastName} ${nameWithPatronymic}`);
    }
    else 
    {
      // Если имя и отчество отсутствуют, возвращаем только фамилию
      return StringHelper.toUpperCaseAllFirstLetters(lastName);
    }
  }
}
