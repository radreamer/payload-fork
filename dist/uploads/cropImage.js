// @ts-strict-ignore
import { optionallyAppendMetadata } from './optionallyAppendMetadata.js';
export const percentToPixel = (value, dimension)=>{
    return Math.floor(parseFloat(value) / 100 * dimension);
};
export async function cropImage({ cropData, dimensions, file, heightInPixels, req, sharp, widthInPixels, withMetadata }) {
    try {
        const { x, y } = cropData;
        const fileIsAnimatedType = [
            'image/avif',
            'image/gif',
            'image/webp'
        ].includes(file.mimetype);
        const sharpOptions = {};
        if (fileIsAnimatedType) {
            sharpOptions.animated = true;
        }
        const formattedCropData = {
            height: Number(heightInPixels),
            left: percentToPixel(x, dimensions.width),
            top: percentToPixel(y, dimensions.height),
            width: Number(widthInPixels)
        };
        let cropped = sharp(file.tempFilePath || file.data, sharpOptions).extract(formattedCropData);
        cropped = await optionallyAppendMetadata({
            req,
            sharpFile: cropped,
            withMetadata
        });
        return await cropped.toBuffer({
            resolveWithObject: true
        });
    } catch (error) {
        console.error(`Error cropping image:`, error);
        throw error;
    }
}

//# sourceMappingURL=cropImage.js.map