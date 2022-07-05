import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server?: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
    
    // let serverId = +this.activatedRoute.snapshot.params['id'];
    // this.server = this.serversService.getServer(serverId);

    // this.activatedRoute.params.subscribe((params: Params) => {
    //   serverId = +params['id'];
    //   this.server = this.serversService.getServer(serverId);
    // });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute, queryParamsHandling: 'preserve' });
    // this.router.navigate(['/servers', this.server?.id, 'edit']);
  }
}
