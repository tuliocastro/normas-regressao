const { src, dest, series } = require('gulp');
const pug = require('gulp-pug');
const plug = require('gulp-load-plugins')()

const views = () => {
    return src('./src/view/**/*.pug')
        .pipe(
            pug({
                // Your options in here.
            })
        )
        .pipe(dest('./dist'));
};

const js = () => {
    return src("./src/js/**/*.js")

    // Concatenate all the angular files into a single JavaScript file.
    .pipe(plug.concat('app.js'))

    // Save an unminified version.
    .pipe(dest("./dist/"))
    // Minify and save as app.min.js
    // .pipe(plug.uglify())
    //.pipe(plug.rename({ extname: '.min.js' }))
    // .pipe(plug.rename({suffix: '.min'}))
    // .pipe(dest("./dist/app.min.js"));

}
exports.default = series(views, js)