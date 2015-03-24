var src = "./",
		dest = "./build/";

var config = {
	browserSync: {
		server: {
			baseDir: dest
		},
		notify: false,
		browser: ["google chrome"]
	},
	less: {
		src: src + 'less/styles.less',
		watch: src + 'less/**/*.less',
		dest: dest + 'css'
	},
	images: {
		src: src + 'app/images/*.*',
		dest: dest + '/images'
	},
	icons: {
		src: [
			src + 'bower_components/bootstrap-sf1/dist/icons/**/*.*'
		],
		dest: dest + '/icons'
	},
	scripts: {
		src: src + 'app/main.js',
		dest: dest,
		watch: src + 'app/**/*.js',
		deps: ['react', 'react-router']
	},
	fonts: {
		src: [
			src + 'node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg,woff2}',
			src + 'bower_components/bootstrap-sf1/dist/fonts/**/*.{ttf,woff,eof,svg,woff2}',
			src + 'fonts/**/*.{ttf,woff,eof,svg,woff2}'
		],
		dest: dest + "/fonts"
	},
	html: {
		src: src + 'app/index.html',
		dest: dest + '/'
	}
};

module.exports = config;
