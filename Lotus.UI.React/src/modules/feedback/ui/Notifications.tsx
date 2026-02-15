import { NotificationData, showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationCircleFilled } from '@tabler/icons-react';
import { LocalizationCore } from 'lotus-core/localization';
import { ColorCssHelper } from 'lotus-core/modules/color';
import { createResultFromError, instanceOfResult, IResult, IResultMessage, MakeOptional } from 'lotus-core/types';
import { Assert } from 'lotus-core/utils';

/**
 * Класс для информирования 
 */
export abstract class Notifications
{
  /**
   * Показать результат
   * @param result Результат
   * @param notification Дополнительный параметры нотификации
   * @returns Идентификатор нотификации
   */
  // eslint-disable-next-line complexity
  public static showResult(result: IResult, notification?: MakeOptional<NotificationData, 'message'>): string
  {
    if (Assert.emptyValue(result)) return '';

    const notificationData: NotificationData = { ...notification, message: '' };

    // Смотрим сначала на список данных
    if (Assert.isArrayWithData(result.data))
    {
      // Это список замечаний
      const messages = result.data as IResultMessage[];
      const messagesNode = (
        <li>
          {messages.map((x) => (
            <>{x.text}</>
          ))}
        </li>
      );
      notificationData.message = messagesNode;

      if (result.succeeded)
      {
        notificationData.title = Assert.existValue(result.message) ? result.message : LocalizationCore.data.common.succeed;
        notificationData.color = Assert.existValue(notification?.color) ? notification?.color : ColorCssHelper.getColor('success');
        notificationData.icon = Assert.existValue(notification?.icon) ? notification?.icon : <IconCheck size={18} />;
      }
      else
      {
        notificationData.title = Assert.existValue(result.message) ? result.message : LocalizationCore.data.common.failed;
        notificationData.color = Assert.existValue(notification?.color) ? notification?.color : ColorCssHelper.getColor('error');
        notificationData.icon = Assert.existValue(notification?.icon) ? notification?.icon : <IconExclamationCircleFilled size={18} />;
      }
    }
    else
    {
      if (result.succeeded)
      {
        notificationData.title = Assert.existValue(notification?.title) ? notification?.title : LocalizationCore.data.common.succeed;
        notificationData.message = Assert.existValue(notification?.message) ? notification?.message : (result.message ?? '');
        notificationData.color = 'success';
        notificationData.icon = Assert.existValue(notification?.icon) ? notification?.icon : <IconCheck size={18} />;
      }
      else
      {
        notificationData.title = Assert.existValue(notification?.title) ? notification?.title : LocalizationCore.data.common.failed;
        notificationData.message = Assert.existValue(notification?.message) ? notification?.message : (result.message ?? '');
        notificationData.color = 'error';
        notificationData.icon = Assert.existValue(notification?.icon) ? notification?.icon : <IconExclamationCircleFilled size={18} />;
      }
    }

    const notificationId = showNotification(notificationData);
    return notificationId;
  }

  /**
   * Показать успешное информирование
   * @param message Сообщение
   * @param notification Дополнительный параметры нотификации
   * @returns Идентификатор нотификации
   */
  public static showSuccess(message: string, notification?: Omit<NotificationData, 'message'>): string
  {
    const resultSuccess: IResult = {
      succeeded: true,
      message: message
    };

    return Notifications.showResult(resultSuccess, notification);
  }

  /**
   * Показать ошибку
   * @param error Ошибка
   * @param notification Дополнительный параметры нотификации
   * @returns Идентификатор нотификации
   */
  public static showError(error: unknown, notification?: MakeOptional<NotificationData, 'message'>): string
  {
    if (instanceOfResult(error))
    {
      return Notifications.showResult(error, notification);
    }
    if (error instanceof Error)
    {
      const result = createResultFromError(error);
      return Notifications.showResult(result, notification);
    }

    return '';
  }
}
