import { NotificationData } from '@mantine/notifications';
import { IResult, MakeOptional } from 'lotus-core/types';
export declare abstract class Notifications {
    static showResult(result: IResult, notification?: MakeOptional<NotificationData, 'message'>): string;
    static showSuccess(message: string, notification?: Omit<NotificationData, 'message'>): void;
    static showError(error: unknown, notification?: MakeOptional<NotificationData, 'message'>): void;
}
//# sourceMappingURL=Notifications.d.ts.map