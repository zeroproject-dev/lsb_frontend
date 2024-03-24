import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { EnvironmentService } from '../services/environment';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
