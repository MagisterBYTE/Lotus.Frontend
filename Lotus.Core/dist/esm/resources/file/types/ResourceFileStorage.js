/**
 * Массив значений места хранения файла.
 */
export const TResourceFileStorageValues = ['local', 'server', 'database'];
/**
 * Enum места хранения файла.
 */
export const TResourceFileStorages = {
    /**
     * Файл хранится локально.
     * @remarks В данном случае просто сохраняется информация об его идентификаторе.
     */
    Local: TResourceFileStorageValues[0],
    /**
     * Файл хранится на сервере.
     */
    Server: TResourceFileStorageValues[1],
    /**
     * Файл хранится в базе данных.
     */
    Database: TResourceFileStorageValues[2],
    getAllValues() {
        return TResourceFileStorageValues;
    },
    isResourceFileStorage(value) {
        if (typeof value === 'string') {
            return TResourceFileStorageValues.includes(value);
        }
        return false;
    },
    getByIndex(index) {
        return TResourceFileStorageValues[index];
    },
    getByName(name) {
        return TResourceFileStorageValues.find((v) => v === name);
    }
};
//# sourceMappingURL=ResourceFileStorage.js.map