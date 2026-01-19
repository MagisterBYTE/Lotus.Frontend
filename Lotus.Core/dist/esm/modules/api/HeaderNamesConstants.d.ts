/**
 * Наиболее распространенные имена HTTP-заголовков.
 */
export declare const HeaderNamesConstants: {
    /**
     * Указывает MIME-тип передаваемого ресурса
     */
    readonly ContentType: "Content-Type";
    /**
     * Типы контента, которые приемлемы для клиента
     */
    readonly Accept: "Accept";
    /**
     * Данные для аутентификации (например, Bearer токен)
     */
    readonly Authorization: "Authorization";
    /**
     * Информация о клиентском приложении (браузер, ОС)
     */
    readonly UserAgent: "User-Agent";
    /**
     * Указывает на источник запроса (домен)
     */
    readonly Origin: "Origin";
    /**
     * Адрес предыдущей страницы, с которой был совершен переход
     */
    readonly Referer: "Referer";
    /**
     * Управление кэшированием запросов и ответов
     */
    readonly CacheControl: "Cache-Control";
    /**
     * Куки, передаваемые от клиента к серверу
     */
    readonly Cookie: "Cookie";
    /**
     * Кастомный заголовок для идентификации AJAX-запросов
     */
    readonly XRequestedWith: "X-Requested-With";
    /**
     * Токен для защиты от CSRF атак
     */
    readonly XCsrfToken: "X-CSRF-Token";
    /**
     * Идентификатор запроса для логирования и отладки
     */
    readonly XRequestId: "X-Request-ID";
    /**
     * Передает версию API, которую ожидает клиент
     */
    readonly XApiVersion: "X-API-Version";
};
//# sourceMappingURL=HeaderNamesConstants.d.ts.map