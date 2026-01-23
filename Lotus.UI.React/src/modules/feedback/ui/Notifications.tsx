import { NotificationData, showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationCircleFilled } from '@tabler/icons-react';
import { LocalizationCore } from 'lotus-core/localization';
import { ColorCssHelper } from 'lotus-core/modules/color';
import { createResultFromError, instanceOfResult, IResult, IResultMessage, MakeOptional } from 'lotus-core/types';
import { Assert } from 'lotus-core/utils';

export abstract class Notifications
{
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
        notificationData.color = Assert.existValue(notification?.color) ? notification?.color : ColorCssHelper.getColorCss('success');
        notificationData.icon = Assert.existValue(notification?.icon) ? notification?.icon : <IconCheck size={18} />;
      }
      else
      {
        notificationData.title = Assert.existValue(result.message) ? result.message : LocalizationCore.data.common.failed;
        notificationData.color = Assert.existValue(notification?.color) ? notification?.color : ColorCssHelper.getColorCss('error');
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

  public static showSuccess(message: string, notification?: Omit<NotificationData, 'message'>)
  {
    const resultSuccess: IResult = {
      succeeded: true,
      message: message
    };

    Notifications.showResult(resultSuccess, notification);
  }

  public static showError(error: unknown, notification?: MakeOptional<NotificationData, 'message'>)
  {
    if (instanceOfResult(error))
    {
      Notifications.showResult(error, notification);
    }
    if (error instanceof Error)
    {
      const result = createResultFromError(error);
      Notifications.showResult(result, notification);
    }
  }
}
