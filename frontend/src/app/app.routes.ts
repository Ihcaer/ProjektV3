import { Routes } from '@angular/router';

import { CmsComponent } from './views/cms/cms.component';
import { CmsLoginComponent } from './views/cms-login/cms-login.component';

export const routes: Routes = [
    { path: 'cms', component: CmsComponent },
    { path: 'cmsLogin', component: CmsLoginComponent }
];
