/**
 * Тип события для изменения языка
 */
export const LanguageChangeEventType = 'LanguageChangeEventType';
export const createLanguageChangeEvent = (lang) => {
    const data = { lang };
    const event = new CustomEvent(LanguageChangeEventType, { detail: data });
    return event;
};
//# sourceMappingURL=LanguageEvents.js.map