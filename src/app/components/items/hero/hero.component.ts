import { Component, ElementRef, ViewEncapsulation, HostListener, Renderer2, AfterViewInit } from "@angular/core";

import { KeyPressHandlerService } from "../../../services/keypress-handler.service";

@Component({
    selector: "hero",
    template: require("./hero.component.pug"),
    styleUrls: [ "hero.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class HeroComponent implements AfterViewInit {

    constructor(private keyActionService: KeyPressHandlerService,
                private renderer: Renderer2,
                private heroElement: ElementRef) {}

    @HostListener('document:keyup', ['$event']) onKeyUp(ev:KeyboardEvent) { this.keyActionService.handleAction(ev, this.heroElement) }

    ngAfterViewInit(): void { console.log('renderrer: ', this.renderer) }
}