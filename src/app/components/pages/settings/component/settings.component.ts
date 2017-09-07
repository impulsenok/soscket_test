import { Component, OnInit } from "@angular/core";

@Component({
    selector: "settings-comp",
    template: require("./settings.component.pug"),
    styleUrls: [ "settings.component.scss" ]
})

export class SettingsComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}