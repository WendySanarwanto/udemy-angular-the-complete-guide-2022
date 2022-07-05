import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ServersService } from '../servers.service';
import { Server } from '../server';

@Injectable({
  providedIn: 'root'
})
export class ServerResolver implements Resolve<Server|undefined> {

  constructor(private serverService: ServersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server|undefined> | Promise<Server|undefined> | Server|undefined{
    return of(this.serverService.getServer(+route.params['id']));
  }
}
