/**
 * Вспомогательный класс для получения информации об устройстве и окружении
 */
export declare abstract class DeviceHelper {
    /**
     * Проверка на наличие сенсорного экрана
     */
    static isTouchDevice(): boolean;
    /**
     * Получение данных о процессоре (кол-во логических ядер)
     */
    static getCpuCores(): number | 'unknown';
    /**
     * Получение примерного объема оперативной памяти (в ГБ)
     * Доступно в Chromium браузерах
     */
    static getDeviceMemory(): number | 'unknown';
    /**
     * Информация об экране (разрешение и ориентация)
     */
    static getScreenInfo(): {
        width: number;
        height: number;
        pixelRatio: number;
        orientation: OrientationType;
    } | null;
    /**
     * Информация о типе интернет-соединения (4g, wifi, etc.)
     */
    static getConnectionInfo(): "unknown" | {
        effectiveType: any;
        downlink: any;
        saveData: any;
    };
    /**
     * Получение данных о платформе (ОС)
     */
    static getPlatform(): string;
    /**
     * Сбор полной диагностической информации (кроме асинхронных Geolocation и Battery)
     */
    static getFullDeviceInfo(): {
        isTouch: boolean;
        cores: number | "unknown";
        memory: number | "unknown";
        screen: {
            width: number;
            height: number;
            pixelRatio: number;
            orientation: OrientationType;
        } | null;
        platform: string;
        language: string;
        online: boolean;
        connection: string | {
            effectiveType: any;
            downlink: any;
            saveData: any;
        };
    };
    /**
     * Получает данные о состоянии батареи.
     * Возвращает null, если API не поддерживается (например, в Safari или Firefox).
     */
    static getBatteryInfo(): Promise<{
        level: number;
        isCharging: any;
        chargingTime: any;
        dischargingTime: any;
    } | null>;
    /**
     * Получает текущие географические координаты пользователя.
     * @param timeout - максимальное время ожидания ответа (мс)
     */
    static getCurrentLocation(timeout?: number): Promise<GeolocationCoordinates | null>;
    /**
     * Проверяет статус разрешений (например, на геолокацию или уведомления)
     * Позволяет узнать, спросит ли браузер пользователя или уже есть отказ/согласие.
     */
    static getPermissionStatus(name: PermissionName): Promise<PermissionState | 'unsupported'>;
}
//# sourceMappingURL=DeviceHelper.d.ts.map