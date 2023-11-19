import { inject } from '@angular/core';
import { TOKEN_STORAGE_KEY } from '../utils/constants';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);

  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
