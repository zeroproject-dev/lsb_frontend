import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Permissions } from 'src/app/models/user';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
})
export class RolesComponent implements OnInit {
  form!: FormGroup;
  permissions!: Permissions;

  isLoading = true;

  title = inject(Title);
  rolesService = inject(RolesService);

  constructor(private formBuilder: FormBuilder) {
    this.title.setTitle('LSB - Roles');
  }

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', []],
      state: [true, Validators.required],
      usuarios: this.formBuilder.array([]),
      roles: this.formBuilder.array([]),
      words: this.formBuilder.array([]),
    });

    await this.listOfPermissions();
    this.permissions.roles.forEach(() =>
      this.roles.push(this.formBuilder.control(false)),
    );
    this.permissions.usuarios.forEach(() =>
      this.usuarios.push(this.formBuilder.control(false)),
    );
    this.permissions.words.forEach(() =>
      this.words.push(this.formBuilder.control(false)),
    );
  }

  get roles() {
    return this.form.get('roles') as any;
  }

  get usuarios() {
    return this.form.get('usuarios') as any;
  }

  get words() {
    return this.form.get('words') as any;
  }

  async listOfPermissions() {
    try {
      const res = await this.rolesService.listOfPermissions();
      this.isLoading = false;
      this.permissions = res.data;
    } catch (error) {
      console.error(error);
    }
  }

  async onSubmit() {
    // console.log(this.rolesService.createRole(this.form.value));
    console.log(JSON.stringify(this.form.value));
  }
}
