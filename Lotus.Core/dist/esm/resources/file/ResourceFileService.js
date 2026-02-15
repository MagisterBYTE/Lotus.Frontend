import { RequestHelper } from '#modules/requestAndResponse';
/**
 * Сервис для работы с файлами
 */
export class ResourceFileService {
    // #region Fields
    apiService;
    // #endregion
    // #region Constructor
    constructor(apiService) {
        this.apiService = apiService;
    }
    // #endregion
    // #region Main methods
    async createAsync(fileCreate) {
        const url = 'api/ResourceFile/create';
        const response = await this.apiService.post(url, fileCreate);
        return response;
    }
    async getBase64Async(fileId, signal) {
        const url = 'api/ResourceFile/getBase64';
        const searchQuery = new URLSearchParams();
        searchQuery.append('id', fileId.toString());
        const response = await this.apiService.get(url, searchQuery, { signal: signal });
        return response;
    }
    async getAllBase64Async(filesRequest, signal) {
        const url = 'api/ResourceFile/getAllBase64';
        const searchQuery = RequestHelper.createURLSearchParams(filesRequest);
        const response = await this.apiService.get(url, searchQuery, { signal: signal });
        return response;
    }
    async deleteAsync(fileId) {
        const url = 'api/ResourceFile/delete';
        const deleteQuery = new URLSearchParams();
        deleteQuery.append('id', fileId.toString());
        const response = await this.apiService.delete(url, deleteQuery);
        return response;
    }
}
//# sourceMappingURL=ResourceFileService.js.map