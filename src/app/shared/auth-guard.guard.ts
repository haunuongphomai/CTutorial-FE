import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  if (!localStorage.getItem('currentUser')) {
    window.location.href = '/sign-in';
    return false;
  }
  return true;
};
