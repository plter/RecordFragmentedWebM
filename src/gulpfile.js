const gulp = require('gulp');
const webpack = require("webpack-stream");
const path = require("path");

function BuildProject() {
    return gulp.src(path.join(__dirname, "code", "main.js"))
        .pipe(webpack(
            {
                mode: "development",
                module: {
                    rules: [
                        {
                            test: /\.(html)$/,
                            use: ['html-loader']
                        }
                    ]
                },
                output: {
                    filename: "main.js"
                }
            }
        ))
        .pipe(gulp.dest(path.join(__dirname, "..", "public")));
}


exports.default = gulp.series(BuildProject);