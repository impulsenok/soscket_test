import { Component, OnInit } from "@angular/core";

import { CONFIG } from "../../../../lib/app.config";
import {LocalStorageProcessingService} from "../../../../services/local-storage.service";

@Component({
    selector: "settings-comp",
    template: require("./settings.component.pug"),
    styleUrls: [ "settings.component.scss" ]
})

export class SettingsComponent implements OnInit {

    public nickname: string = null;
    public heroes: Array<any> = [];

    constructor(private localStorage: LocalStorageProcessingService) {}

    ngOnInit(): void {
        Object.keys(CONFIG.heroes).forEach(key => { this.heroes.push(CONFIG.heroes[key]) })
        this.nickname = this.localStorage.getNickName();
    }

    setHeroStyle(hero): any {return {'background': `url('../images/${hero.img_name}') -${(hero.sprite.firstMovementFrameColumn-1)*hero.oneFrameHeight}px ${(hero.sprite.downMove.row-1)*hero.oneFrameHeight}px`}}

    selectHero(hero): void { this.localStorage.saveHero(hero) }

    checkIfHeroSelected(hero): boolean {

        const heroData = this.localStorage.getHeroData();

        if (heroData) return hero.name == heroData.name;

        return false;
    }

    saveData(): void { this.localStorage.saveNickName(this.nickname) }

    validate(): boolean { return !!this.nickname && !!this.localStorage.getHeroData() }

    ngOnDestroy(): void {}
}