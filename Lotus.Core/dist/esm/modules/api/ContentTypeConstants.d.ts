/**
 * Наиболее распространенные значения типов контента (MIME-типы)
 */
export declare const ContentTypeConstants: {
    /**
     * Формат JSON. Используется для большинства современных API
     */
    readonly ApplicationJson: "application/json";
    /**
     * Данные формы, закодированные в строке (стандарт для HTML-форм без файлов)
     */
    readonly ApplicationXWwwFormUrlencoded: "application/x-www-form-urlencoded";
    /**
     * Данные формы с поддержкой передачи файлов (multipart)
     */
    readonly MultipartFormData: "multipart/form-data";
    /**
     * Обычный текст без специального форматирования
     */
    readonly TextPlain: "text/plain";
    /**
     * HTML-документы
     */
    readonly TextHtml: "text/html";
    /**
     * XML-данные
     */
    readonly ApplicationXml: "application/xml";
    /**
     * Бинарный поток данных (универсальный для файлов)
     */
    readonly ApplicationOctetStream: "application/octet-stream";
    /**
     * Изображения формата PNG
     */
    readonly ImagePng: "image/png";
    /**
     * Изображения формата JPEG
     */
    readonly ImageJpeg: "image/jpeg";
    /**
     * Изображения формата GIF
     */
    readonly ImageGif: "image/gif";
    /**
     * PDF-документы
     */
    readonly ApplicationPdf: "application/pdf";
};
//# sourceMappingURL=ContentTypeConstants.d.ts.map