export class PathHelper {
    /**
     *
     * @param fileName
     * @returns
     */
    static splitNameAndExtension(fileName) {
        const index = fileName.lastIndexOf('.');
        if (index !== -1) {
            return [fileName.substring(0, index), fileName.substring(index)];
        }
        return [fileName, ''];
    }
    ;
}
