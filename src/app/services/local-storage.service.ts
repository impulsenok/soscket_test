import { Injectable } from "@angular/core";
import { LocalStorageService } from "angular-2-local-storage";
import {SocketService} from "./socket.service";

@Injectable()
export class LocalStorageProcessingService {

    constructor(private localStorage: LocalStorageService) {}

    savePlayerData(data: any): void {
        this.localStorage.set('playerData', data)
    }

    getPlayerData(): any { return this.localStorage.get('playerData') ? this.localStorage.get('playerData') : null }
}