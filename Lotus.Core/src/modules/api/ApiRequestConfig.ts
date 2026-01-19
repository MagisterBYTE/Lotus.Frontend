import { ContentTypeConstants } from './ContentTypeConstants';
import { HeaderNamesConstants } from './HeaderNamesConstants';

/**
 * Тип для конфигурации запроса
 */
export interface IApiRequestConfig extends RequestInit
{
  /**
   * Время в миллисекундах, которое запрос будет ждать ответа
   */
  timeout?: number;
}

/**
 * Класс-строитель для формирования конфигурации API запроса.
 * Реализует интерфейс IApiRequestConfig и предоставляет удобный API для модификации параметров.
 */
export class ApiRequestConfig implements IApiRequestConfig
{
  // #region Fields
  /** 
   * Заголовки запроса 
   */
  headers: Headers;

  /** 
   * Таймаут запроса в миллисекундах
   */
  timeout?: number;

  /** 
   * HTTP метод (GET, POST и т.д.) 
   */
  method?: string;

  /**
   * Тело запроса
   */
  body?: BodyInit | null;

  /** 
   * Режим обработки куки и авторизации (omit, same-origin, include)
   */
  credentials?: RequestCredentials;
  // #endregion

  /**
   * Создает экземпляр ApiRequest.
   * @param initialConfig - Начальная конфигурация запроса.
   */
  constructor(initialConfig: IApiRequestConfig = {})
  {
    this.headers = new Headers(initialConfig.headers);
    this.timeout = initialConfig.timeout;
    this.method = initialConfig.method || 'GET';
    this.body = initialConfig.body;
    this.credentials = initialConfig.credentials;
  }

  /**
   * Добавляет значение к существующему заголовку или создает новый.
   * @param headerName - Имя заголовка.
   * @param headerValue - Значение заголовка.
   * @returns Текущий экземпляр класса для цепочки вызовов.
   */
  public addHeader(headerName: string, headerValue: string): this
  {
    this.headers.append(headerName, headerValue);
    return this;
  }

  /**
   * Полностью удаляет заголовок из запроса.
   * @param headerName - Имя заголовка для удаления.
   * @returns Текущий экземпляр класса.
   */
  public removeHeader(headerName: string): this
  {
    this.headers.delete(headerName);
    return this;
  }

  /**
   * Массово обновляет или устанавливает заголовки из объекта.
   * @param headers - Объект типа Record, где ключ — имя заголовка.
   * @returns Текущий экземпляр класса.
   */
  public updateHeaders(headers: Record<string, string>): this
  {
    Object.entries(headers).forEach(([name, value]) =>
    {
      this.headers.set(name, value);
    });
    return this;
  }

  /**
   * Возвращает значение заголовка по имени.
   * @param headerName - Имя заголовка.
   * @returns Строку со значением или undefined, если заголовок отсутствует.
   */
  public getHeader(headerName: string): string | undefined
  {
    return this.headers.get(headerName) ?? undefined;
  }

  /**
   * Проверяет, установлен ли указанный заголовок.
   * @param headerName - Имя заголовка.
   * @returns True, если заголовок существует.
   */
  public hasHeader(headerName: string): boolean
  {
    return this.headers.has(headerName);
  }

  /**
   * Устанавливает заголовок Content-Type.
   * @param contentType - Значение MIME-типа.
   * @returns Текущий экземпляр класса.
   */
  public setContentType(contentType: string): this
  {
    this.headers.set(HeaderNamesConstants.ContentType, contentType);
    return this;
  }

  /**
   * Устанавливает заголовок Content-Type в значение application/json.
   * @returns Текущий экземпляр класса.
   */
  public setContentTypeApplicationJson(): this
  {
    return this.setContentType(ContentTypeConstants.ApplicationJson);
  }

  /**
   * Устанавливает заголовок авторизации.
   * @param token - Токен доступа.
   * @param tokenType - Тип токена (по умолчанию 'Bearer').
   * @returns Текущий экземпляр класса.
   */
  public setAuthorization(token: string, tokenType: string = 'Bearer'): this
  {
    this.headers.set(HeaderNamesConstants.Authorization, `${tokenType} ${token}`);
    return this;
  }

  /**
   * Устанавливает политику передачи учетных данных (credentials).
   * @param credentials - Режим передачи (по умолчанию 'include').
   * @returns Текущий экземпляр класса.
   */
  public setCredentials(credentials: RequestCredentials = 'include'): this
  {
    this.credentials = credentials;
    return this;
  }

  /**
   * Устанавливает тело запроса в формате JSON.
   * Автоматически преобразует объект в строку и устанавливает 'Content-Type: application/json'.
   * @param data - Данные для передачи в теле запроса (объект, массив и т.д.).
   * @returns Текущий экземпляр класса для цепочки вызовов.
   */
  public setJsonBody(data: unknown): this 
  {
    this.body = JSON.stringify(data);
    return this.setContentTypeApplicationJson();
  }

  /**
   * Устанавливает HTTP метод GET.
   * @returns Текущий экземпляр класса.
   */
  public asGet(): this 
  {
    this.method = 'GET';
    return this;
  }

  /**
   * Устанавливает HTTP метод POST.
   * @returns Текущий экземпляр класса.
   */
  public asPost(): this 
  {
    this.method = 'POST';
    return this;
  }

  /**
   * Устанавливает HTTP метод PUT.
   * @returns Текущий экземпляр класса.
   */
  public asPut(): this 
  {
    this.method = 'PUT';
    return this;
  }

  /**
   * Устанавливает HTTP метод PATCH.
   * @returns Текущий экземпляр класса.
   */
  public asPatch(): this 
  {
    this.method = 'PATCH';
    return this;
  }

  /**
   * Устанавливает HTTP метод DELETE.
   * @returns Текущий экземпляр класса.
   */
  public asDelete(): this 
  {
    this.method = 'DELETE';
    return this;
  }

  /**
   * Устанавливает произвольный HTTP метод.
   * @param method - Название метода (напр. 'OPTIONS', 'HEAD').
   * @returns Текущий экземпляр класса.
   */
  public setMethod(method: string): this 
  {
    this.method = method.toUpperCase();
    return this;
  }

  /**
   * Преобразует текущий объект в чистую конфигурацию IApiRequestConfig.
   * Используется для передачи результата в метод fetch.
   * @returns Объект конфигурации запроса.
   */
  public toIApiRequestConfig(): IApiRequestConfig
  {
    return {
      method: this.method,
      headers: this.headers,
      body: this.body,
      timeout: this.timeout,
      credentials: this.credentials
    };
  }
}