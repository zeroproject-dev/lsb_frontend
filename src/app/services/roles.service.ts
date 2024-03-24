import { Injectable } from '@angular/core';
import { Permissions, Response, Role } from '../models/user';
import { firstValueFrom } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService extends BaseService<Role> {
  constructor() {
    super();
    this.resource = 'roles';
  }

  listOfPermissions(): Promise<Response<Permissions>> {
    const res = this.httpClient.get<Response<Permissions>>(
      this.apiUrl + '/permissions/'
    );
    return firstValueFrom(res);
  }
}
