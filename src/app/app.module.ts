import { NgModule }              from "@angular/core";
import { BrowserModule }         from "@angular/platform-browser";
import { HttpClientModule }      from "@angular/common/http"

import { SocketIoModule, SocketIoConfig } from "ng-socket-io";

import { ROUTER }                from "./lib/app.routing";

import { LayoutModule }          from "./components/layout/layout.module";
import { IndexModule }           from "./components/pages/index/index.module";

import { LayoutComponent }       from "./components/layout/component/layout.component";
import { PageNotFoundComponent } from "./components/pages/404/404.component";

import { SocketService }         from "./services/socket.service";

import { CONFIG } from "./lib/app.config";

const socketConfig: SocketIoConfig = { url: CONFIG.socketServerUrl, options: {} };

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        SocketIoModule.forRoot(socketConfig),
        ROUTER,

        LayoutModule,

        IndexModule
    ],
    declarations: [
        PageNotFoundComponent
    ],
    providers: [
        SocketService
    ],
    bootstrap: [
        LayoutComponent
    ]
})
export class AppModule {}