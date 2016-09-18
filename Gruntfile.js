module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            qtime: {
                files: [
                    {
                        expand: true,
                        cwd: './src',
                        src: '**/*.js',
                        dest: 'build/'
                    }
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('build', ['uglify']);

};