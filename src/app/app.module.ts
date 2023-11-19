import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
