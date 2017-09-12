import { Injectable } from "@angular/core";

import { HeroService } from "../components/items/hero/hero.service";
import {LocalStorageProcessingService} from "./local-storage.service";
import {SocketService} from "./socket.service";

@Injectable()
export class KeyPressHandlerService {

    constructor(private heroService: HeroService,
                private localStorage: LocalStorageProcessingService,
                private socket: SocketService) {}

    public handleAction(keyCode: number, heroEl: any, heroPlayerData: any): void {

        let heroElement = heroEl[0];

        if (!heroElement) return;

        if (heroElement.style.top) heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundY = parseInt(heroElement.style.top);
        if (heroElement.style.left) heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundX = parseInt(heroElement.style.left);

        switch(keyCode) {

            // UP
            case 38: { this.heroService.moveTop(heroElement, heroPlayerData) }
                break;

            // DOWN
            case 40: { this.heroService.moveDown(heroElement, heroPlayerData) }
                break;

            // LEFT
            case 37: { this.heroService.moveLeft(heroElement, heroPlayerData) }
                break;

            // RIGHT
            case 39: { this.heroService.moveRight(heroElement, heroPlayerData) }
                break;

            // SPACE
            case 32: console.log('space clicked here');
                break;

            default: /*console.log("unhandled key was pressed")*/;
        }

        if (heroPlayerData.user.id == this.localStorage.getPlayerData().id) { this.socket.saveHeroPlayerData(heroPlayerData) }
    }
}