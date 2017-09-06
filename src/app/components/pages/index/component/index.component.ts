import { Component, OnInit }     from "@angular/core";

import { SocketService } from "../../../../services/socket.service";

@Component({
    selector: "index-comp",
    template: require("./index.component.pug"),
    styleUrls: [ "index.component.scss" ]
})

export class IndexComponent implements OnInit {

    private getMessageSUBSCRIBER: any = null;
    public chatMessage: string = null;
    public allMessages: Array<string> = [];

    constructor(private socketService: SocketService) {}

    ngOnInit(): void {
        this.getMessageSUBSCRIBER = this.socketService.getMessage().subscribe(result => { this.allMessages.push(result.message) })
    }

    public sendSocketMessage(): void { this.socketService.sendMessage(this.chatMessage) }

    ngOnDestroy(): void {
        if (this.getMessageSUBSCRIBER) this.getMessageSUBSCRIBER.unsubscribe();
    }
}