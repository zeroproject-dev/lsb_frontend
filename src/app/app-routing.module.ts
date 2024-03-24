import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/users/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { UsersComponent } from './components/users/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { DictionaryComponent } from './components/dictionary/dictionary.component';
import { TrainingComponent } from './components/training/training.component';
import { ConfirmComponent } from './components/users/confirm/confirm.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'confirm/:id',
    component: ConfirmComponent,
  },
  { path: 'users', component: UsersComponent, canActivate: [authGuard] },
  { path: 'roles', component: RolesComponent, canActivate: [authGuard] },
  { path: 'train', component: TrainingComponent, canActivate: [authGuard] },
  {
    path: 'dictionary',
    component: DictionaryComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
