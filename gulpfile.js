const BuildProject = require("./src/gulpfile");
const gulp = require('gulp');

exports.default = gulp.series(BuildProject.default);