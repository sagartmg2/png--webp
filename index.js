import imagemin from 'imagemin';
// const imagemin = require('imagemin');
import imageminWebp from 'imagemin-webp';
// const imageminWebp = require('imagemin-webp');

(async () => {
    let path = "Images/EmployersOverview/Insider"

    await imagemin([`${path}/*.{jpg,png}`], {
        destination: `${path}`,
        plugins: [
            imageminWebp({ quality: 50 })
        ]
    });

    console.log('Images optimized');
})();