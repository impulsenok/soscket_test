import {
    Component, OnInit, ViewChild, ViewContainerRef, ComponentRef,
    ComponentFactoryResolver, ComponentFactory, ViewEncapsulation
}     from "@angular/core";

import { HeroComponent } from "../../../items/hero/hero.component";

import { SocketService } from "../../../../services/socket.service";
import {LocalStorageProcessingService} from "../../../../services/local-storage.service";
import {KeyPressHandlerService} from "../../../../services/keypress-handler.service";
import {Router} from "@angular/router";
import {Subscription, Subscription, Subscription} from "rxjs";
import {DomElementsProcessing} from "../../../../services/dom-processing.service";
import {HeroService} from "../../../items/hero/hero.service";


@Component({
    selector: "index-comp",
    template: require("./index.component.pug"),
    styleUrls: [ "index.component.scss" ],
    encapsulation: ViewEncapsulation.None
})

export class IndexComponent implements OnInit {

    @ViewChild('heroesContainer', { read: ViewContainerRef }) container: any;
    componentRef: ComponentRef<Component>;

    private heroWasKilledSUBSCRIBER: Subscription = null;
    private getMessageSUBSCRIBER:    Subscription = null;
    private addNewHeroSUBSCRIBER:    Subscription = null;
    private heroActSUBSCRIBER:       Subscription = null;
    private scoresUpdatedSUBSCRIBER: Subscription = null;
    private removeHeroElementSUBSCRIBER: Subscription = null;

    private heroComponentRef: any = null;

    public chatMessage: string = null;
    public allMessages: Array<string> = [];
    public scores: Array<any> = [];

    constructor(private router: Router,
                private socketService: SocketService,
                private resolver: ComponentFactoryResolver,
                private localStorage: LocalStorageProcessingService,
                private keyActionService: KeyPressHandlerService,
                private domProcessing: DomElementsProcessing,
                private heroService: HeroService) {}

    private createHeroComponent(heroesPlayerData: Array<any>): void {

        if (heroesPlayerData && heroesPlayerData.length > 0) {
            heroesPlayerData.forEach((heroPlayerData: any) => {
                const factory: ComponentFactory<Component> = this.resolver.resolveComponentFactory(HeroComponent);
                this.heroComponentRef = this.container.createComponent(factory);
                this.heroComponentRef.instance.data = heroPlayerData;
            });
        } else {
            this.router.navigate(['settings']);
        }
    }

    private initHero(): void {
        // add all existing heroes if they are exists
        this.socketService.getAllExistingHeroes(this.localStorage.getPlayerData());
        // send 'create hero' event to all players
        this.socketService.createHero(this.localStorage.getPlayerData());
    }

    private handleAction(data: any): void {
        const heroElement = document.getElementById(data.heroPlayerData.user.id);
        this.keyActionService.handleAction(data.eventCode, heroElement, data.heroPlayerData)
    }

    private killHero(data: any): void {
        let heroElement = document.getElementById(data.heroPlayerData.user.id);
        this.domProcessing.addBloodAfterHeroKill(data.blood);
        this.heroService.setHeroStyles(heroElement, data.heroPlayerData);
        this.socketService.saveHeroPlayerData(data.heroPlayerData);
    }

    ngOnInit(): void {
        // our own hero initialization here
        this.initHero();
        this.getMessageSUBSCRIBER = this.socketService.getMessage().subscribe(data => { this.allMessages.push(data) });

        // listen if another one hero will be added(another player connected to our game-room)
        this.addNewHeroSUBSCRIBER = this.socketService.newHeroWasAdded().subscribe(heroesPlayerData => this.createHeroComponent(heroesPlayerData));
        this.heroActSUBSCRIBER = this.socketService.listenToHeroAct().subscribe(data => this.handleAction(data));
        this.heroWasKilledSUBSCRIBER = this.socketService.heroWasKilled().subscribe(data => this.killHero(data));
        this.scoresUpdatedSUBSCRIBER = this.socketService.scoreUpdate().subscribe(scores => this.scores = scores.sort((a, b) => b.value - a.value));
        this.removeHeroElementSUBSCRIBER = this.socketService.removeHeroElement().subscribe((id: any) => this.domProcessing.deleteHeroElement(id.id))
    }

    public sendSocketMessage(): void {
        if (this.chatMessage) {
            this.socketService.sendMessage(this.localStorage.getPlayerData().name, this.chatMessage);
            this.chatMessage = null;
        }
    }

    ngOnDestroy(): void {
        if (this.getMessageSUBSCRIBER) this.getMessageSUBSCRIBER.unsubscribe();
        if (this.addNewHeroSUBSCRIBER) this.addNewHeroSUBSCRIBER.unsubscribe();
        if (this.heroActSUBSCRIBER) this.heroActSUBSCRIBER.unsubscribe();
        if (this.heroWasKilledSUBSCRIBER) this.heroWasKilledSUBSCRIBER.unsubscribe();
        if (this.removeHeroElementSUBSCRIBER) this.removeHeroElementSUBSCRIBER.unsubscribe();
    }
}