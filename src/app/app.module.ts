import { NgModule }              from "@angular/core";
import { BrowserModule }         from "@angular/platform-browser";
import { HttpClientModule }      from "@angular/common/http"

import { SocketIoModule, SocketIoConfig } from "ng-socket-io";
import { LocalStorageModule }    from "angular-2-local-storage";

import { ROUTER }                from "./lib/app.routing";

import { LayoutModule }          from "./components/layout/layout.module";
import { IndexModule }           from "./components/pages/index/index.module";
import { GreetingModule }        from "./components/pages/greeting/greeting.module";
import { SettingsModule }        from "./components/pages/settings/settings.module";

import { LayoutComponent }       from "./components/layout/component/layout.component";
import { PageNotFoundComponent } from "./components/pages/404/404.component";

import { SocketService }         from "./services/socket.service";
import { KeyPressHandlerService }from "./services/keypress-handler.service";
import { HeroService }           from "./components/items/hero/hero.service";

import { CONFIG } from "./lib/app.config";

const socketConfig: SocketIoConfig = { url: CONFIG.socketServerUrl, options: {} };

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        SocketIoModule.forRoot(socketConfig),
        LocalStorageModule.withConfig({
            prefix: 'socket-fun',
            storageType: 'localStorage'
        }),
        ROUTER,

        LayoutModule,

        IndexModule,
        GreetingModule,
        SettingsModule
    ],
    declarations: [
        PageNotFoundComponent
    ],
    providers: [
        SocketService,
        KeyPressHandlerService,
        HeroService
    ],
    bootstrap: [
        LayoutComponent
    ]
})
export class AppModule {}