/**
 * Наиболее распространенные имена HTTP-заголовков.
 */
export const HeaderNamesConstants = {
  /** 
   * Указывает MIME-тип передаваемого ресурса 
   */
  ContentType: 'Content-Type',

  /** 
   * Типы контента, которые приемлемы для клиента
   */
  Accept: 'Accept',

  /** 
   * Данные для аутентификации (например, Bearer токен)
   */
  Authorization: 'Authorization',

  /**
   * Информация о клиентском приложении (браузер, ОС)
   */
  UserAgent: 'User-Agent',

  /** 
   * Указывает на источник запроса (домен)
   */
  Origin: 'Origin',

  /** 
   * Адрес предыдущей страницы, с которой был совершен переход
   */
  Referer: 'Referer',

  /**
   * Управление кэшированием запросов и ответов
   */
  CacheControl: 'Cache-Control',

  /** 
   * Куки, передаваемые от клиента к серверу
   */
  Cookie: 'Cookie',

  /** 
   * Кастомный заголовок для идентификации AJAX-запросов
   */
  XRequestedWith: 'X-Requested-With',

  /**
   * Токен для защиты от CSRF атак
   */
  XCsrfToken: 'X-CSRF-Token',

  /**
   * Идентификатор запроса для логирования и отладки
   */
  XRequestId: 'X-Request-ID',

  /**
   * Передает версию API, которую ожидает клиент
   */
  XApiVersion: 'X-API-Version'
} as const;