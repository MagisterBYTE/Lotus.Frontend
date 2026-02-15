import { ApiService } from '#modules/api';
import { IResponse, IResponsePage, RequestHelper } from '#modules/requestAndResponse';
import { IResourceFile, IResourceFileBase64, IResourceFilesRequest } from './types';
import { IResourcesFileCreateRequest } from './types/ResourceFileCreateRequest';

/**
 * Сервис для работы с файлами
 */
export class ResourceFileService
{
  // #region Fields
  public apiService: ApiService;
  // #endregion

  // #region Constructor
  constructor(apiService: ApiService)
  {
    this.apiService = apiService;
  }
  // #endregion

  // #region Main methods
  public async createAsync(fileCreate: IResourcesFileCreateRequest):Promise<IResponse<IResourceFile>>
  {
    const url = 'api/ResourceFile/create';
  
    const response = await this.apiService.post<IResponse<IResourceFile>>(url, fileCreate);
    return response;
  }

  public async getBase64Async(fileId: string, signal?: AbortSignal):Promise<IResponse<IResourceFileBase64>>
  {
    const url = 'api/ResourceFile/getBase64';
    const searchQuery: URLSearchParams = new URLSearchParams();
    searchQuery.append('id', fileId.toString());

    const response = await this.apiService.get<IResponse<IResourceFileBase64>>(url, searchQuery, { signal: signal });
    return response;
  }

  public async getAllBase64Async(filesRequest: IResourceFilesRequest, signal?: AbortSignal):Promise<IResponsePage<IResourceFileBase64>>
  {
    const url = 'api/ResourceFile/getAllBase64';
    const searchQuery: URLSearchParams = RequestHelper.createURLSearchParams(filesRequest);
    
    const response = await this.apiService.get<IResponsePage<IResourceFileBase64>>(url, searchQuery, { signal: signal });
    return response;
  }

  public async deleteAsync(fileId: string):Promise<IResponse>
  {
    const url = 'api/ResourceFile/delete';
    const deleteQuery: URLSearchParams = new URLSearchParams();
    deleteQuery.append('id', fileId.toString());
    
    const response = await this.apiService.delete<IResponse>(url, deleteQuery);
    return response;
  }
  // #endregion
}