/* eslint-disable @typescript-eslint/no-explicit-any */

import { Environment } from '#environment';

/**
 * Вспомогательный класс для работы с HTTP cookies в браузере
 * Предоставляет безопасные методы для установки, получения и удаления cookies
 *
 * @warning Для production используйте secure, httpOnly и sameSite атрибуты
 * @warning Никогда не храните чувствительные данные без шифрования
 */
export interface ICookieOptions
{
  /**
   * Время жизни cookie в секундах или объект Date
   * Если не указано, cookie будет сессионной (удалится при закрытии браузера)
   *
   * @example 3600 // 1 час
   * @example new Date('2024-12-31') // до определенной даты
   */
  expires?: number | Date;

  /**
   * Путь на сервере, для которого cookie будет доступна
   * По умолчанию '/' - доступна для всех страниц домена
   *
   * @example '/api' - только для API endpoints
   * @example '/admin' - только для админки
   */
  path?: string;

  /**
   * Домен, для которого cookie будет доступна
   * По умолчанию текущий домен без поддоменов
   *
   * @example '.example.com' - доступна для всех поддоменов
   * @example 'subdomain.example.com' - только для конкретного поддомена
   */
  domain?: string;

  /**
   * Если true, cookie будет передаваться только по HTTPS
   * Рекомендуется всегда использовать в production
   *
   * @default true если текущая страница использует HTTPS
   */
  secure?: boolean;

  /**
   * Защита от CSRF атак. Определяет, когда cookie отправляется с cross-site запросами
   * - 'strict': никогда не отправляется с cross-site запросами
   * - 'lax': отправляется с безопасными cross-site запросами (переход по ссылке)
   * - 'none': отправляется всегда (требует secure=true)
   *
   * @default 'lax'
   */
  sameSite?: 'strict' | 'lax' | 'none';

  /**
   * Если true, cookie недоступна через JavaScript (защита от XSS)
   *
   * @warning Этот атрибут может быть установлен только сервером
   * @warning При установке через JavaScript будет проигнорирован
   */
  httpOnly?: boolean;
}

