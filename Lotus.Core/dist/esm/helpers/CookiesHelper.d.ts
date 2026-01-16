/**
 * Вспомогательный класс для работы с HTTP cookies в браузере
 * Предоставляет безопасные методы для установки, получения и удаления cookies
 *
 * @warning Для production используйте secure, httpOnly и sameSite атрибуты
 * @warning Никогда не храните чувствительные данные без шифрования
 */
export interface ICookieOptions {
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
export declare abstract class CookiesHelper {
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
    static get(name: string): string | undefined;
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
    static set(name: string, value: string, options?: ICookieOptions): void;
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
    static delete(name: string, options?: Pick<ICookieOptions, 'path' | 'domain'>): void;
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
    static deleteAll(options?: Pick<ICookieOptions, 'path'>): void;
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
    static areCookiesEnabled(): boolean;
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
    static getAll(): Record<string, string>;
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
    static setSession(name: string, value: string, options?: Omit<ICookieOptions, 'expires'>): void;
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
    static setPersistent(name: string, value: string, days: number, options?: Omit<ICookieOptions, 'expires'>): void;
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
    static has(name: string): boolean;
    /**
     * Получает JSON значение из cookie
     *
     * @param name - Имя cookie с JSON данными
     * @returns Распарсенный JSON объект или undefined при ошибке
     *
     * @throws {Error} Если JSON некорректен (в режиме разработки)
     *
     * @example
     * ```typescript
     * const userPrefs = CookiesHelper.getJSON('user_preferences');
     * // { theme: 'dark', language: 'ru' }
     * ```
     */
    static getJSON<T = unknown>(name: string): T | undefined;
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
    static setJSON(name: string, value: unknown, options?: ICookieOptions): void;
}
//# sourceMappingURL=CookiesHelper.d.ts.map