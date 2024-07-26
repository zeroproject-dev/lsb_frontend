import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/users/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TextfieldComponent } from './components/shared/textfield/textfield.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { UserCardComponent } from './components/users/user-card/user-card.component';
import { FormCreateUserComponent } from './components/users/form-create-user/form-create-user.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalComponent } from './components/shared/modal/modal.component';
import { FormRoleComponent } from './components/roles/form-role/form-role.component';
import { TrainingComponent } from './components/training/training.component';
import { FormWordComponent } from './components/dictionary/form-word/form-word.component';
import { ConfirmComponent } from './components/users/confirm/confirm.component';
import { AuthInterceptor } from './interceptors/auth';
import { FormatDatePipe } from './pipes/format-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TextfieldComponent,
    MenuComponent,
    UsersComponent,
    RolesComponent,
    UserCardComponent,
    FormCreateUserComponent,
    DictionaryComponent,
    ModalComponent,
    FormRoleComponent,
    TrainingComponent,
    FormWordComponent,
    ConfirmComponent,
    FormatDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
