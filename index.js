import path from 'path';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import fs from 'fs';
import { fileURLToPath } from 'url';


async function convertImagesToWebP(directoryPath) {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            await convertImagesToWebP(filePath); // Recursively process subdirectories
        } else if (stats.isFile()) {
            const extension = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(extension)) {
                const outputDir = path.dirname(filePath).replace('Images', 'Build'); // Adjust the output directory path
                fs.mkdirSync(outputDir, { recursive: true }); // Ensure output directory exists
                await imagemin([filePath], {
                    destination: outputDir,
                    plugins: [imageminWebp({ quality: 50 })]
                });
                console.log(`Converted: ${filePath}`);
            }
        }
    }
}
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
// Change this to the root directory of your file system
convertImagesToWebP(__dirname)
    .then(() => console.log('Conversion complete'))
    .catch(error => console.error('Error converting images:', error));
