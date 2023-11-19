import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { TOKEN_STORAGE_KEY } from 'src/app/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  userService = inject(UsersService);
  router = inject(Router);
  title = inject(Title);
  toast = inject(ToastrService);
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
      localStorage.setItem(TOKEN_STORAGE_KEY, res.data.token);
      this.router.navigate(['./']);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.toast.error(error.error['message'], 'Error');
      }
    }
  }

  isValidInput(name: string, field: string) {
    const errors = this.form.get(name)?.errors;
    if (errors) return errors[field];
    return false;
  }
}
