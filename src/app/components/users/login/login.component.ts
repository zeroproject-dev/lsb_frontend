import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  userService = inject(UsersService);
  router = inject(Router);
  title = inject(Title);
  submited = false;

  constructor(private formBuilder: FormBuilder) {
    this.title.setTitle('Traductor LSB - Inicio de sesión');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    try {
      this.submited = true;
      if (!this.form.valid) return;

      const res = await this.userService.login(this.form.value);
      localStorage.setItem('token', res.data.token);
      this.router.navigate(['./']);
    } catch (error) {
      if (error instanceof HttpErrorResponse)
        console.log('Error al momento de iniciar sesión: ', error.error);
    }
  }

  isValidInput(name: string, field: string) {
    const errors = this.form.get(name)?.errors;
    if (errors) return errors[field];
    return false;
  }
}
