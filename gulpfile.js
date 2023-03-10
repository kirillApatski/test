const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlMin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const sync = require('browser-sync').create();


function html() {
	return src('src/**.html')
		.pipe(include({
			prefix: '@@'
		}))
		.pipe(htmlMin({
			collapseWhitespace: true
		}))
		.pipe(dest('dist'))
}

function scss() {
	return src('src/**.scss')
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(csso())
		.pipe(concat('index.css'))
		.pipe(dest('dist'))
}

function js() {
	return src('src/*.js')
		.pipe(dest('dist'))
}

function clear() {
	return del('dist');
}

function serve() {
	sync.init({
		server: './dist'
	})

	watch('src/**.html', series(html)).on('change', sync.reload)
	watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
}
function buildImagesDev() {
	return src('./src/images/**/*.{gif,jpg,png,svg,jpeg}')
		.pipe(dest('dist/images'));
}

function buildFontsDev() {
	return src('./src/fonts/**/*.{ttf,woff,woff2,eof,svg}')
		.pipe(dest('dist/fonts'));
}

function buildFontsCSSDev() {
	return src('./src/fonts/**.css')
		.pipe(dest('dist/fonts'));
}


exports.build = series(clear, scss, html, buildImagesDev, buildFontsDev, buildFontsCSSDev)
exports.serve = series(clear, scss, html, buildImagesDev, buildFontsDev, buildFontsCSSDev, js, serve)
exports.clear = clear
