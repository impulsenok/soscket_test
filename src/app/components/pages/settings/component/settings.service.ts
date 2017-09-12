import { Injectable} from "@angular/core";

@Injectable()

export class SettingsService {

    constructor() {}

    public generateUserId(nickname: String): string {

        const rand: number = Math.floor(Math.random() * (9999 - 1 + 1)) + 1;

        return `${nickname}-${rand}`;
    }
}