import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Role, User } from 'src/app/models/user';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form-create-user',
  templateUrl: './form-create-user.component.html',
})
export class FormCreateUserComponent implements OnInit, OnChanges {
  @Input() user: User | null = null;
  @Output() onSubmitEmitter: EventEmitter<any> = new EventEmitter();

  form!: FormGroup;
  userService = inject(UsersService);
  submited: boolean = false;

  roles!: Role[];

  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
    private toast: ToastrService
  ) {}

  async updateListOfRoles() {
    try {
      const res = await this.rolesService.list('');
      if (res.data === null) throw new Error(res.message);

      this.roles = res.data;
    } catch (error: any) {
      this.toast.error(error.message, 'Error');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { id, password, ...rest } = changes['user']['currentValue'] as User;
    if (!this.form) return;

    this.form.patchValue(rest);
  }

  async ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: [this.user?.first_name ?? '', [Validators.required]],
      second_name: [this.user?.second_name ?? '', []],
      first_surname: [this.user?.first_surname ?? '', [Validators.required]],
      second_surname: [this.user?.second_surname ?? '', [Validators.required]],
      email: [this.user?.email ?? '', [Validators.email, Validators.required]],
      role: [this.user?.role ?? 1, [Validators.required]],
      state: [this.user?.state == 'active' ?? true, [Validators.required]],
    });

    await this.updateListOfRoles();
  }

  async onSubmit() {
    try {
      if (this.form.valid) {
        const formData = this.form.value;
        if (this.user !== null) formData['id'] = this.user.id;
        this.onSubmitEmitter.emit(formData);
        this.form.reset();
      }
      this.submited = true;
    } catch (error) {
      console.error(error);
    }
  }

  isValidInput(name: string, field: string) {
    const errors = this.form.get(name)?.errors;
    if (errors) return errors[field];
    return false;
  }
}
