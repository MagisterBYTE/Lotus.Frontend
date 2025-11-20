import { loadImageURL } from './loadImageURL';
export const loadImageFile = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            if (!e?.target?.result) {
                throw new Error('No image data');
            }
            const image = loadImageURL(e.target.result);
            resolve(image);
        }
        catch (e) {
            reject(e);
        }
    };
    reader.readAsDataURL(file);
});
//# sourceMappingURL=loadImageFile.js.map