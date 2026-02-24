import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { Primitive } from '#components/Common';
import { GallerySelect } from '../GallerySelect';
export function ImageGallery(props) {
    const { selectedImage, width, height, imageDatabase, size } = props;
    if (!imageDatabase)
        return _jsx(_Fragment, { children: "Image Database empty" });
    const images = imageDatabase.getAllImages();
    const selectedItem = imageDatabase.getImage(selectedImage);
    // #region Render
    const renderValue = (item) => {
        if (!item)
            return _jsx(_Fragment, {});
        return _jsx(Primitive.Image, { height: height, icon: item.source, iconSize: size, width: width });
    };
    const renderItem = (item) => {
        if (!item)
            return _jsx(_Fragment, {});
        return _jsx(Primitive.Image, { height: height, icon: item.source, iconSize: size, width: width });
    };
    // #endregion
    return (_jsx(GallerySelect, { items: images, ...props, renderItem: renderItem, renderValue: renderValue, selectedItem: selectedItem }));
}
//# sourceMappingURL=ImageGallery.js.map