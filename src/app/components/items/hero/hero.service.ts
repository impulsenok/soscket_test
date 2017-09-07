import { Injectable } from "@angular/core";
import {LocalStorageProcessingService} from "../../../services/local-storage.service";

@Injectable()
export class HeroService {

    constructor(private localStorage: LocalStorageProcessingService) {}

    private heroMovementAnimation(heroElement, heroData): void {

        let framePosition = 1;

        if (this.localStorage.getHeroFramePosition()) {
            framePosition = this.localStorage.getHeroFramePosition();
        } else {
            framePosition = heroData.oneFrameWidth * (heroData.sprite.firstMovementFrameColumn - 1);
            this.localStorage.saveHeroFramePosition(framePosition);
        }

        if (framePosition < (heroData.oneFrameWidth * ((heroData.sprite.firstMovementFrameColumn - 1) + (heroData.movementFrames - 1)))) {
            framePosition += heroData.oneFrameWidth;
            this.localStorage.saveHeroFramePosition(framePosition);
        } else {
            framePosition = (heroData.sprite.firstMovementFrameColumn - 1) * heroData.oneFrameWidth;
            this.localStorage.saveHeroFramePosition(framePosition);
        }

        heroElement.style['background-position-x'] = '-' + framePosition + 'px';
    }

    public moveTop(heroElement, heroData): void {
        this.heroMovementAnimation(heroElement, heroData);
        heroElement.style.backgroundPositionY = `-${(heroData.sprite.topMove.row - 1) * heroData.oneFrameHeight}px`;
        heroData.heroPosition.positionOnPlayGroundY -= heroData.stepLength;
        heroElement.style.top = `${heroData.heroPosition.positionOnPlayGroundY}px`;
    }

    public moveDown(heroElement, heroData): void {
        this.heroMovementAnimation(heroElement, heroData);
        heroElement.style.backgroundPositionY = `-${(heroData.sprite.downMove.row - 1) * heroData.oneFrameHeight}px`;
        heroData.heroPosition.positionOnPlayGroundY += heroData.stepLength;
        heroElement.style.top = `${heroData.heroPosition.positionOnPlayGroundY}px`;
    }

    public moveLeft(heroElement, heroData): void {
        this.heroMovementAnimation(heroElement, heroData);
        heroElement.style.backgroundPositionY = `-${(heroData.sprite.leftMove.row - 1) * heroData.oneFrameHeight}px`;
        heroData.heroPosition.positionOnPlayGroundX -= heroData.stepLength;
        heroElement.style.left = `${heroData.heroPosition.positionOnPlayGroundX}px`;
    }

    public moveRight(heroElement, heroData): void {
        this.heroMovementAnimation(heroElement, heroData);
        heroElement.style.backgroundPositionY = `-${(heroData.sprite.rightMove.row - 1) * heroData.oneFrameHeight}px`;
        heroData.heroPosition.positionOnPlayGroundX += heroData.stepLength;
        heroElement.style.left = `${heroData.heroPosition.positionOnPlayGroundX}px`;
    }
}