export abstract class CookiesHelper 
{
  /**
   * Получает значение cookie по имени
   *
   * @param name - Имя cookie для получения
   * @returns Значение cookie или undefined если cookie не найдена
   *
   * @example
   * ```typescript
   * const theme = CookiesHelper.get('theme'); // 'dark'
   * const missing = CookiesHelper.get('not-exist'); // undefined
   * ```
   */
  public static get(name: string): string | undefined 
  {
    if (typeof document === 'undefined') 
    {
      console.warn('CookiesHelper: document is not available (server-side rendering?)');
      return undefined;
    }

    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|;\\s*)${escapedName}=([^;]*)`);
    const match = document.cookie.match(regex);

    return match ? decodeURIComponent(match[1]) : undefined;
  }

  /**
   * Устанавливает cookie с указанными параметрами
   *
   * @param name - Имя cookie (будет автоматически закодировано)
   * @param value - Значение cookie (будет автоматически закодировано)
   * @param options - Дополнительные параметры cookie
   *
   * @example
   * ```typescript
   * // Сессионная cookie
   * CookiesHelper.set('session_id', 'abc123');
   *
   * // Cookie на 7 дней
   * CookiesHelper.set('user_pref', 'dark', { expires: 7 * 24 * 60 * 60 });
   *
   * // Secure cookie для авторизации
   * CookiesHelper.set('auth_token', 'xyz789', {
   *   secure: true,
   *   sameSite: 'strict',
   *   path: '/'
   * });
   * ```
   */
  public static set(name: string, value: string, options: ICookieOptions = {}): void 
  {
    if (typeof document === 'undefined') 
    {
      console.warn('CookiesHelper: document is not available');
      return;
    }

    // Безопасные значения по умолчанию
    const defaultOptions: ICookieOptions = {
      path: '/',
      secure: window.location.protocol === 'https:',
      sameSite: 'lax'
    };

    const mergedOptions = { ...defaultOptions, ...options };
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    // Обработка времени жизни
    if (mergedOptions.expires) 
    {
      if (typeof mergedOptions.expires === 'number') 
      {
        // Число секунд
        const date = new Date();
        date.setTime(date.getTime() + mergedOptions.expires * 1000);
        cookieString += `; expires=${date.toUTCString()}`;
      }
      else if (mergedOptions.expires instanceof Date) 
      {
        // Объект Date
        cookieString += `; expires=${mergedOptions.expires.toUTCString()}`;
      }
    }

    // Добавление пути
    if (mergedOptions.path) 
    {
      cookieString += `; path=${mergedOptions.path}`;
    }

    // Добавление домена
    if (mergedOptions.domain) 
    {
      cookieString += `; domain=${mergedOptions.domain}`;
    }

    // Флаг secure
    if (mergedOptions.secure) 
    {
      cookieString += '; secure';
    }

    // Атрибут sameSite
    if (mergedOptions.sameSite) 
    {
      cookieString += `; samesite=${mergedOptions.sameSite}`;

      // Проверка соответствия спецификации
      if (mergedOptions.sameSite === 'none' && !mergedOptions.secure) 
      {
        console.warn('CookiesHelper: sameSite=none требует secure=true');
      }
    }

    // Предупреждение о httpOnly (недоступен в браузере)
    if (mergedOptions.httpOnly) 
    {
      console.warn('CookiesHelper: атрибут httpOnly может быть установлен только сервером');
    }

    try 
    {
      document.cookie = cookieString;
    }
    catch (error) 
    {
      console.error('CookiesHelper: Ошибка при установке cookie', error);
    }
  }

  /**
   * Удаляет cookie по имени
   *
   * @param name - Имя cookie для удаления
   * @param options - Опции для корректного удаления (должны соответствовать установленным)
   *
   * @note Для успешного удаления необходимо указать те же path и domain,
   *       что использовались при создании cookie
   *
   * @example
   * ```typescript
   * // Удаление cookie с путем по умолчанию
   * CookiesHelper.delete('session_id');
   *
   * // Удаление cookie с определенным путем
   * CookiesHelper.delete('admin_token', { path: '/admin' });
   *
   * // Удаление cookie для всех поддоменов
   * CookiesHelper.delete('user_data', { domain: '.example.com' });
   * ```
   */
  public static delete(name: string, options: Pick<ICookieOptions, 'path' | 'domain'> = {}): void 
  {
    const deleteOptions: ICookieOptions = {
      ...options,
      expires: new Date(0) // Устанавливаем прошедшую дату
    };

    this.set(name, '', deleteOptions);
  }

  /**
   * Удаляет все cookies, доступные для текущего документа
   *
   * @param options - Опции для удаления (влияют на path при удалении)
   *
   * @warning Удаляет только cookies, доступные через JavaScript
   * @warning httpOnly cookies не могут быть удалены через JavaScript
   * @warning Для надежного удаления рекомендуется указывать { path: '/' }
   *
   * @example
   * ```typescript
   * // Удалить все cookies с путем по умолчанию
   * CookiesHelper.deleteAll();
   *
   * // Удалить все cookies с корневым путем
   * CookiesHelper.deleteAll({ path: '/' });
   * ```
   */
  public static deleteAll(options: Pick<ICookieOptions, 'path'> = {}): void 
  {
    if (typeof document === 'undefined') return;

    const cookies = document.cookie.split(';');
    const defaultPath = options.path || '/';

    cookies.forEach((cookie) => 
    {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

      if (name) 
      {
        // Пытаемся удалить cookie разными способами
        this.delete(name, { path: defaultPath });
        this.delete(name, { path: '/' });
        this.delete(name, {}); // Без указания пути
      }
    });
  }

  /**
   * Проверяет, включена ли поддержка cookies в браузере
   *
   * @returns true если cookies поддерживаются и включены
   *
   * @example
   * ```typescript
   * if (!CookiesHelper.areCookiesEnabled()) {
   *   alert('Для работы приложения необходимы cookies');
   *   return;
   * }
   * ```
   */
  public static areCookiesEnabled(): boolean 
  {
    if (typeof navigator === 'undefined') return false;

    try 
    {
      // Используем встроенную проверку браузера если доступна
      if (typeof navigator.cookieEnabled !== 'undefined') 
      {
        return navigator.cookieEnabled;
      }

      // Практическая проверка: пытаемся установить и прочитать test cookie
      const testCookieName = '__cookies_test__';
      this.set(testCookieName, 'test_value', { expires: 60 });
      const isSet = this.get(testCookieName) === 'test_value';
      this.delete(testCookieName);

      return isSet;
    }
    catch 
    {
      return false;
    }
  }

  /**
   * Получает все cookies в виде объекта ключ-значение
   *
   * @returns Объект со всеми cookies документа
   *
   * @example
   * ```typescript
   * const allCookies = CookiesHelper.getAll();
   * // { 'session_id': 'abc123', 'theme': 'dark' }
   * ```
   */
  public static getAll(): Record<string, string> 
  {
    if (typeof document === 'undefined') return {};

    const cookies: Record<string, string> = {};
    const cookieArray = document.cookie.split(';');

    cookieArray.forEach((cookie) => 
    {
      const eqPos = cookie.indexOf('=');
      if (eqPos > -1) 
      {
        const name = cookie.substring(0, eqPos).trim();
        const value = cookie.substring(eqPos + 1).trim();
        if (name) 
        {
          try 
          {
            cookies[decodeURIComponent(name)] = decodeURIComponent(value);
          }
          catch 
          {
            // В случае ошибки декодирования оставляем оригинальное значение
            cookies[name] = value;
          }
        }
      }
    });

    return cookies;
  }

  /**
   * Устанавливает сессионную cookie (удаляется при закрытии браузера)
   *
   * @param name - Имя cookie
   * @param value - Значение cookie
   * @param options - Дополнительные опции (кроме expires)
   *
   * @example
   * ```typescript
   * CookiesHelper.setSession('cart_id', 'cart_789');
   * ```
   */
  public static setSession(name: string, value: string, options: Omit<ICookieOptions, 'expires'> = {}): void 
  {
    this.set(name, value, { ...options, expires: undefined });
  }

  /**
   * Устанавливает постоянную cookie с заданным сроком жизни в днях
   *
   * @param name - Имя cookie
   * @param value - Значение cookie
   * @param days - Срок жизни в днях
   * @param options - Дополнительные опции
   *
   * @example
   * ```typescript
   * // Cookie на 30 дней
   * CookiesHelper.setPersistent('user_settings', 'dark_mode', 30);
   *
   * // Cookie на 365 дней с secure флагом
   * CookiesHelper.setPersistent('consent_given', 'true', 365, {
   *   secure: true,
   *   sameSite: 'strict'
   * });
   * ```
   */
  public static setPersistent(name: string, value: string, days: number, options: Omit<ICookieOptions, 'expires'> = {}): void 
  {
    const expiresInSeconds = days * 24 * 60 * 60;
    this.set(name, value, { ...options, expires: expiresInSeconds });
  }

  /**
   * Проверяет существование cookie
   *
   * @param name - Имя cookie для проверки
   * @returns true если cookie существует
   *
   * @example
   * ```typescript
   * if (CookiesHelper.has('auth_token')) {
   *   // Пользователь авторизован
   * }
   * ```
   */
  public static has(name: string): boolean 
  {
    return this.get(name) !== undefined;
  }

  /**
   * Получает JSON значение из cookie
   *
   * @param name - Имя cookie с JSON данными
   * @returns Распарсенный JSON объект или null при ошибке
   *
   * @throws {Error} Если JSON некорректен (в режиме разработки)
   *
   * @example
   * ```typescript
   * const userPrefs = CookiesHelper.getJSON('user_preferences');
   * // { theme: 'dark', language: 'ru' }
   * ```
   */
  public static getJSON<T = any>(name: string): T | null 
  {
    const value = this.get(name);
    if (!value) return null;

    try 
    {
      return JSON.parse(value) as T;
    }
    catch (error) 
    {
      if (Environment.isDevelopment) 
      {
        console.error(`CookiesHelper: Неверный JSON в cookie "${name}":`, error);
      }
      return null;
    }
  }

  /**
   * Устанавливает JSON значение в cookie
   *
   * @param name - Имя cookie
   * @param value - JavaScript объект для сериализации в JSON
   * @param options - Дополнительные опции cookie
   *
   * @example
   * ```typescript
   * const preferences = { theme: 'dark', notifications: true };
   * CookiesHelper.setJSON('user_prefs', preferences, { expires: 30 });
   * ```
   */
  public static setJSON(name: string, value: any, options: ICookieOptions = {}): void 
  {
    const jsonString = JSON.stringify(value);
    this.set(name, jsonString, options);
  }
}
