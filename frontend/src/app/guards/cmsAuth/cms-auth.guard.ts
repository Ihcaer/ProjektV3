import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthCMSService } from '../../services/authCMS/auth-cms.service';

export const cmsAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const cmsAuthService: AuthCMSService = inject(AuthCMSService);
  const router: Router = inject(Router);

  return cmsAuthService.isEmployeeLoggedIn().pipe(
    map((status) => {
      if (status) {
        return true;
      } else {
        router.navigate(['/cms/login']);
        return false;
      }
    })
  );
};
