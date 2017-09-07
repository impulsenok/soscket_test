import { Component, ElementRef, ViewEncapsulation, HostListener, Renderer2, AfterViewInit } from "@angular/core";

import { KeyPressHandlerService } from "../../../services/keypress-handler.service";
import {LocalStorageProcessingService} from "../../../services/local-storage.service";

@Component({
    selector: "hero",
    template: require("./hero.component.pug"),
    styleUrls: [ "hero.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class HeroComponent implements AfterViewInit {

    private heroData: any = null;

    constructor(private keyActionService: KeyPressHandlerService,
                private renderer: Renderer2,
                private heroElement: ElementRef,
                private localStorage: LocalStorageProcessingService) {

        this.heroData = this.localStorage.getHeroData();
    }

    @HostListener('document:keydown', ['$event']) onKeyUp(ev:KeyboardEvent) { this.keyActionService.handleAction(ev, this.heroElement, this.heroData) }

    ngAfterViewInit(): void {
        this.heroElement.nativeElement.childNodes[0].style.background = `url('../images/${this.heroData.img_name}') -${(this.heroData.sprite.firstMovementFrameColumn-1)*this.heroData.oneFrameHeight}px ${(this.heroData.sprite.downMove.row-1)*this.heroData.oneFrameHeight}px`
        console.log('renderrer: ', this.renderer) }
}