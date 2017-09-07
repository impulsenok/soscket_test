import { Injectable } from "@angular/core";

import { CONFIG } from "../lib/app.config";

@Injectable()
export class KeyPressHandlerService {

    constructor() {}

    public handleAction(event: KeyboardEvent, element: any): void {

        console.log(element.nativeElement.childNodes[0].style.top, parseInt(element.nativeElement.childNodes[0].style.top), typeof element.nativeElement.childNodes[0].style.top);

        let object = {
            positionOnPlayGroundY: element.nativeElement.childNodes[0].style.top ? parseInt(element.nativeElement.childNodes[0].style.top) : 0,
            positionOnPlayGroundX: element.nativeElement.childNodes[0].style.left ? parseInt(element.nativeElement.childNodes[0].style.left) : 0
        };

        switch(event.keyCode) {

            case 38: {
                element.nativeElement.childNodes[0].style.backgroundPositionY = `-${(CONFIG.heroes.death_king.sprite.topMove.row - 1) * CONFIG.heroes.death_king.oneFrameHeight}px`;
                object.positionOnPlayGroundY -= CONFIG.heroes.death_king.stepLength;
                element.nativeElement.childNodes[0].style.top = `${object.positionOnPlayGroundY}px`;
            }
                break;

            case 40: {
                element.nativeElement.childNodes[0].style.backgroundPositionY = `-${(CONFIG.heroes.death_king.sprite.downMove.row - 1) * CONFIG.heroes.death_king.oneFrameHeight}px`;
                object.positionOnPlayGroundY += CONFIG.heroes.death_king.stepLength;
                element.nativeElement.childNodes[0].style.top = `${object.positionOnPlayGroundY}px`;
                console.log('down move: ', element.nativeElement.childNodes[0].style.top, object.positionOnPlayGroundY)
            }
                break;

            case 37: {
                element.nativeElement.childNodes[0].style.backgroundPositionY = `-${(CONFIG.heroes.death_king.sprite.leftMove.row - 1) * CONFIG.heroes.death_king.oneFrameHeight}px`;
                object.positionOnPlayGroundX -= CONFIG.heroes.death_king.stepLength;
                element.nativeElement.childNodes[0].style.left = `${object.positionOnPlayGroundX}px`;
            }
                break;

            case 39: {
                element.nativeElement.childNodes[0].style.backgroundPositionY = `-${(CONFIG.heroes.death_king.sprite.rightMove.row - 1) * CONFIG.heroes.death_king.oneFrameHeight}px`;
                object.positionOnPlayGroundX += CONFIG.heroes.death_king.stepLength;
                element.nativeElement.childNodes[0].style.left = `${object.positionOnPlayGroundX}px`;
            }
                break;

            case 32: console.log('space clicked here');
                break;
        }

        console.log('an event was received here: ');
    }
}