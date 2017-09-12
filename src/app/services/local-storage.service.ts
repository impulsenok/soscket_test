import { Injectable } from "@angular/core";
import { LocalStorageService } from "angular-2-local-storage";
import {SocketService} from "./socket.service";

@Injectable()
export class LocalStorageProcessingService {

    constructor(private localStorage: LocalStorageService,
                private socket: SocketService) {}

    savePlayerData(data): void {
        this.localStorage.set('playerData', JSON.stringify(data))
    }

    getPlayerData(): any { return this.localStorage.get('playerData') ? JSON.parse(this.localStorage.get('playerData')) : null }
}