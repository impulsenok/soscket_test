import {Component, ElementRef, ViewEncapsulation, HostListener, AfterViewInit, OnInit} from "@angular/core";

import {SocketService} from "../../../services/socket.service";
import {LocalStorageProcessingService} from "../../../services/local-storage.service";
import {HeroService} from "./hero.service";

@Component({
    selector: "hero",
    template: require("./hero.component.pug"),
    styleUrls: [ "hero.component.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class HeroComponent implements AfterViewInit, OnInit {

    public data: any = null;

    constructor(private socket: SocketService,
                private localStorageService: LocalStorageProcessingService,
                private heroService: HeroService,
                private heroElement: ElementRef) {}

    @HostListener('document:keydown', ['$event']) onKeyUp(ev:KeyboardEvent) {
        if (this.data.user.name == this.localStorageService.getPlayerData().name) this.socket.heroAction({eventCode: ev.keyCode, heroPlayerData: this.data});
    }

    ngOnInit(): void { console.log('this is hero onInit : ', this.data) }

    ngAfterViewInit(): void {
        this.heroElement.nativeElement.childNodes[0].style.background = `url('../images/${this.data.hero.img_name}') -${(this.data.hero.sprite.firstMovementFrameColumn-1)*this.data.hero.oneFrameHeight}px ${(this.data.hero.sprite.downMove.row-1)*this.data.hero.oneFrameHeight}px`
        this.heroService.setHeroStyles(this.heroElement.nativeElement.childNodes[0], this.data);
    }
}