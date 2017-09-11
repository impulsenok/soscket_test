import { Injectable, } from "@angular/core";
import { Socket } from "ng-socket-io";

import {Observable} from "rxjs";

@Injectable()
export class SocketService {

    constructor(private socket: Socket) {}

    public sendMessage(text: string): void { this.socket.emit('save-message', text) }

    public getMessage(): Observable<any> { return this.socket.fromEvent<any>("new-message").map((data: any) => data) }

    public createHero(data: any): void { this.socket.emit('create-hero', data) }

    public addNewHero(): Observable<any> { return this.socket.fromEvent<any>("receive-new-hero").map((hero: any) => hero)}

    public heroAction(data): void { this.socket.emit('hero-action', data) }

    public listenToHeroAct(): Observable<any> { return this.socket.fromEvent<any>("hero-acted").map((heroData: any)=> heroData)}
}