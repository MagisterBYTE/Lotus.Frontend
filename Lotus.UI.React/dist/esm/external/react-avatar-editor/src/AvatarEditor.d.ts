import React, { type CSSProperties } from 'react';
import { IPoint } from 'lotus-core/types';
interface ImageState {
    x: number;
    y: number;
    width?: number;
    height?: number;
    resource?: HTMLImageElement;
}
export interface AvatarEditorHandle {
    getImage: () => HTMLCanvasElement;
    getImageScaledToCanvas: () => HTMLCanvasElement;
    getCroppingRect: () => {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}
export interface AvatarEditorProps {
    width: number;
    height: number;
    style?: CSSProperties;
    sourceImage?: string | File;
    border?: number;
    position?: IPoint;
    scale?: number;
    rotate?: number;
    borderRadius?: number;
    previewBorderRadius?: number;
    crossOrigin?: '' | 'anonymous' | 'use-credentials';
    onLoadFailure?: () => void;
    onLoadSuccess?: (imageState: ImageState) => void;
    onImageReady?: () => void;
    onImageChange?: () => void;
    onMouseUp?: () => void;
    onMouseMove?: (e: TouchEvent | MouseEvent) => void;
    onPositionChange?: (position: IPoint) => void;
    color?: [number, number, number, number?];
    backgroundColor?: string;
    disableBoundaryChecks?: boolean;
    disableHiDPIScaling?: boolean;
    disableCanvasRotation?: boolean;
    borderColor?: [number, number, number, number?];
    showGrid?: boolean;
    gridColor?: string;
    previewSize?: number;
    removeBackground?: boolean;
    backgroundRemovalThreshold?: number;
    ref?: React.Ref<AvatarEditorHandle>;
}
export declare const AvatarEditor: React.ForwardRefExoticComponent<Omit<AvatarEditorProps, "ref"> & React.RefAttributes<AvatarEditorHandle>>;
export {};
//# sourceMappingURL=AvatarEditor.d.ts.map