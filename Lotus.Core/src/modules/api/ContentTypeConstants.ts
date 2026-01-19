/**
 * Наиболее распространенные значения типов контента (MIME-типы)
 */
export const ContentTypeConstants = {
  /** 
   * Формат JSON. Используется для большинства современных API
   */
  ApplicationJson: 'application/json',

  /** 
   * Данные формы, закодированные в строке (стандарт для HTML-форм без файлов)
   */
  ApplicationXWwwFormUrlencoded: 'application/x-www-form-urlencoded',

  /** 
   * Данные формы с поддержкой передачи файлов (multipart)
   */
  MultipartFormData: 'multipart/form-data',

  /** 
   * Обычный текст без специального форматирования
   */
  TextPlain: 'text/plain',

  /** 
   * HTML-документы
   */
  TextHtml: 'text/html',

  /** 
   * XML-данные
   */
  ApplicationXml: 'application/xml',

  /** 
   * Бинарный поток данных (универсальный для файлов)
   */
  ApplicationOctetStream: 'application/octet-stream',

  /** 
   * Изображения формата PNG
   */
  ImagePng: 'image/png',

  /** 
   * Изображения формата JPEG
   */
  ImageJpeg: 'image/jpeg',

  /** 
   * Изображения формата GIF
   */
  ImageGif: 'image/gif',

  /** 
   * PDF-документы
   */
  ApplicationPdf: 'application/pdf'
} as const;
