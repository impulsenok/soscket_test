import {
    Component, OnInit, ViewChild, ViewContainerRef, ComponentRef,
    ComponentFactoryResolver, ComponentFactory
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

    private createHeroComponent(heroPlayerData?: any): void {
        const factory: ComponentFactory = this.resolver.resolveComponentFactory(HeroComponent);
        this.heroComponentRef = this.container.createComponent(factory);
        this.heroComponentRef.instance.data = heroPlayerData;
    }

    private initHero(): void {
        this.socketService.createHero(this.localStorage.getPlayerData());
    }

    private handleAction(data: any): void {

        const heroElement = document.getElementsByClassName(data.heroPlayerData.user.id);

        this.keyActionService.handleAction(data.eventCode, heroElement, data.heroPlayerData)
    }

    ngOnInit(): void {

        // TODO: check here all heroes to add all existing


        // our own hero initialization here
        this.initHero();
        this.getMessageSUBSCRIBER = this.socketService.getMessage().subscribe(result => { this.allMessages.push(result.message) });

        // listen if another one hero will be added(another player connected to our game-room)
        this.addNewHeroSUBSCRIBER = this.socketService.newHeroWasAdded().subscribe(heroPlayerData => this.createHeroComponent(heroPlayerData));
        this.heroActSUBSCRIBER = this.socketService.listenToHeroAct().subscribe(data => this.handleAction(data))
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