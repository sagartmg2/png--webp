// import imagemin from 'imagemin';



// (async () => {

//     // const imagemin = require('imagemin');
//     const imagemin = await import('imagemin');
//     // import imageminWebp from 'imagemin-webp';
//     // const imageminWebp = require('imagemin-webp');
//     const imageminWebp = await import('imagemin-webp');

//     let path = "Images"
//     let dest = "Build"

//     // await imagemin([`${path}/*.{jpg,png,webp}`], {

//     console.log(__dirname);
//     console.log(__filename);


//     // await imagemin([` ${path}/**/*.{jpg,png}`], {
//     await imagemin([` ${path}/*.{jpg,png}`], {
//         destination: `${dest}`,
//         plugins: [
//             // imageminWebp({ quality: 50 })
//         ]
//     });

//     console.log('Images optimized');
// })();


(async () => {
    let path = "Images";
    let dest = "Build";

    const imagemin = await import('imagemin');

    await imagemin([`${path}/**/*.{jpg,png,webp}`], {
        destination: `${dest}`,
        plugins: [
            await import('imagemin-webp')({ quality: 50 }),
        ],
    });

    console.log('Images optimized');
})();