import { TGuid } from '../types';

export class GuidHelper
{
  /**
   * Регулярное выражение для проверки формата UUID (TGuid)
   */
  public static readonly TGuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  public static generateShortUUID(): string
  {
    return (Math.random() + 1).toString(36).substring(4);
  }

  /**
   * Проверка объекта на тип TGuid
   * @param value Проверяемый объект
   * @returns true, если объект соответствует типу TGuid, false в противном случае
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static checkOfGuid(value?: any): value is TGuid
  {
    if (value)
    {
      return GuidHelper.TGuidRegex.test(value.toString());
    }

    return false;
  }

  /**
   * Создание простого Guid
   * @returns Guid
   */
  public static createGuid(): TGuid
  {
    // Генерация случайного UUID
    const randomUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>
    {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

    return randomUUID as TGuid; // Приведение типа к TGuid
  }

  /**
   * Создание Guid V7
   * @returns Guid
   */
  public static createGuidV7(): TGuid
  {
    const now = Date.now(); // Получаем текущее время в миллисекундах
    const unixTimestamp = Math.floor(now / 1000); // Преобразуем в секунды
    const timeLow = (unixTimestamp & 0xffffffff).toString(16).padStart(8, '0'); // Низкие 32 бита
    const timeMid = ((unixTimestamp >> 32) & 0xffff).toString(16).padStart(4, '0'); // Средние 16 бит
    const timeHighAndVersion = ((0x7000 | ((now & 0x0fff) << 4)) & 0xffff).toString(16).padStart(4, '0'); // Высокие 12 бит + версия

    const clockSeq = GuidHelper.getRandomHexBytes(2); // Генерируем случайные 2 байта для clock_seq
    const node = GuidHelper.getRandomHexBytes(6); // Генерируем случайные 6 байт для node

    // Формируем UUID
    return `${timeLow}-${timeMid}-${timeHighAndVersion}-${clockSeq}-${node}`;
  }

  private static getRandomHexBytes(length: number): string
  {
    const byteArray = new Uint8Array(length);
    window.crypto.getRandomValues(byteArray);
    return Array.from(byteArray)
      .map((b) => ('0' + b.toString(16)).slice(-2))
      .join('');
  }
}
