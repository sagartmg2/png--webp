import glob from 'glob';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from "path"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    console.log("000");

    // const __dirname = dirname(fileURLToPath(import.meta.url));


    const imagesPath = join(__dirname, 'Images');
    const destPath = join(__dirname, 'Build');

    console.log(imagesPath);
    console.log(destPath);

    try {

        const imageFiles = await new Promise((resolve, reject) => {
            glob(`${imagesPath}/**/*.{jpg,png,webp}`, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });
        console.log(111);
        console.log({ imageFiles });
    } catch (err) {
        console.log(err);
    }



    await Promise.all(imageFiles.map(async (file) => {
        const destFile = join(destPath, file.replace(imagesPath, ''));
        await imagemin([file], {
            destination: dirname(destFile),
            plugins: [
                imageminWebp({ quality: 50 })
            ]
        });
    }));

    console.log('Images optimized');
})();
