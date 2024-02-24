import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthCMSService } from '../../services/authCMS/auth-cms.service';

export const cmsPermissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
  const cmsAuthService: AuthCMSService = inject(AuthCMSService);
  const requiredPermission = next.data ? next.data['requiredPermission'] : undefined;
  const userId = cmsAuthService.getActualEmployeeId();
  const hasPermission = await cmsAuthService.checkPermission(userId, requiredPermission).toPromise();
  return hasPermission || false;
};
