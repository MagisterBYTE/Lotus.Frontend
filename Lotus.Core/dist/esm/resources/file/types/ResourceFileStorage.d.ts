/**
 * Массив значений места хранения файла.
 */
export declare const TResourceFileStorageValues: readonly ["local", "server", "database"];
/**
 * Место хранения файла.
 */
export type TResourceFileStorage = (typeof TResourceFileStorageValues)[number];
/**
 * Enum места хранения файла.
 */
export declare const TResourceFileStorages: {
    /**
     * Файл хранится локально.
     * @remarks В данном случае просто сохраняется информация об его идентификаторе.
     */
    readonly Local: "local";
    /**
     * Файл хранится на сервере.
     */
    readonly Server: "server";
    /**
     * Файл хранится в базе данных.
     */
    readonly Database: "database";
    readonly getAllValues: () => typeof TResourceFileStorageValues;
    readonly isResourceFileStorage: (value: unknown) => value is TResourceFileStorage;
    readonly getByIndex: (index: number) => TResourceFileStorage | undefined;
    readonly getByName: (name: string) => TResourceFileStorage | undefined;
};
//# sourceMappingURL=ResourceFileStorage.d.ts.map