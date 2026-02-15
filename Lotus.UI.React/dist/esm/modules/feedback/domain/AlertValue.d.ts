import { TAlertType } from './AlertType';
/**
 * Интерфейс для вывода информирования
 */
export interface IAlertValue {
    /**
     * Тип информирования
     */
    type: TAlertType;
    /**
     * Заголовок сообщения
     */
    title?: string;
    /**
     * Сообщение
     */
    message: string;
    /**
     * Иконка сообщения
     */
    icon: any;
}
//# sourceMappingURL=AlertValue.d.ts.map