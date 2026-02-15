import { ApiService } from '#modules/api';
import { IResponse, IResponsePage } from '#modules/requestAndResponse';
import { IResourceFile, IResourceFileBase64, IResourceFilesRequest } from './types';
import { IResourcesFileCreateRequest } from './types/ResourceFileCreateRequest';
/**
 * Сервис для работы с файлами
 */
export declare class ResourceFileService {
    apiService: ApiService;
    constructor(apiService: ApiService);
    createAsync(fileCreate: IResourcesFileCreateRequest): Promise<IResponse<IResourceFile>>;
    getBase64Async(fileId: string, signal?: AbortSignal): Promise<IResponse<IResourceFileBase64>>;
    getAllBase64Async(filesRequest: IResourceFilesRequest, signal?: AbortSignal): Promise<IResponsePage<IResourceFileBase64>>;
    deleteAsync(fileId: string): Promise<IResponse>;
}
//# sourceMappingURL=ResourceFileService.d.ts.map