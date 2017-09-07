import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GREETING_ROUTES } from "./greeting.route";

import { GreetingComponent } from "./component/greeting.component";

import { ComponentsProviderModule } from "../../../providers/components-provider.module";

@NgModule({
    imports: [
        CommonModule,
        ComponentsProviderModule,
        GREETING_ROUTES
    ],
    declarations: [
        GreetingComponent
    ]
})

export class GreetingModule {}