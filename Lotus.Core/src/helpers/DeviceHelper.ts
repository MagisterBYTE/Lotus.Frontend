/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Вспомогательный класс для получения информации об устройстве и окружении
 */
export abstract class DeviceHelper 
{
  /**
   * Проверка на наличие сенсорного экрана
   */
  public static isTouchDevice(): boolean 
  {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  }

  /**
   * Получение данных о процессоре (кол-во логических ядер)
   */
  public static getCpuCores(): number | 'unknown' 
  {
    return navigator?.hardwareConcurrency || 'unknown';
  }

  /**
   * Получение примерного объема оперативной памяти (в ГБ)
   * Доступно в Chromium браузерах
   */
  public static getDeviceMemory(): number | 'unknown' 
  {
    return (navigator as any).deviceMemory || 'unknown';
  }

  /**
   * Информация об экране (разрешение и ориентация)
   */
  public static getScreenInfo() 
  {
    if (typeof window === 'undefined') return null;
    return {
      width: window.screen.width,
      height: window.screen.height,
      pixelRatio: window.devicePixelRatio,
      orientation: window.screen.orientation?.type || 'unknown'
    };
  }

  /**
   * Информация о типе интернет-соединения (4g, wifi, etc.)
   */
  public static getConnectionInfo() 
  {
    const conn = (navigator as any).connection || 
                 (navigator as any).mozConnection || 
                 (navigator as any).webkitConnection;
    if (!conn) return 'unknown';
    
    return {
      effectiveType: conn.effectiveType, // '4g', '3g', etc.
      downlink: conn.downlink,           // Скорость в Мбит/с
      saveData: conn.saveData            // Включен ли режим экономии данных
    };
  }

  /**
   * Получение данных о платформе (ОС)
   */
  public static getPlatform(): string 
  {
    if (typeof navigator === 'undefined') return 'server';
    // Современный API (User-Agent Client Hints)
    if ((navigator as any).userAgentData?.platform) 
    {
      return (navigator as any).userAgentData.platform;
    }
    // Старый добрый способ
    return navigator.platform;
  }

  /**
   * Сбор полной диагностической информации (кроме асинхронных Geolocation и Battery)
   */
  public static getFullDeviceInfo() 
  {
    return {
      isTouch: this.isTouchDevice(),
      cores: this.getCpuCores(),
      memory: this.getDeviceMemory(),
      screen: this.getScreenInfo(),
      platform: this.getPlatform(),
      language: navigator?.language || 'unknown',
      online: navigator?.onLine ?? 'unknown',
      connection: this.getConnectionInfo()
    };
  }

  /**
   * Получает данные о состоянии батареи.
   * Возвращает null, если API не поддерживается (например, в Safari или Firefox).
   */
  public static async getBatteryInfoAsync() 
  {
    if (typeof navigator === 'undefined' || !('getBattery' in navigator)) 
    {
      return null;
    }

    try 
    {
      // navigator.getBattery() возвращает Promise<BatteryManager>
      const battery: any = await (navigator as any).getBattery();

      return {
        level: Math.round(battery.level * 100), // Уровень в процентах (0-100)
        isCharging: battery.charging,           // Заряжается ли сейчас
        chargingTime: battery.chargingTime,     // Время до полной зарядки
        dischargingTime: battery.dischargingTime // Время до разрядки
      };
    }
    catch (e) 
    {
      console.warn('Не удалось получить данные о батарее:', e);
      return null;
    }
  }

  /**
   * Получает текущие географические координаты пользователя.
   * @param timeout - максимальное время ожидания ответа (мс)
   */
  public static getCurrentLocation(timeout = 5000): Promise<GeolocationCoordinates | null> 
  {
    if (typeof navigator === 'undefined' || !('geolocation' in navigator)) 
    {
      return Promise.resolve(null);
    }

    return new Promise((resolve) => 
    {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords), // Успех: возвращаем координаты
        (error) => 
        {
          // Ошибка: пользователь запретил доступ или GPS недоступен
          console.warn(`Геолокация недоступна: ${error.message}`);
          resolve(null);
        },
        {
          enableHighAccuracy: true, // Пытаться получить точные данные (GPS)
          timeout: timeout,         // Тайм-аут
          maximumAge: 0             // Не использовать кэшированные данные
        }
      );
    });
  }

  /**
   * Проверяет статус разрешений (например, на геолокацию или уведомления)
   * Позволяет узнать, спросит ли браузер пользователя или уже есть отказ/согласие.
   */
  public static async getPermissionStatusAsync(name: PermissionName): Promise<PermissionState | 'unsupported'> 
  {
    if (typeof navigator === 'undefined' || !('permissions' in navigator)) 
    {
      return 'unsupported';
    }

    try 
    {
      const status = await navigator.permissions.query({ name });
      return status.state; // 'granted', 'denied', 'prompt'
    }
    catch 
    {
      return 'unsupported';
    }
  }
}