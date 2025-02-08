export class BrowserHelper {
    static isLocalhost() {
        return Boolean(window.location.hostname === 'localhost' ||
            // [::1] is the IPv6 localhost address.
            window.location.hostname === '[::1]' ||
            // 127.0.0.1/8 is considered localhost for IPv4.
            window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
    }
    /**
     * return true if url is in absolute form
     * see for details: https://stackoverflow.com/a/19709846
     * @param url url
     */
    static isAbsoluteUrl(url) {
        return new RegExp('^((?:[a-z]+:)?//|mailto:)', 'i').test(url);
    }
    static open(url, openInNewTab = false) {
        window.open(url, openInNewTab ? '_blank' : '_self');
    }
    /**
     *
     * @param file
     * @param fileName
     */
    static downloadBlobFile(file, fileName) {
        const downloadUrl = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    ;
}
