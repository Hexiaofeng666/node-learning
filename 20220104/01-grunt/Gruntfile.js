// 定义一个函数，并且将该函数以模块的形式导出
module.exports = function(grunt) {
    // 初始化 grunt 配置
    grunt.initConfig({
        // 读取 package.json 将其转换成一个对象
        package: grunt.file.readJSON('package.json'),
        // 定义拼接 js 文件用的对象
        // 将多个 js 文件拼接为一个 js 文件
        concat: {
            options: {
                // 配置合并后最前面需要显示的内容
                banner: '/* 福建东方锐智信息科技集团 */\n\n'
            },
            // 处理 js 文件用的
            dist: {
                // 涉及到的文件，要合并的所有文件
                src: '<%= package.srcFiles %>',
                // 合并之后的文件位置和文件名字
                dest: 'js/<%= package.name %>.js'
            },
            css: {
                src: ['src/*.css'],
                dest: 'src/css/all.css'
            }
        },
        // 压缩的动作
        uglify: {
            options: {
                banner: '/*! <%= package.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
              },
              build: {
                src: 'js/<%= package.name %>.js',
                dest: 'js/<%= package.name %>.min.js'
              }
        },
        // css 的压缩
        cssmin: {
            css: {
                src: 'src/css/all.css',
                dest: 'src/css/all.min.css'
            }
        },
        // 监视文件变化的操作
        watch: {
            scripts: {
                // 需要被监听的文件
                files: ['Gruntfile.js','package.json','src/*.js','src/*.css'],
                // 当文件发生变化后需要执行的动作
                tasks: ['default']
            }
        }
    })

    // 加载合并的模块
    grunt.loadNpmTasks('grunt-contrib-concat')

    grunt.loadNpmTasks('grunt-contrib-uglify')

    grunt.loadNpmTasks('grunt-css')

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['concat','uglify','cssmin']);
    // 用来做监视用的
    grunt.loadNpmTasks('grunt-contrib-watch')

}