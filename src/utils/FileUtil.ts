import { createWriteStream, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { Upload } from '../services/IUpload';

export const uploadImage = async (imageUpload: Upload) => {
    const imageInput = await Promise.all([imageUpload]);

    const folder = path.resolve(__dirname, '../../public/images/');
    // tslint:disable-next-line: no-unused-expression
    !existsSync(folder) && mkdirSync(folder);
    const imagePath = `${imageInput[0].filename}`
    await imageInput[0].createReadStream().pipe(createWriteStream(imagePath));
    return imagePath;
}
