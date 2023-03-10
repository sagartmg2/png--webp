/* converting to their respective file extensions */

import path from 'path';
import imagemin from 'imagemin';
import { fileURLToPath } from 'url';
import fs from 'fs';

import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';

function getDirectories(path) {
    return fs.readdirSync(path)
        .filter(file => fs.statSync(`${path}/${file}`).isDirectory());
}


const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// C:/cb/cb-js
// console.log(path.join(__dirname, "Images"));
const directories = getDirectories(__dirname);
// console.log(directories);

// C:\cb\cb-js\index.html
// console.log(path.join(__dirname, 'index.html'));

let plugins = [
    // imageminJpegtran({quality: 75}),
    // imageminPngquant({
    //     quality: [0.6, 0.8]
    // })
    // imageminJpegtran({
    //     quality: 50
    // }),
    imageminMozjpeg(),
    imageminPngquant()
]
function convert(images_path, dest) {

    (async () => {


        const directories = getDirectories(images_path);

        // await imagemin([`${images_path}/**/*.{jpg,png,jpeg,JPG,JPEG,PNG,svg,webp}`], {
        await imagemin([`${images_path}/*.{jpg,png,jpeg,JPG,JPEG,PNG,svg,webp}`], {
            destination: `${dest}`,
            plugins,
            // use: [
            //     imageminJpegtran()
            // ]
        });

        for (let i = 0; i < directories.length; i++) {
            convert(path.join(images_path, directories[i]), path.join(dest, directories[i]))
        }

        console.log('Images optimized');
    })();
}

convert(path.join(__dirname, "Images"), path.join(__dirname, "Build"))
