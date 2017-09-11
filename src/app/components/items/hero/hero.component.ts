import {Component, ElementRef, ViewEncapsulation, HostListener, AfterViewInit, OnInit} from "@angular/core";

import { KeyPressHandlerService } from "../../../services/keypress-handler.service";
import {SocketService} from "../../../services/socket.service";
import {LocalStorageProcessingService} from "../../../services/local-storage.service";

@Component({
    selector: "hero",
    template: require("./hero.component.pug"),
    styleUrls: [ "hero.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class HeroComponent implements AfterViewInit, OnInit {

    private heroData: any = null;
    private userName: string = null;

    constructor(private keyActionService: KeyPressHandlerService,
                private socket: SocketService,
                private localStorageService: LocalStorageProcessingService,
                private heroElement: ElementRef) {}

    @HostListener('document:keydown', ['$event']) onKeyUp(ev:KeyboardEvent) {
        if (this.userName == this.localStorageService.getNickName()) this.socket.heroAction({eventCode: ev.keyCode, hero: this.heroData});
    }

    ngOnInit(): void { console.log('this is hero onInit : ', this.heroData, this.userName) }

    ngAfterViewInit(): void {

        console.log('heroes: ', this.heroElement);

        this.heroElement.nativeElement.childNodes[0].style.background = `url('../images/${this.heroData.img_name}') -${(this.heroData.sprite.firstMovementFrameColumn-1)*this.heroData.oneFrameHeight}px ${(this.heroData.sprite.downMove.row-1)*this.heroData.oneFrameHeight}px`
    }
}