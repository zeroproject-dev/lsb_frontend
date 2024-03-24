import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User, Response } from '../models/user';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService<User> {
  constructor() {
    super();
    this.resource = 'users';
  }
}
