import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users!: User[];
  selectedUser!: User;

  title = inject(Title);
  userService = inject(UsersService);

  isLoading = true;

  constructor() {
    this.title.setTitle('LSB - Usuarios');
  }

  async ngOnInit() {
    await this.updateListOfUsers();
  }

  async updateListOfUsers() {
    try {
      const res = await this.userService.listUsers();
      this.users = res.data;
      this.selectedUser = this.users[0];
      this.isLoading = false;
    } catch (error) {
      console.error(error);
    }
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  async onSubmit(formValue: any) {
    try {
      //const response = await this.userService.createUser(formValue);
      this.updateListOfUsers();
      console.log(formValue);
    } catch (error) {
      console.error(error);
    }
  }
}
