import { Component, OnInit } from "@angular/core";

import { CONFIG } from "../../../../lib/app.config";
import {LocalStorageProcessingService} from "../../../../services/local-storage.service";
import {SettingsService} from "./settings.service";
import {SocketService} from "../../../../services/socket.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

interface User {
    name: string;
    id?: string;
}

@Component({
    selector: "settings-comp",
    template: require("./settings.component.pug"),
    styleUrls: [ "settings.component.scss" ]
})

export class SettingsComponent implements OnInit {

    public user: User = null;
    public hero: any = null;

    public heroes: Array<any> = [];

    constructor(private localStorage: LocalStorageProcessingService,
                private settingsService: SettingsService,
                private socket: SocketService) {}

    ngOnInit(): void {
        Object.keys(CONFIG.heroes).forEach(key => { this.heroes.push(CONFIG.heroes[key]) });
        this.user = { name: this.localStorage.getPlayerData() ? this.localStorage.getPlayerData().name : '' };

        if (this.localStorage.getPlayerData()) this.socket.checkPlayerHero(this.localStorage.getPlayerData());
    }

    setHeroStyle(hero: any): any {
        return {'background': `url('../images/${hero.img_name}') 
                   -${(hero.sprite.firstMovementFrameColumn-1)*hero.oneFrameHeight}px ${(hero.sprite.downMove.row-1)*hero.oneFrameHeight}px`}}

    selectHero(hero: any): void { this.hero = hero }

    checkIfHeroSelected(heroListItem: any): boolean { return this.hero && this.hero.name == heroListItem.name }

    saveData(): void {
        this.user.id = this.settingsService.generateUserId(this.user.name);
        this.localStorage.savePlayerData(this.user);
        this.socket.saveHeroPlayerData({hero: this.hero, user: this.user});
    }

    validate(): boolean { return !!this.user.name && !!this.hero }

    ngOnDestroy(): void {}
}