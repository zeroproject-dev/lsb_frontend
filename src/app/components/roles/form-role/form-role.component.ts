import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role, Permissions } from 'src/app/models/user';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-form-role',
  templateUrl: './form-role.component.html',
})
export class FormRoleComponent implements OnInit, OnChanges {
  @Input() role: Role | null = null;
  @Output() onSubmitEmitter: EventEmitter<any> = new EventEmitter();

  form!: FormGroup;
  submited: boolean = false;
  permissions!: Permissions;

  isLoading = true;

  constructor(
    private formBuilder: FormBuilder,
    private rolesService: RolesService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const role = changes['role']['currentValue'] as Role;
    if (!this.form) return;

    this.selectRole(role);
  }

  async ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', []],
      state: [true, Validators.required],
      usuarios: this.formBuilder.array([]),
      roles: this.formBuilder.array([]),
      words: this.formBuilder.array([]),
    });

    await this.listOfPermissions();

    if (this.permissions) {
      this.permissions.roles.forEach(() => {
        this.roles.push(this.formBuilder.control(false));
      });
      this.permissions.usuarios.forEach(() =>
        this.usuarios.push(this.formBuilder.control(false)),
      );
      this.permissions.words.forEach(() =>
        this.words.push(this.formBuilder.control(false)),
      );
    }

    if (this.role !== null) this.selectRole(this.role);
  }

  get roles() {
    return this.form.get('roles') as FormArray;
  }

  get usuarios() {
    return this.form.get('usuarios') as FormArray;
  }

  get words() {
    return this.form.get('words') as FormArray;
  }

  async listOfPermissions() {
    try {
      const res = await this.rolesService.listOfPermissions();
      if (res.data === null) {
        return;
      }
      this.permissions = res.data;
      this.isLoading = false;
    } catch (error) {
      console.error(error);
    }
  }

  async onSubmit() {
    try {
      if (this.form.valid) {
        const formData = this.form.value;
        this.onSubmitEmitter.emit(formData);
      }
      this.submited = true;
    } catch (error) {
      console.error(error);
    }
  }

  selectRole(obj: Role) {
    this.roles.controls.forEach((control, idx) => {
      const permission = obj.permissions['roles']?.[idx] ?? null;
      control.setValue(permission !== null);
    });

    this.usuarios.controls.forEach((control, idx) => {
      const permission = obj.permissions['usuarios']?.[idx] ?? null;
      control.setValue(permission !== null);
    });

    this.words.controls.forEach((control, idx) => {
      const permission = obj.permissions['words']?.[idx] ?? null;
      control.setValue(permission !== null);
    });

    this.form.get('name')?.setValue(obj.name ?? '');
    this.form.get('state')?.setValue(obj.state == 'active' ?? true);
    this.form.get('description')?.setValue(obj.description ?? '');
  }

  isValidInput(name: string, field: string) {
    const errors = this.form.get(name)?.errors;
    if (errors) return errors[field];
    return false;
  }
}
