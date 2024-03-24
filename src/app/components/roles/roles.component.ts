import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Role } from 'src/app/models/user';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
})
export class RolesComponent implements OnInit {
  _listOfRoles!: Role[];
  selectedRole: Role | null = null;
  showModal: boolean = false;

  isLoading = true;

  title = inject(Title);
  toast = inject(ToastrService);
  rolesService = inject(RolesService);

  private searchSubject = new Subject<string>();

  constructor() {
    this.title.setTitle('LSB - Roles');
  }

  async ngOnInit(): Promise<void> {
    await this.listOfRoles();

    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query: string) => this.rolesService.list(query))
      )
      .subscribe((obj) => {
        this._listOfRoles = obj.data ?? [];
      });
  }

  onSearchInputChange(event: any) {
    const searchTerm = event.target.value;
    this.searchSubject.next(searchTerm);
  }

  selectRole(role: Role) {
    this.selectedRole = role;
  }

  async listOfRoles() {
    try {
      const res = await this.rolesService.list('');
      if (res.data === null || !res.success) {
        this.toast.error(res.message, 'Error');
        return;
      }
      this._listOfRoles = res.data;
      this.selectRole(this._listOfRoles[0]);
      this.isLoading = false;
    } catch (error) {
      console.log(error);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async onSubmit(formValue: any) {
    const res = await this.rolesService.update(
      this.selectedRole?.id!,
      formValue
    );

    this.toast.success(res.message, 'Modificación correcta');
  }

  async onSubmitCreate(formValue: any) {
    console.log(await this.rolesService.create(formValue));
  }
}
