import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SETTINGS_ROUTES } from "./settings.route";

import { SettingsComponent } from "./component/settings.component";

import { ComponentsProviderModule } from "../../../providers/components-provider.module";

@NgModule({
    imports: [
        CommonModule,
        ComponentsProviderModule,
        SETTINGS_ROUTES
    ],
    declarations: [
        SettingsComponent
    ]
})

export class SettingsModule {}