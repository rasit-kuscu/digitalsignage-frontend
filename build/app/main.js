/* Avoid: 'error TS2304: Cannot find name <type>' during compilation */
///<reference path="../../typings/index.d.ts"/>
System.register(["./app.component", "@angular/platform-browser-dynamic", "@angular/core", '@angular/router', "@angular/common", "@angular/router-deprecated", '@angular/http', 'angular2-jwt', './common/auth.guard', '@angular/forms', './app.routes', './common/services/shared.service', 'moment', 'moment/locale/tr'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app_component_1, platform_browser_dynamic_1, core_1, router_1, common_1, router_deprecated_1, http_1, angular2_jwt_1, auth_guard_1, forms_1, app_routes_1, shared_service_1, moment_1;
    return {
        setters:[
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (auth_guard_1_1) {
                auth_guard_1 = auth_guard_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            },
            function (shared_service_1_1) {
                shared_service_1 = shared_service_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            },
            function (_1) {}],
        execute: function() {
            moment_1.default.locale('tr');
            core_1.enableProdMode();
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
                router_deprecated_1.ROUTER_PROVIDERS,
                angular2_jwt_1.AUTH_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                auth_guard_1.AuthGuard,
                shared_service_1.SharedService,
                forms_1.disableDeprecatedForms(),
                forms_1.provideForms(),
                router_1.provideRouter(app_routes_1.routes),
                core_1.provide(common_1.LocationStrategy, { useClass: common_1.HashLocationStrategy })
            ]);
        }
    }
});

//# sourceMappingURL=main.js.map
