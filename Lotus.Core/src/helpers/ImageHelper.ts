
/**
 * Вспомогательный класс для работы с изображениями
 */
export abstract class ImageHelper 
{
  /**
   * Проверяет, является ли строка форматом Data URL (base64)
   * Используется для определения, нужны ли CORS-настройки для загрузки
   */
  public static isDataURL(str: string): boolean 
  {
    return str.includes('data:image') && str.includes('base64');
  }

  /**
   * Асинхронно загружает изображение по URL
   * @param imageURL - Ссылка на картинку или Data URL
   * @param crossOrigin - Режим CORS (например, 'anonymous'), если нужен для Canvas
   * @returns Promise с готовым объектом HTMLImageElement
   */
  public static loadImageURL(imageURL: string, crossOrigin?: string): Promise<HTMLImageElement> 
  {
    return new Promise<HTMLImageElement>((resolve, reject) => 
    {
      const image = new Image();

      // Успешная загрузка
      image.onload = () => resolve(image);
      
      // Ошибка загрузки (сеть, 404 и т.д.)
      image.onerror = (err) => reject(err);

      // Настройка CORS: если это внешняя ссылка и передан режим, 
      // сообщаем браузеру о необходимости запросить права
      if (!this.isDataURL(imageURL) && crossOrigin) 
      {
        image.crossOrigin = crossOrigin;
      }

      // Присвоение src запускает фактическую загрузку
      image.src = imageURL;
    });
  }

  /**
   * Преобразует объект File (например, из <input type="file">) в HTMLImageElement
   * @param file - Файл изображения из системы пользователя
   */
  public static loadImageFile(file: File): Promise<HTMLImageElement> 
  {
    return new Promise<HTMLImageElement>((resolve, reject) => 
    {
      const reader = new FileReader();

      // FileReader читает файл из памяти пользователя в строку base64
      reader.onload = async (e) => 
      {
        try 
        {
          const result = e?.target?.result;
          if (!result) 
          {
            throw new Error('Данные изображения отсутствуют (результат пуст)');
          }
          
          // После чтения как base64, используем loadImageURL для создания объекта Image
          const image = await this.loadImageURL(result as string);
          resolve(image);
        }
        catch (err) 
        {
          reject(err);
        }
      };

      // В случае ошибки чтения файла (например, нет прав доступа)
      reader.onerror = (err) => reject(err);

      // Запуск чтения файла как строки DataURL
      reader.readAsDataURL(file);
    });
  }
}