import { Injectable } from "@angular/core";
import {LocalStorageProcessingService} from "../../../services/local-storage.service";

@Injectable()
export class HeroService {

    constructor() {}

    private heroMovementAnimation(heroElement: any, heroPlayerData: any): void {

        let framePosition = 1;

        if (heroPlayerData.hero.framePosition) {

            framePosition = heroPlayerData.hero.framePosition;
        } else {
            framePosition = heroPlayerData.hero.oneFrameWidth * (heroPlayerData.hero.sprite.firstMovementFrameColumn - 1);
        }

        if (framePosition < (heroPlayerData.hero.oneFrameWidth * ((heroPlayerData.hero.sprite.firstMovementFrameColumn - 1) + (heroPlayerData.hero.movementFrames - 1)))) {
            framePosition += heroPlayerData.hero.oneFrameWidth;
        } else {
            framePosition = (heroPlayerData.hero.sprite.firstMovementFrameColumn - 1) * heroPlayerData.hero.oneFrameWidth;
        }

        heroPlayerData.hero.framePosition = framePosition;

        heroElement.style.backgroundPositionX = `-${framePosition}px`;
    }

    public moveTop(heroElement: any, heroPlayerData: any): void {

        this.heroMovementAnimation(heroElement, heroPlayerData);

        if (heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundY > 20) {
            heroElement.style.backgroundPositionY = `-${(heroPlayerData.hero.sprite.topMove.row - 1) * heroPlayerData.hero.oneFrameHeight}px`;
            heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundY -= heroPlayerData.hero.stepLength;
            heroElement.style.top = `${heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundY}px`;
            heroPlayerData.hero.positionOnPlayGround.movementDirection = 'TOP';
        }
    }

    public moveDown(heroElement: any, heroPlayerData: any): void {

        this.heroMovementAnimation(heroElement, heroPlayerData);

        if (heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundY < 568) {
            heroElement.style.backgroundPositionY = `-${(heroPlayerData.hero.sprite.downMove.row - 1) * heroPlayerData.hero.oneFrameHeight}px`;
            heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundY += heroPlayerData.hero.stepLength;
            heroElement.style.top = `${heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundY}px`;
            heroPlayerData.hero.positionOnPlayGround.movementDirection = 'DOWN';
        }
    }

    public moveLeft(heroElement: any, heroPlayerData: any): void {

        this.heroMovementAnimation(heroElement, heroPlayerData);

        if (heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundX > 6) {
            heroElement.style.backgroundPositionY = `-${(heroPlayerData.hero.sprite.leftMove.row - 1) * heroPlayerData.hero.oneFrameHeight}px`;
            heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundX -= heroPlayerData.hero.stepLength;
            heroElement.style.left = `${heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundX}px`;
            heroPlayerData.hero.positionOnPlayGround.movementDirection = 'LEFT';
        }
    }

    public moveRight(heroElement: any, heroPlayerData: any): void {

        this.heroMovementAnimation(heroElement, heroPlayerData);

        if (heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundX < 1170) {
            heroElement.style.backgroundPositionY = `-${(heroPlayerData.hero.sprite.rightMove.row - 1) * heroPlayerData.hero.oneFrameHeight}px`;
            heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundX += heroPlayerData.hero.stepLength;
            heroElement.style.left = `${heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundX}px`;
            heroPlayerData.hero.positionOnPlayGround.movementDirection = 'RIGHT';
        }
    }

    public setHeroStyles(heroElement: any, heroPlayerData: any): void {
        this.heroMovementAnimation(heroElement, heroPlayerData);
        heroElement.style.backgroundPositionY = `-${(heroPlayerData.hero.sprite.rightMove.row - 1) * heroPlayerData.hero.oneFrameHeight}px`;
        heroElement.style.top = `${heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundY}px`;
        heroElement.style.left = `${heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundX}px`;
    }
}