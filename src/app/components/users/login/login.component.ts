import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form: FormGroup;

  userService = inject(UsersService)
  router = inject(Router)
  title = inject(Title)

  constructor() {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })

    this.title.setTitle("Traductor LSB - Inicio de sesión");
  }

  async onSubmit() {
    console.log(this.form.value)
    return;
    const res = await this.userService.login(this.form.value);
    if (!res.error) {
      localStorage.setItem('token', res.user.token)
      this.router.navigate(['/'])
    }
    console.log(res);
  }
}
