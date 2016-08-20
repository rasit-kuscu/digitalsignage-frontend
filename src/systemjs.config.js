(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'rxjs': 'lib/rxjs',
        '@angular': 'lib/@angular',
        'angular2-notifications': 'lib/angular2-notifications',
        'angular2-moment': 'lib/angular2-moment',
        'angular2-jwt': 'lib/angular2-jwt/angular2-jwt.js',
        'moment': 'lib/moment',
        'ng2-bs3-modal': 'lib/ng2-bs3-modal',
        'angular2-tree-component': 'lib/angular2-tree-component',
        'lodash': 'lib/lodash',
        'angular2-contextmenu': 'lib/angular2-contextmenu',
        'ng2-file-upload': 'lib/ng2-file-upload'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'angular2-notifications': { main: 'components.js', defaultExtension: 'js' },
        'angular2-moment': {main: 'index.js', defaultExtension: 'js' },
        'angular2-jwt': { defaultExtension: 'js' },
        'ng2-bs3-modal': { defaultExtension: 'js' },
        'angular2-tree-component': { main: 'dist/angular2-tree-component.js', defaultExtension: 'js' },
        'lodash': { main: 'lodash.js', defaultExtension: 'js' },
        'moment': { main: 'moment.js', defaultExtension: 'js' },
        'angular2-contextmenu': { main: 'angular2-contextmenu.js', defaultExtension: 'js' },
        'ng2-file-upload': { defaultExtension: 'js' }
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade',
        '@angular/forms'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
    });

    var config = {
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);
