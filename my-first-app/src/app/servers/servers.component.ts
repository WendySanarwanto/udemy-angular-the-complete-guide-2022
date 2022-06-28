import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>`,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowCreatingNewServers: boolean = false;
  serverCreationStatus: string = 'No server was created.'
  serverName: string = '';
  serverCreated: boolean = false;
  servers = ['Alpha', 'Bravo'];

  constructor() { 
    setTimeout(()=>{ this.allowCreatingNewServers = true }, 3000)
  }

  ngOnInit(): void {
  }

  onCreatedServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = `Server '${this.serverName}' was created.`;
  }

  onUpdateServerName(e: Event) {
    this.serverName = (<HTMLInputElement> e.target).value;
  }
}
