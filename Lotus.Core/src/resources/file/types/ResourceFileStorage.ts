/**
 * Массив значений места хранения файла.
 */
export const TResourceFileStorageValues = ['local', 'server', 'database'] as const;

/**
 * Место хранения файла.
 */
export type TResourceFileStorage = (typeof TResourceFileStorageValues)[number];

/**
 * Enum места хранения файла.
 */
export const TResourceFileStorages = {
  /**
   * Файл хранится локально.
   * @remarks В данном случае просто сохраняется информация об его идентификаторе.
   */
  Local: TResourceFileStorageValues[0],

  /**
   * Файл хранится на сервере.
   */
  Server: TResourceFileStorageValues[1],

  /**
   * Файл хранится в базе данных.
   */
  Database: TResourceFileStorageValues[2],

  getAllValues(): typeof TResourceFileStorageValues 
  {
    return TResourceFileStorageValues;
  },

  isResourceFileStorage(value: unknown): value is TResourceFileStorage 
  {
    if (typeof value === 'string') 
    {
      return TResourceFileStorageValues.includes(value as TResourceFileStorage);
    }
    return false;
  },

  getByIndex(index: number): TResourceFileStorage | undefined 
  {
    return TResourceFileStorageValues[index];
  },

  getByName(name: string): TResourceFileStorage | undefined 
  {
    return TResourceFileStorageValues.find((v) => v === name);
  }
} as const;
