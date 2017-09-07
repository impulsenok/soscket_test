import { Injectable } from "@angular/core";
import { LocalStorageService } from "angular-2-local-storage";

@Injectable()
export class LocalStorageProcessingService {

    constructor(private localStorage: LocalStorageService) {}

    saveNickName(name: string): void { this.localStorage.set('name', name) }

    getNickName(): string { return this.localStorage.get('name') }

    getHeroData(): any { return this.localStorage.get('selectedHero') ? JSON.parse(this.localStorage.get('selectedHero')) : null }

    saveHero(hero): void { this.localStorage.set('selectedHero', JSON.stringify(hero))}

    getHeroFramePosition(): number { return this.localStorage.get('heroFramePosition') }

    saveHeroFramePosition(frame: number): void { this.localStorage.set('heroFramePosition', frame) }
}