import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationCircleFilled } from '@tabler/icons-react';
import { LocalizationCore } from 'lotus-core/localization';
import { ColorCssHelper } from 'lotus-core/modules/color';
import { createResultFromError, instanceOfResult } from 'lotus-core/types';
import { Assert } from 'lotus-core/utils';
export class Notifications {
    // eslint-disable-next-line complexity
    static showResult(result, notification) {
        if (Assert.emptyValue(result))
            return '';
        const notificationData = { ...notification, message: '' };
        // Смотрим сначала на список данных
        if (Assert.isArrayWithData(result.data)) {
            // Это список замечаний
            const messages = result.data;
            const messagesNode = (_jsx("li", { children: messages.map((x) => (_jsx(_Fragment, { children: x.text }))) }));
            notificationData.message = messagesNode;
            if (result.succeeded) {
                notificationData.title = Assert.existValue(result.message) ? result.message : LocalizationCore.data.common.succeed;
                notificationData.color = Assert.existValue(notification?.color) ? notification?.color : ColorCssHelper.getColorCss('success');
                notificationData.icon = Assert.existValue(notification?.icon) ? notification?.icon : _jsx(IconCheck, { size: 18 });
            }
            else {
                notificationData.title = Assert.existValue(result.message) ? result.message : LocalizationCore.data.common.failed;
                notificationData.color = Assert.existValue(notification?.color) ? notification?.color : ColorCssHelper.getColorCss('error');
                notificationData.icon = Assert.existValue(notification?.icon) ? notification?.icon : _jsx(IconExclamationCircleFilled, { size: 18 });
            }
        }
        else {
            if (result.succeeded) {
                notificationData.title = Assert.existValue(notification?.title) ? notification?.title : LocalizationCore.data.common.succeed;
                notificationData.message = Assert.existValue(notification?.message) ? notification?.message : (result.message ?? '');
                notificationData.color = 'success';
                notificationData.icon = Assert.existValue(notification?.icon) ? notification?.icon : _jsx(IconCheck, { size: 18 });
            }
            else {
                notificationData.title = Assert.existValue(notification?.title) ? notification?.title : LocalizationCore.data.common.failed;
                notificationData.message = Assert.existValue(notification?.message) ? notification?.message : (result.message ?? '');
                notificationData.color = 'error';
                notificationData.icon = Assert.existValue(notification?.icon) ? notification?.icon : _jsx(IconExclamationCircleFilled, { size: 18 });
            }
        }
        const notificationId = showNotification(notificationData);
        return notificationId;
    }
    static showSuccess(message, notification) {
        const resultSuccess = {
            succeeded: true,
            message: message
        };
        Notifications.showResult(resultSuccess, notification);
    }
    static showError(error, notification) {
        if (instanceOfResult(error)) {
            Notifications.showResult(error, notification);
        }
        if (error instanceof Error) {
            const result = createResultFromError(error);
            Notifications.showResult(result, notification);
        }
    }
}
//# sourceMappingURL=Notifications.js.map