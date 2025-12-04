import {
  NotificationData, // notifications.hide
  showNotification } from '@mantine/notifications';
import { IconCheck,  IconExclamationCircleFilled } from '@tabler/icons-react';
import { LocalizationCore } from 'lotus-core/localization';
import { IResult, IResultMessage } from 'lotus-core/types';
import { Assert } from 'lotus-core/utils';
import { ThemeInstance } from '#theme';

export class Notifications 
{
  // eslint-disable-next-line complexity
  public static showResult(result: IResult, notification?:NotificationData):string
  {
    if (Assert.emptyValue(result)) return '';

    const notificationData:NotificationData = { ...notification, message: '' };

    // Смотрим сначала на список данных
    if (Assert.isArrayWithData(result.data))
    {
      // Это список замечаний
      const messages = result.data as IResultMessage[];
      const messagesNode = <li>{messages.map((x) => <>{x.text}</>)}</li>;
      notificationData.message = messagesNode;

      if (result.succeeded)
      {
        notificationData.title = Assert.existValue(result.message) ? result.message : LocalizationCore.data.common.succeed;
        notificationData.color = Assert.existValue(notification?.color) ? notification?.color : ThemeInstance.getElementColor('success').toCSSRgbValue();
        notificationData.icon = Assert.existValue(notification?.icon) ? notification?.icon : <IconCheck size={18} />;
      }
      else
      {
        notificationData.title = Assert.existValue(result.message) ? result.message : LocalizationCore.data.common.failed;
        notificationData.color = Assert.existValue(notification?.color) ? notification?.color : ThemeInstance.getElementColor('error').toCSSRgbValue();
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
}
