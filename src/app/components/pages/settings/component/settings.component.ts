import { Component, OnInit } from "@angular/core";

import { CONFIG } from "../../../../lib/app.config";
import {LocalStorageProcessingService} from "../../../../services/local-storage.service";
import {SettingsService} from "./settings.service";
import {SocketService} from "../../../../services/socket.service";

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
    }

    setHeroStyle(hero: any): any {
        return {'background': `url('../images/${hero.img_name}') 
                   -${(hero.sprite.firstMovementFrameColumn-1)*hero.oneFrameHeight}px ${(hero.sprite.downMove.row-1)*hero.oneFrameHeight}px`}}

    selectHero(hero: any): void { this.hero = hero }

    checkIfHeroSelected(hero): boolean {

        // const heroData = this.localStorage.getPlayerData();
        //
        // if (heroData && heroData.hero) return hero.name == heroData.hero.name;
        //
        return false;
    }

    saveData(): void {
        this.user.id = this.settingsService.generateUserId(this.user.name);
        this.localStorage.savePlayerData(this.user);
        this.socket.saveHeroPlayerData({hero: this.hero, user: this.user});
    }

    validate(): boolean { return true/*!!this.hero.name && !!this.hero*/ }

    ngOnDestroy(): void {}
}