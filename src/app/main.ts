/* Avoid: 'error TS2304: Cannot find name <type>' during compilation */
///<reference path="../../typings/index.d.ts"/>

import { AppComponent } from "./app.component";
import { bootstrap } from "@angular/platform-browser-dynamic";
import { provide, enableProdMode } from "@angular/core";
import { provideRouter, Resolve } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ROUTER_PROVIDERS } from "@angular/router-deprecated";
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthGuard } from './common/auth.guard';
import { disableDeprecatedForms, provideForms} from '@angular/forms';
import { routes } from './app.routes';
import { SharedService } from './common/services/shared.service';
import moment from 'moment';
import 'moment/locale/tr';
moment.locale('tr');

enableProdMode();
bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    AUTH_PROVIDERS,
    HTTP_PROVIDERS,
    AuthGuard,
    SharedService,
    disableDeprecatedForms(),
    provideForms(),
    provideRouter(routes),
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
