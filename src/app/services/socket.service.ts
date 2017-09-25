import { Injectable, } from "@angular/core";
import { Socket } from "ng-socket-io";

import {Observable} from "rxjs";

@Injectable()
export class SocketService {

    constructor(private socket: Socket) {}

    public sendMessage(name: string, text: string): void { this.socket.emit('save-message', {user: name, message: text}) }

    public getMessage(): Observable<any> { return this.socket.fromEvent<any>("new-message").map((data: any) => data) }

    public createHero(data: any): void { this.socket.emit('create-hero', data) }

    public getAllExistingHeroes(data: any): void { this.socket.emit('get-all-heroes', data) }

    public newHeroWasAdded(): Observable<any> { return this.socket.fromEvent<any>("receive-new-hero").map((heroPlayerData: any) => heroPlayerData.heroes)}

    public heroAction(data: any): void { this.socket.emit('hero-action', data) }

    public heroBeatAction(data: any): void { this.socket.emit('hero-beat', data) }

    public heroWasKilled(): Observable<any> { return this.socket.fromEvent<any>("hero-was-killed").map((heroPlayerData: any) => heroPlayerData) }

    public listenToHeroAct(): Observable<any> { return this.socket.fromEvent<any>("hero-acted").map((heroData: any)=> heroData)}

    public scoreUpdate(): Observable<any> { return this.socket.fromEvent<any>("scores-updated").map((scores: any)=> scores)}

    public removeHeroElement(): Observable<any> { return this.socket.fromEvent<any>("remove-hero-element").map((heroId: string)=> heroId)}

    public saveHeroPlayerData(data: any): void { this.socket.emit('update-hero-data', data) }

    public checkPlayerHero(playerData: any): void { this.socket.emit('check-if-player-hero-exists', playerData) }
}