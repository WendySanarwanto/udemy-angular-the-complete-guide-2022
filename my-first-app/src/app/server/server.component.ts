import { Component } from '@angular/core';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
        .online {
            font-weight: bold;
        }
    `]
})
export class ServerComponent{
    serverId: number = 10;
    private serverStatus: string = 'offline'

    constructor() {
        this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    }

    getServerStatus() {
        return this.serverStatus;
    }

    getColor() {
        return this.serverStatus === 'online' ? 'green' : 'red';
    }
}