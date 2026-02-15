import { NotificationData } from '@mantine/notifications';
import { IResult, MakeOptional } from 'lotus-core/types';
/**
 * Класс для информирования
 */
export declare abstract class Notifications {
    /**
     * Показать результат
     * @param result Результат
     * @param notification Дополнительный параметры нотификации
     * @returns Идентификатор нотификации
     */
    static showResult(result: IResult, notification?: MakeOptional<NotificationData, 'message'>): string;
    /**
     * Показать успешное информирование
     * @param message Сообщение
     * @param notification Дополнительный параметры нотификации
     * @returns Идентификатор нотификации
     */
    static showSuccess(message: string, notification?: Omit<NotificationData, 'message'>): string;
    /**
     * Показать ошибку
     * @param error Ошибка
     * @param notification Дополнительный параметры нотификации
     * @returns Идентификатор нотификации
     */
    static showError(error: unknown, notification?: MakeOptional<NotificationData, 'message'>): string;
}
//# sourceMappingURL=Notifications.d.ts.map