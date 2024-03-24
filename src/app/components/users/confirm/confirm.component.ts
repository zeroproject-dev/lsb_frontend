import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent implements OnInit {
  form!: FormGroup;
  user!: User;

  submited: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      first_name: [this.user?.first_name ?? '', [Validators.required]],
      second_name: [this.user?.second_name ?? '', []],
      first_surname: [this.user?.first_surname ?? '', [Validators.required]],
      second_surname: [this.user?.second_surname ?? '', [Validators.required]],
      email: [this.user?.email ?? '', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });

    this.route.params.subscribe(async (params) => {
      if (!params['id']) {
        console.log('ID no presente. Redirigiendo a /');
        this.router.navigate(['./']);
        return;
      }
      const id = params['id'];
      const res = await this.authService.getConfirmationUser(id);

      if (!res.data) {
        console.log('No se encontró usuario. Redirigiendo a /');
        this.router.navigate(['./']);
        return;
      }

      this.setUser(res.data);
    });
  }

  setUser(user: User) {
    this.user = user;
    this.form.get('first_name')?.setValue(user.first_name);
    this.form.get('second_name')?.setValue(user.second_name);
    this.form.get('first_surname')?.setValue(user.first_surname);
    this.form.get('second_surname')?.setValue(user.second_surname);
    this.form.get('email')?.setValue(user.email);
  }

  async onSubmit() {
    try {
      if (this.form.valid) {
        const formData = this.form.value;
        const password = formData['password'];
        this.authService.sendConfirmation(this.user.id, { password });
        this.router.navigate(['./login']);
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
