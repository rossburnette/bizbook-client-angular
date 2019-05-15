/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NbPasswordAuthStrategy,
  NbAuthModule,
  NbAuthSimpleToken
} from '@nebular/auth';
import { NgxAuthModule } from './auth/auth.module';

import { httpInterceptorProviders } from "./auth/interceptor";

import { AuthGuard } from './auth/auth-guard.service';
;

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

    NgxAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:52894',
          login: {
            endpoint: '/api/token',
            redirect: {
              success: '/pages',
                failure: null,
              }
          },
          token: {
            class: NbAuthSimpleToken,
            key: 'access_token',
          }
        })
      ],
      forms: {}
    })
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard,httpInterceptorProviders,{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class AppModule {}