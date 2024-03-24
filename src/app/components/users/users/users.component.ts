import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { User } from 'src/app/models/user';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  users!: User[];
  selectedUser!: User;

  title = inject(Title);
  toast = inject(ToastrService);
  userService = inject(UsersService);
  rolesService = inject(RolesService);

  isLoading = true;

  private searchSubject = new Subject<string>();

  constructor() {
    this.title.setTitle('LSB - Usuarios');
  }

  async ngOnInit() {
    await this.updateListOfUsers();
    this.selectedUser = this.users[0];
    this.isLoading = false;

    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query: string) => this.userService.list(query))
      )
      .subscribe((users) => {
        this.users = users.data ?? [];
      });
  }

  onSearchInputChange(event: any) {
    const searchTerm = event.target.value;
    this.searchSubject.next(searchTerm);
  }

  async updateListOfUsers() {
    try {
      const res = await this.userService.list('');
      if (res.data === null) throw new Error(res.message);

      this.users = res.data;
      this.isLoading = false;
    } catch (error: any) {
      this.toast.error(error.message, 'Error');
    }
  }

  showCreateUserModal = false;

  openCreateUserModal() {
    this.showCreateUserModal = true;
  }

  closeCreateUserModal() {
    this.showCreateUserModal = false;
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  async onSubmit(formValue: any) {
    try {
      formValue['id'] = this.selectedUser.id;
      const response = await this.userService.update(
        this.selectedUser.id,
        formValue
      );
      this.updateListOfUsers();
      this.toast.success('', response.message);
    } catch (error) {
      console.error(error);
    }
  }

  async onSubmitCreate(formValue: any) {
    try {
      const response = await this.userService.create(formValue);
      this.updateListOfUsers();
      this.toast.success('', response.message);
      this.closeCreateUserModal();
    } catch (error: any) {
      this.toast.error(error.message, 'Error');
    }
  }
}
