import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "playground",
    template: require("./playground.component.pug"),
    styleUrls: [ "playground.component.scss" ],
    encapsulation: ViewEncapsulation.None,
    exportAs: "heroesContainer"
})
export class PlaygroundComponent {}