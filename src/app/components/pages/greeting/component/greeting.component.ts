import { Component, OnInit }     from "@angular/core";

@Component({
    selector: "greeting-comp",
    template: require("./greeting.component.pug"),
    styleUrls: [ "greeting.component.scss" ]
})

export class GreetingComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {}
}