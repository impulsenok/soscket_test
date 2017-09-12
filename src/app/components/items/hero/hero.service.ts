import { Injectable } from "@angular/core";
import {LocalStorageProcessingService} from "../../../services/local-storage.service";

@Injectable()
export class HeroService {

    constructor(private localStorage: LocalStorageProcessingService) {}

    private heroMovementAnimation(heroElement, heroPlayerData): void {

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

        console.log(`frame position of ${heroPlayerData.user.name}: `, framePosition );

        heroElement.style.backgroundPositionX = `-${framePosition}px`;
    }

    public moveTop(heroElement, heroPlayerData): void {
        this.heroMovementAnimation(heroElement, heroPlayerData);
        heroElement.style.backgroundPositionY = `-${(heroPlayerData.hero.sprite.topMove.row - 1) * heroPlayerData.hero.oneFrameHeight}px`;
        heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundY -= heroPlayerData.hero.stepLength;
        heroElement.style.top = `${heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundY}px`;
    }

    public moveDown(heroElement, heroPlayerData): void {
        this.heroMovementAnimation(heroElement, heroPlayerData);
        heroElement.style.backgroundPositionY = `-${(heroPlayerData.hero.sprite.downMove.row - 1) * heroPlayerData.hero.oneFrameHeight}px`;
        heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundY += heroPlayerData.hero.stepLength;
        heroElement.style.top = `${heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundY}px`;
    }

    public moveLeft(heroElement, heroPlayerData): void {
        this.heroMovementAnimation(heroElement, heroPlayerData);
        heroElement.style.backgroundPositionY = `-${(heroPlayerData.hero.sprite.leftMove.row - 1) * heroPlayerData.hero.oneFrameHeight}px`;
        heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundX -= heroPlayerData.hero.stepLength;
        heroElement.style.left = `${heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundX}px`;
    }

    public moveRight(heroElement, heroPlayerData): void {
        this.heroMovementAnimation(heroElement, heroPlayerData);
        heroElement.style.backgroundPositionY = `-${(heroPlayerData.hero.sprite.rightMove.row - 1) * heroPlayerData.hero.oneFrameHeight}px`;
        heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundX += heroPlayerData.hero.stepLength;
        heroElement.style.left = `${heroPlayerData.hero.positionOnPlayGround.positionOnPlayGroundX}px`;
    }
}