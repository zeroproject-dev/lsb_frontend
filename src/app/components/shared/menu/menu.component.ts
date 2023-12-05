import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { TOKEN_STORAGE_KEY } from 'src/app/utils/constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  isMenuOpen: boolean = false;

  constructor(
    private router: Router,
    private usersService: UsersService,
  ) {}

  get isLoged() {
    return this.usersService.getIsLoged();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.usersService.setIsLoged(false);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.router.navigate(['./']);
  }
}
