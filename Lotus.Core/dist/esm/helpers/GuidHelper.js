/**
 * Абстрактный класс-хелпер для работы с GUID/UUID.
 * Предоставляет статические методы для генерации, валидации и создания идентификаторов.
 */
export class GuidHelper {
    /**
     * Статическое представление пустого GUID.
     * Используется для сравнения или инициализации пустых значений.
     * @constant {TGuid}
     */
    static Empty = '00000000-0000-0000-0000-000000000000';
    /**
     * Регулярное выражение для валидации формата UUID (версии 1-5).
     * Проверяет соответствие шаблону: 8-4-4-4-12 шестнадцатеричных символов.
     * @constant {RegExp}
     */
    static TGuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    /**
     * Проверяет, является ли переданное значение валидным GUID (Type Guard).
     * @param {any} value - Проверяемое значение.
     * @returns {value is TGuid} `true`, если значение является строкой и соответствует формату TGuid, иначе `false`.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static instanceOfGuid(value) {
        // Проверка на существование значения и соответствие регулярному выражению
        if (value) {
            return GuidHelper.TGuidRegex.test(value.toString());
        }
        return false;
    }
    /**
     * Создает стандартный UUID версии 4 (Random).
     * @remark Версия 4 генерируется из случайных чисел.
     * @warning Использует `Math.random()`, который не является криптографически надежным (CSPRNG).
     * Для генерации секретных ключей рекомендуется использовать `crypto.randomUUID()`.
     * @returns {TGuid} Строка UUID формата 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.
     */
    static createGuid() {
        // Генерация случайного UUID по алгоритму замены символов шаблона
        const randomUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
        return randomUUID;
    }
    /**
     * Создает UUID версии 7 (Time-ordered).
     * UUID v7 сортируем по времени создания.
     * @remark Текущая реализация использует `window.crypto` для генерации случайных частей.
     * @note В данной реализации временная метка имеет точность до секунд (в отличие от стандартных ms),
     * что может влиять на сортируемость при высокой частоте создания.
     * @returns {TGuid} Строка UUID V7.
     */
    static createGuidV7() {
        const now = Date.now(); // Текущее время в миллисекундах
        const unixTimestamp = Math.floor(now / 1000); // Перевод в секунды (для совместимости с логикой метода)
        // Формирование полей времени согласно структуре UUID v7 (с адаптацией под текущую логику)
        const timeLow = (unixTimestamp & 0xffffffff).toString(16).padStart(8, '0'); // time_low (32 бита)
        const timeMid = ((unixTimestamp >> 32) & 0xffff).toString(16).padStart(4, '0'); // time_mid (16 бит)
        // time_high_and_version (16 бит): 4 бита версии (0x7) + 12 бит времени
        const timeHighAndVersion = ((0x7000 | ((now & 0x0fff) << 4)) & 0xffff).toString(16).padStart(4, '0');
        const clockSeq = GuidHelper.getRandomHexBytes(2); // clock_seq_hi_and_res + clock_seq_low (случайные)
        const node = GuidHelper.getRandomHexBytes(6); // node (случайные 48 бит)
        // Сборка полной строки UUID
        return `${timeLow}-${timeMid}-${timeHighAndVersion}-${clockSeq}-${node}`;
    }
    /**
     * Генерирует короткий уникальный идентификатор (Short ID).
     *
     * @returns {string} Случайная строка длиной около 8-10 символов в base36.
     * @remark Не является стандартным UUID. Генерируется на базе `Math.random()` и конвертации в 36-ричную систему счисления.
     * @warning Не гарантирует уникальность на глобальном уровне и не подходит для криптографических целей.
     */
    static generateShortUUID() {
        // (Math.random() + 1) убирает ведущий "0.", substring(2) убирает "0."
        // toString(36) переводит число в систему счисления с основанием 36 (цифры + буквы)
        return (Math.random() + 1).toString(36).substring(2);
    }
    /**
     * Вспомогательный метод для генерации случайной последовательности шестнадцатеричных символов.
     * Использует криптографически стойкий генератор случайных чисел (CSPRNG).
     * @param {number} length - Количество байт для генерации.
     * @throws {Error} Если `window.crypto` недоступен (например, в старых браузерах или небраузерных средах без полифила).
     * @returns {string} Строка шестнадцатеричных символов заданной длины (length * 2 символов).
     */
    static getRandomHexBytes(length) {
        const byteArray = new Uint8Array(length);
        // Заполнение массива случайными значениями
        window.crypto.getRandomValues(byteArray);
        // Конвертация каждого байта в двухсимвольную hex-строку
        return Array.from(byteArray)
            .map((b) => (`0${b.toString(16)}`).slice(-2))
            .join('');
    }
}
//# sourceMappingURL=GuidHelper.js.map