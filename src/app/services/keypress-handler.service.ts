import { Injectable } from "@angular/core";

import { HeroService } from "../components/items/hero/hero.service";

@Injectable()
export class KeyPressHandlerService {

    constructor(private heroService: HeroService) {}

    public handleAction(keyCode: KeyboardEvent, heroEl: any, hero: any): void {

        let heroElement = heroEl[0];

        console.log('>>>>>>  ', keyCode, hero, heroElement);

        if (!heroElement) return;

        hero.heroPosition = {
            positionOnPlayGroundY: heroElement.style.top ? parseInt(heroElement.style.top) : 0,
            positionOnPlayGroundX: heroElement.style.left ? parseInt(heroElement.style.left) : 0
        };

        switch(keyCode) {

            // UP
            case 38: { this.heroService.moveTop(heroElement, hero) }
                break;

            // DOWN
            case 40: { this.heroService.moveDown(heroElement, hero) }
                break;

            // LEFT
            case 37: { this.heroService.moveLeft(heroElement, hero) }
                break;

            // RIGHT
            case 39: { this.heroService.moveRight(heroElement, hero) }
                break;

            // SPACE
            case 32: console.log('space clicked here');
                break;

            default: console.log("unhandled key was pressed");
        }

        console.log('an event was received here: ');
    }
}