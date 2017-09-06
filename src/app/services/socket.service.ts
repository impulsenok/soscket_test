import { Injectable, } from "@angular/core";
import { Socket } from "ng-socket-io";

import {Observable} from "rxjs";

@Injectable()
export class SocketService {

    constructor(private socket: Socket) {}

    public sendMessage(text: string): void { this.socket.emit('save-message', text) }

    public getMessage(): Observable<any> { return this.socket.fromEvent<any>("new-message").map((data: any) => data) }
}