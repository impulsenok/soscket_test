import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule }  from "@angular/forms";

import { INDEX_ROUTES } from "./index.route";

import { IndexComponent } from "./component/index.component";
import { HeroComponent }  from "../../items/hero/hero.component";
import { PlaygroundComponent } from "../../items/playground/playground.component";

import { ComponentsProviderModule } from "../../../providers/components-provider.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ComponentsProviderModule,
        INDEX_ROUTES
    ],
    declarations: [
        IndexComponent,
        HeroComponent,
        PlaygroundComponent
    ],
    entryComponents: [
        HeroComponent
    ]
})

export class IndexModule {}