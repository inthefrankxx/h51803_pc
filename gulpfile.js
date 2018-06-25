const gulp = require("gulp"),
	  sass = require("gulp-sass"),
	  uglifyJS = require("gulp-uglify"),
	  babel = require("gulp-babel"),
	  htmlmin = require("gulp-htmlmin"),
	  connect = require("gulp-connect");
//启动服务器
gulp.task("connect", function(){
	connect.server({
		root:"dist",
		livereload:true
	});
});

//定制任务，压缩html
gulp.task("html", function(){
	gulp.src("src/**/*.html")
	.pipe(gulp.dest("dist/"))
	.pipe(connect.reload());
});

//定制任务，编译sass
gulp.task("sass", function(){
	gulp.src("src/sass/*.scss")
		.pipe(sass({outputStyle:"compressed"}))
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
});

// 定制任务：压缩JS
gulp.task("js", function(){
	gulp.src("src/js/*.js")
		.pipe(babel({
            presets: ['env']
        }))
        .pipe(uglifyJS())
		.pipe(gulp.dest("dist/js"))
		.pipe(connect.reload());
});

// 复制 images、lib、mock文件夹下所有资源
gulp.task("copy-images", function(){
	gulp.src("src/img/**/*.*")
		.pipe(gulp.dest("dist/img"))
		.pipe(connect.reload());
});
gulp.task("copy-lib", function(){
	gulp.src("src/lib/**/*.*")
		.pipe(gulp.dest("dist/lib"))
		.pipe(connect.reload());
});
gulp.task("copy-mock", function(){
	gulp.src("src/mock/**/*.*")
		.pipe(gulp.dest("dist/mock"))
		.pipe(connect.reload());
});
gulp.task("copy-css", function(){
	gulp.src("src/css/**/*.*")
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
});

gulp.task("copy", ["copy-images", "copy-lib", "copy-mock", "copy-css"]);

//监视任务
gulp.task("watch", function(){
	gulp.watch("src/sass/*.scss", ["sass"]);
	gulp.watch("src/**/*.html", ["html"]);
	gulp.watch(["src/js/*.js"], ["js"]);
});

//定制默认任务
gulp.task("default", ["html","sass", "copy","js","connect","watch"]);
