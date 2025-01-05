
import gulp from "gulp";
import { plugins } from "./config/gulp-plugins.js";
import { pathtofiles } from "./config/gulp-settings.js";
import fs from 'fs';

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    isWebP: !process.argv.includes('--nowebp'),
    isImgOpt: !process.argv.includes('--noimgopt'),
    isFontsReW: process.argv.includes('--rewrite'),
    gulp: gulp,
    path: pathtofiles,
    plugins: plugins
}

import { reset } from "./config/gulp-tasks/reset.js";
import { html } from "./config/gulp-tasks/html.js";
import { css } from "./config/gulp-tasks/css.js";
import { js } from "./config/gulp-tasks/js.js";
import { jsDev } from "./config/gulp-tasks/js-dev.js";
import { WebP, imagesOptimize, copySvg } from "./config/gulp-tasks/images.js";
import { sprite } from "./config/gulp-tasks/sprite.js";
import { gitignore } from "./config/gulp-tasks/gitignore.js";
import { otfToTtf, ttfToWoff2, woff2Copy, fontsStyle } from "./config/gulp-tasks/fonts.js";


const fonts = gulp.series(reset, function (done) {
    if (fs.existsSync(`${app.path.srcFolder}/fonts`)) {
        gulp.series(otfToTtf, ttfToWoff2, woff2Copy, fontsStyle)(done);
    } else {
        done();
    }
});

const devTasks = gulp.series(fonts, gitignore);
let buildTasks;
if (process.argv.includes('--nowebp')) {
    buildTasks = gulp.series(fonts, jsDev, js, gulp.parallel(html, css, gulp.parallel(WebP, imagesOptimize, copySvg), gitignore));
} else {
    buildTasks = gulp.series(fonts, jsDev, js, gulp.parallel(html, css, gulp.parallel(WebP, copySvg), gitignore));
}

export { html }
export { css }
export { js }
export { jsDev }
export { fonts }
export { sprite }

const development = devTasks;
const build = buildTasks;

export { development }
export { build }

gulp.task('default', development);






