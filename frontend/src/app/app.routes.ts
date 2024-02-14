import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CmsPustyComponent } from './views/cms-pusty/cms-pusty.component';
import { CmsComponent } from './views/cms/cms.component';
import { CmsLoginComponent } from './views/cms-login/cms-login.component';
import { CmsRegisterComponent } from './views/cms-register/cms-register.component';
import { GlownaStronaComponent } from './views/glowna-strona/glowna-strona.component';

import { cmsAuthGuard } from './guards/cmsAuth/cms-auth.guard';

export const routes: Routes = [
    {
        path: '', component: AppComponent, children: [
            { path: '', component: GlownaStronaComponent },
            {
                path: 'cms', component: CmsPustyComponent, children: [
                    { path: 'aktualnosci', component: CmsComponent, canActivate: [cmsAuthGuard] },
                    { path: 'login', component: CmsLoginComponent },
                    { path: 'register', component: CmsRegisterComponent }
                ]
            }
        ]
    }
];
