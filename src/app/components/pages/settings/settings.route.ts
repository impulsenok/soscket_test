import { ModuleWithProviders }  from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SettingsComponent }       from "./component/settings.component";

const MODULE_ROUTES: Routes = [{
    path: "settings",
    component: SettingsComponent
}];

export const SETTINGS_ROUTES: ModuleWithProviders = RouterModule.forChild(MODULE_ROUTES);