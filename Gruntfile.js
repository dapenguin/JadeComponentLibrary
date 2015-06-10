module.exports = function(grunt){
    //var autoprefixer = require('autoprefixer-core');

    require("time-grunt")(grunt);

    grunt.initConfig({
        'http-server': {
            dev: {
     
                // the server root directory 
                root: 'html',
     
                // the server port 
                // can also be written as a function, e.g. 
                // port: function() { return 8282; } 
                port: 8282,
     
                // the host ip address 
                // If specified to, for example, "127.0.0.1" the server will  
                // only be available on that ip. 
                // Specify "0.0.0.0" to be available everywhere 
                host: "localhost",
     
                //cache: <sec>,
                showDir : true,
                autoIndex: true,
     
                // server default file extension 
                ext: "html",
     
                // run in parallel with other tasks 
                runInBackground: true,
     
                // specify a logger function. By default the requests are 
                // sent to stdout. 
                logFn: function(req, res, error) { }
     
            }
     
        },
        jade: {
            compile: {
                options: {
                    data: {
                        debug: false
                    }
                },
                files: {
                    "html/main.html": "jade/main.jade"
                }
            }
        },
        /*sass: {
	    	options: {
		    	outputStyle: 'nested'
		    },
    		dev: {
			    files: {
			    	'css/main.css':'sass/main.scss',
			    	'css/main-ie8.css':'sass/main-ie8.scss'
			    }
		    }
    	},
        postcss: {
            options: {
                processors: [
                    autoprefixer(
                        {
                            browsers: [
                                'last 20 versions',
                                'ie >= 9'
                            ]
                        }
                    ).postcss
                ]
            },
            dev: {
                files: {
                    'css/main.css':'css/main.css'
                }
            }
        },
    	cssmin: {
    		dev: {
	    		options: {
					//aggressiveMerging: true,
					keepBreaks: true,
					debug: true,
                    compatibility: {
                        properties: {
                            spaceAfterClosingBrace: true,
                            ieSuffixHack: true
                        }
                    }
	    		},
    			files: {
    				'css/main.min.css':['css/main.css'],
    				'css/main-ie8.min.css':['css/main-ie8.css']
	    		}
	    	}
    	},*/
        bytesize: {
            all: {
                src: [
                    'css/*.css'
                ]
            }
        },
    	watch: {
    		css: {
	    		files: ['sass/*.scss','sass/**/*.scss'],
	    		tasks: ['buildCss']
	    	},
            jade: {
                files: ['jade/*.jade','jade/**/*.jade'],
                tasks: ['buildJade']
            }
    	}
    });

    grunt.registerTask('buildCss', [], function(){
        grunt.loadNpmTasks('grunt-sass');
        grunt.loadNpmTasks('grunt-bytesize');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-postcss');
        grunt.task.run('sass:dev');
        grunt.task.run('postcss');
        grunt.task.run('cssmin:dev');
        grunt.task.run('bytesize');
    });

    grunt.registerTask('buildJade', [], function(){
        grunt.loadNpmTasks('grunt-contrib-jade');
        grunt.task.run('jade');
    });

    grunt.registerTask('serve', [], function(){
        grunt.loadNpmTasks('grunt-http-server');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.task.run('http-server');
        grunt.task.run('watch');
    });
    
    grunt.registerTask('default', []);
};
