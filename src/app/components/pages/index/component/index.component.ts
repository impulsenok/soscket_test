import {
    Component, OnInit, ViewChild, ViewContainerRef, ComponentRef,
    ComponentFactoryResolver, ComponentFactory, HostListener
}     from "@angular/core";

import { HeroComponent } from "../../../items/hero/hero.component";

import { SocketService } from "../../../../services/socket.service";
import {LocalStorageProcessingService} from "../../../../services/local-storage.service";
import {KeyPressHandlerService} from "../../../../services/keypress-handler.service";


@Component({
    selector: "index-comp",
    template: require("./index.component.pug"),
    styleUrls: [ "index.component.scss" ]
})

export class IndexComponent implements OnInit {

    @ViewChild('heroesContainer', { read: ViewContainerRef }) container;
    componentRef: ComponentRef;

    private getMessageSUBSCRIBER: any = null;
    private addNewHeroSUBSCRIBER: any = null;
    private heroActSUBSCRIBER:    any = null;

    private heroComponentRef: any = null;

    public chatMessage: string = null;
    public allMessages: Array<string> = [];

    constructor(private socketService: SocketService,
                private resolver: ComponentFactoryResolver,
                private localStorage: LocalStorageProcessingService,
                private keyActionService: KeyPressHandlerService) {}

    private createHero(heroData?: any): void {
        const factory: ComponentFactory = this.resolver.resolveComponentFactory(HeroComponent);
        this.heroComponentRef = this.container.createComponent(factory);
        this.heroComponentRef.instance.heroData = heroData.heroData;
        this.heroComponentRef.instance.userName = heroData.userName;
    }

    private initHero(): void {
        this.socketService.createHero({heroData: this.localStorage.getHeroData(), userName: this.localStorage.getNickName()});
    }

    private handleAction(data: any): void {

        const heroElement = document.getElementsByClassName(data.hero.className);

        this.keyActionService.handleAction(data.eventCode, heroElement, data.hero)
    }

    ngOnInit(): void {
        // out own hero initialization here
        this.initHero();
        this.getMessageSUBSCRIBER = this.socketService.getMessage().subscribe(result => { this.allMessages.push(result.message) });
        // listen if another one hero will be added(another player connected to our game-room)
        this.addNewHeroSUBSCRIBER = this.socketService.addNewHero().subscribe(hero => this.createHero(hero));
        this.heroActSUBSCRIBER = this.socketService.listenToHeroAct().subscribe(data => this.handleAction(data.heroData))
    }

    public sendSocketMessage(): void {
        this.socketService.sendMessage(this.chatMessage);
        this.chatMessage = null;
    }

    ngOnDestroy(): void {
        if (this.getMessageSUBSCRIBER) this.getMessageSUBSCRIBER.unsubscribe();
        if (this.addNewHeroSUBSCRIBER) this.addNewHeroSUBSCRIBER.unsubscribe();
        if (this.heroActSUBSCRIBER) this.heroActSUBSCRIBER.unsubscribe();
    }
}