/**
 * Интерфейс для объектов, которые могут уведомлять о смене состояния.
 */
export interface IChangeStateNotifier {
    onStateChanged: (context?: unknown) => void;
}
/**
 * Проверка объекта на поддержку интерфейса {@link IChangeStateNotifier}
 * @param value Проверяемый объект
 * @returns true, если объекта поддерживает интерфейс, false в противном случае
 */
export declare function instanceOfChangeStateNotifier(value: unknown): value is IChangeStateNotifier;
/**
 * Преобразование объекта к интерфейсу {@link IChangeStateNotifier}
 * @param value Объект для преобразования
 * @returns Объект реализующий интерфейс или undefined если объект не поддерживает интерфейс
 */
export declare function castToChangeStateNotifier(value: unknown): IChangeStateNotifier | undefined;
//# sourceMappingURL=ChangeStateNotifier.d.ts.map