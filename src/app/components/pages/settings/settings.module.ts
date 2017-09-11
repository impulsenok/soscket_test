import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule }  from "@angular/forms";

import { SETTINGS_ROUTES } from "./settings.route";

import { SettingsComponent } from "./component/settings.component";

import { ComponentsProviderModule } from "../../../providers/components-provider.module";

import {LocalStorageProcessingService} from "../../../services/local-storage.service";
import {SettingsService} from "./component/settings.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ComponentsProviderModule,
        SETTINGS_ROUTES
    ],
    declarations: [
        SettingsComponent
    ],
    providers: [
        LocalStorageProcessingService,
        SettingsService
    ]
})

export class SettingsModule {}