const isDataURL = (str) => {
    const regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z-]+=[a-z-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@/?%\s]*\s*$/i;
    return !!str.match(regex);
};
export const loadImageURL = (imageURL, crossOrigin) => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    if (!isDataURL(imageURL) && crossOrigin) {
        image.crossOrigin = crossOrigin;
    }
    image.src = imageURL;
});
//# sourceMappingURL=loadImageURL.js.map