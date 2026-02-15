import { TResourceFileSaveFormat } from './ResourceFileSaveFormat';
import { TResourceFileStorage } from './ResourceFileStorage';

/**
 * Класс для создания нового файла.
 */
export interface IResourcesFileCreateRequest {
  /**
   * Наименование файла.
   */
  name?: string | undefined;

  /**
   * Место назначение файла.
   */
  target: TResourceFileStorage;

  /**
   * Формат хранения файла.
   */
  saveFormat: TResourceFileSaveFormat;

  /**
   * Идентификатор автора файла.
   */
  authorId?: string;

  /**
   * Идентификатор типа файла.
   */
  fileTypeId?: number;

  /**
   * Идентификатор группы файла.
   */
  groupId?: number;
}

/**
 * Класс для создания ссылки на локальный файл.
 */
export interface IResourceFileCreateLocalRequest extends IResourcesFileCreateRequest {
  /**
   * Идентификатор файла.
   */
  id: string;
}

/**
 * Класс для создания нового файла из потока.
 */
export interface IResourceFileCreateStreamRequest extends IResourcesFileCreateRequest {
  /**
   * Поток для чтения файла.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readStream: any;

  /**
   * Формат хранения файла.
   * @default TResourceFileSaveFormats.Raw
   */
  saveFormat: TResourceFileSaveFormat;

  /**
   * Место назначение файла.
   * @default TResourceFileStorages.Database
   */
  target: TResourceFileStorage;
}

/**
 * Класс для создания нового файла из байтового массива.
 */
export interface IResourceFileCreateRawRequest extends IResourcesFileCreateRequest {
  /**
   * Данные файла.
   */
  data: Uint8Array;

  /**
   * Формат хранения файла.
   * @default TResourceFileSaveFormats.Raw
   */
  saveFormat: TResourceFileSaveFormat;

  /**
   * Место назначение файла.
   * @default TResourceFileStorages.Database
   */
  target: TResourceFileStorage;
}

/**
 * Класс для создания нового файла из строки base64.
 */
export interface IResourceFileCreateBase64Request extends IResourcesFileCreateRequest {
  /**
   * Данные файла в формате строки base64.
   */
  data: string;

  /**
   * Формат хранения файла.
   * @default TResourceFileSaveFormats.Base64
   */
  saveFormat: TResourceFileSaveFormat;

  /**
   * Место назначение файла.
   * @default TResourceFileStorages.Database
   */
  target: TResourceFileStorage;
}