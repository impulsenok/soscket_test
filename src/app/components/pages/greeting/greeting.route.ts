import { ModuleWithProviders }  from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { GreetingComponent }       from "./component/greeting.component";

const MODULE_ROUTES: Routes = [{
    path: "",
    component: GreetingComponent
}];

export const GREETING_ROUTES: ModuleWithProviders = RouterModule.forChild(MODULE_ROUTES);