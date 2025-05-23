import type { SanitizedConfig } from '../config/types.js';
import type { PayloadRequest } from '../types/index.js';
import type { WithMetadata } from './optionallyAppendMetadata.js';
import type { UploadEdits } from './types.js';
export declare const percentToPixel: (value: any, dimension: any) => number;
type CropImageArgs = {
    cropData: UploadEdits['crop'];
    dimensions: {
        height: number;
        width: number;
    };
    file: PayloadRequest['file'];
    heightInPixels: number;
    req?: PayloadRequest;
    sharp: SanitizedConfig['sharp'];
    widthInPixels: number;
    withMetadata?: WithMetadata;
};
export declare function cropImage({ cropData, dimensions, file, heightInPixels, req, sharp, widthInPixels, withMetadata, }: CropImageArgs): Promise<{
    data: Buffer;
    info: import("sharp").OutputInfo;
}>;
export {};
//# sourceMappingURL=cropImage.d.ts.map