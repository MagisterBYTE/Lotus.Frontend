/**
 * Вспомогательный класс для работы с функциями и методами
 */
export declare abstract class FunctionHelper {
    /**
     * Привязывает все методы объекта к его контексту (this)
     *
     * Этот метод решает проблему потери контекста при передаче методов как колбэков.
     * Должен вызываться в конструкторе класса после определения всех методов.
     *
     * @template T - Тип объекта
     * @param {T} scope - Объект, методы которого нужно привязать (обычно передается `this`)
     * @param exclude - Список свойств которые надо исключить
     * @returns {T} Объект с привязанными методами
     * @example
     * class MyClass {
     *   constructor() {
     *     FunctionHelper.bindAllMethods(this);
     *   }
     *
     *   method() {
     *     console.log(this); // Всегда будет указывать на экземпляр MyClass
     *   }
     * }
     */
    static bindAllMethods<T extends object>(scope: T, exclude?: string[]): T;
}
//# sourceMappingURL=FunctionHelper.d.ts.map