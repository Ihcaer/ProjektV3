import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthCMSService } from '../../services/authCMS/auth-cms.service';

export const cmsPermissionGuard: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
  const cmsAuthService: AuthCMSService = inject(AuthCMSService);

  const requiredPermission = route.data['requiredPermission'] as number;
  const permissionObject = await firstValueFrom(cmsAuthService.getPermission());
  const permissionNumber = permissionObject.permissionNumber;

  /*if (permissionNumber === undefined) {
    return false;
  }*/

  const uprawnienia1 = [1, 3, 5, 7, 16, 18, 20, 31, 35, 46, 61, 65, 66, 76, 91, 112];
  const uprawnienia2 = [2, 3, 6, 7, 17, 18, 21, 32, 33, 36, 47, 62, 63, 66, 77, 92, 112];
  const uprawnienia3 = [5, 6, 7, 19, 20, 21, 34, 35, 36, 49, 64, 65, 66, 79, 94, 112];
  const uprawnienia4 = [16, 17, 18, 19, 20, 21, 45, 46, 47, 49, 75, 76, 77, 79, 105, 112];
  const uprawnienia5 = [31, 32, 33, 34, 35, 36, 45, 46, 47, 49, 90, 91, 92, 94, 105, 112];
  const uprawnienia6 = [61, 62, 63, 64, 65, 66, 75, 76, 77, 79, 90, 91, 92, 94, 105, 112];

  const hasPermission1 = uprawnienia1.includes(permissionNumber);
  const hasPermission2 = uprawnienia2.includes(permissionNumber);
  const hasPermission3 = uprawnienia3.includes(permissionNumber);
  const hasPermission4 = uprawnienia4.includes(permissionNumber);
  const hasPermission5 = uprawnienia5.includes(permissionNumber);
  const hasPermission6 = uprawnienia6.includes(permissionNumber);

  switch (requiredPermission) {
    case 1:
      return hasPermission1;
    case 2:
      return hasPermission2;
    case 3:
      return hasPermission3;
    case 4:
      return hasPermission4;
    case 5:
      return hasPermission5;
    case 6:
      return hasPermission6;
    default:
      return false;
  }
};
