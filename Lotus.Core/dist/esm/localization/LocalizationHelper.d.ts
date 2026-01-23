import { TLanguageType } from './LanguageType';
/**
 * Вспомогательный класс для работы с подсистемой локализации
 */
export declare abstract class LocalizationHelper {
    /**
     * Названия атрибута в документа под которым сохраняется выбранный язык
     */
    static readonly DataAttributeLang: string;
    /**
     * Регулярное выражение для поиска ключа где сохранён текущий язык
     */
    static readonly LangRegexDefault: RegExp;
    /**
     * Устанавливает язык интерфейса для всей страницы
     * @param lang Код языка
     */
    static setDocumentLang(lang: TLanguageType): void;
    /**
     * Читает текущий язык интерфейса страницы
     * @returns Строка с кодом языка или пустая строка, если атрибут не задан
     */
    static getDocumentLang(): TLanguageType;
    /**
     * Загрузка данных подсистемы локализации из локального хранилища
     * @param key Ключ
     * @returns Данные подсистемы локализации
     */
    static loadFromStorage(key?: string): TLanguageType | undefined;
    /**
     * Сохранение данных подсистемы локализации в локальное хранилище
     * @param key Ключ
     * @param data Данные подсистемы локализации
     */
    static saveToStorage(key: string | undefined, data: TLanguageType): void;
}
//# sourceMappingURL=LocalizationHelper.d.ts.map