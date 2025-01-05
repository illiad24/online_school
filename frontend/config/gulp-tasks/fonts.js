import fs from 'fs';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';
import * as path from 'path';

export const otfToTtf = () => {

    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, { encoding: false })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}
export const ttfToWoff2 = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, { encoding: false })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}
export const woff2Copy = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.woff2`, { encoding: false })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}
export const fontsStyle = () => {
    let fontsFile = `${app.path.srcFolder}/scss/fonts/fonts.scss`;
    app.isFontsReW ? fs.unlink(fontsFile, cb) : null;
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split(".")[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split("-")[0]
                            ? fontFileName.split("-")[0]
                            : fontFileName;
                        let fontWeight = fontFileName.split("-")[1]
                            ? fontFileName.split("-")[1]
                            : fontFileName;
                        let fontStyle = fontFileName.includes("-Italic")
                            ? "italic"
                            : "normal";
                        if (
                            fontWeight.toLowerCase() === "thin" ||
                            fontWeight.toLowerCase() === "hairline"
                        ) {
                            fontWeight = 100;
                        } else if (
                            fontWeight.toLowerCase() === "extralight" ||
                            fontWeight.toLowerCase() === "ultralight"
                        ) {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === "light") {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === "medium") {
                            fontWeight = 500;
                        } else if (
                            fontWeight.toLowerCase() === "semibold" ||
                            fontWeight.toLowerCase() === "demibold"
                        ) {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === "bold") {
                            fontWeight = 700;
                        } else if (
                            fontWeight.toLowerCase() === "extrabold" ||
                            fontWeight.toLowerCase() === "ultrabold"
                        ) {
                            fontWeight = 800;
                        } else if (
                            fontWeight.toLowerCase() === "black" ||
                            fontWeight.toLowerCase() === "heavy"
                        ) {
                            fontWeight = 900;
                        } else if (
                            fontWeight.toLowerCase() === "extrablack" ||
                            fontWeight.toLowerCase() === "ultrablack"
                        ) {
                            fontWeight = 950;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(
                            fontsFile,
                            `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`,
                            cb
                        );
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log("Файл scss/fonts/fonts.scss вже існує. Для оновлення файлу потрібно видалити його!");
            }
        } else {
            fs.unlink(fontsFile, cb)
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);
}
function cb() { }

// delete and create
// export const fontsStyle = () => {
//     let fontsFile = `${app.path.srcFolder}/scss/fonts/fonts.scss`;


//     if (fs.existsSync(fontsFile)) {
//         fs.unlinkSync(fontsFile);
//     }

//     fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
//         if (fontsFiles) {
//             if (!fs.existsSync(fontsFile)) {
//                 fs.writeFile(fontsFile, '', cb);
//                 let newFileOnly;
//                 for (var i = 0; i < fontsFiles.length; i++) {
//                     let fontFileName = fontsFiles[i].split(".")[0];
//                     if (newFileOnly !== fontFileName) {
//                         let fontName = fontFileName.split("-")[0] || fontFileName;
//                         let fontWeight = fontFileName.split("-")[1] || fontFileName;
//                         let fontStyle = fontFileName.includes("-Italic") ? "italic" : "normal";

//                         if (fontWeight.toLowerCase() === "thin" || fontWeight.toLowerCase() === "hairline") {
//                             fontWeight = 100;
//                         } else if (fontWeight.toLowerCase() === "extralight" || fontWeight.toLowerCase() === "ultralight") {
//                             fontWeight = 200;
//                         } else if (fontWeight.toLowerCase() === "light") {
//                             fontWeight = 300;
//                         } else if (fontWeight.toLowerCase() === "medium") {
//                             fontWeight = 500;
//                         } else if (fontWeight.toLowerCase() === "semibold" || fontWeight.toLowerCase() === "demibold") {
//                             fontWeight = 600;
//                         } else if (fontWeight.toLowerCase() === "bold") {
//                             fontWeight = 700;
//                         } else if (fontWeight.toLowerCase() === "extrabold" || fontWeight.toLowerCase() === "ultrabold") {
//                             fontWeight = 800;
//                         } else if (fontWeight.toLowerCase() === "black" || fontWeight.toLowerCase() === "heavy") {
//                             fontWeight = 900;
//                         } else if (fontWeight.toLowerCase() === "extrablack" || fontWeight.toLowerCase() === "ultrablack") {
//                             fontWeight = 950;
//                         } else {
//                             fontWeight = 400;
//                         }

//                         fs.appendFile(
//                             fontsFile,
//                             `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`,
//                             cb
//                         );
//                         newFileOnly = fontFileName;
//                     }
//                 }
//             }
//         }
//     });

//     return app.gulp.src(`${app.path.srcFolder}`);
// };