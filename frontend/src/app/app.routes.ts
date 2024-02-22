import { Routes } from '@angular/router';

import { cmsAuthGuard } from './guards/cmsAuth/cms-auth.guard';

import { AppComponent } from './app.component';
import { CmsPustyComponent } from './views/cms-pusty/cms-pusty.component';
import { CmsRegisterComponent } from './views/cms-register/cms-register.component';
import { CmsLoginComponent } from './views/cms-login/cms-login.component';
import { CmsComponent } from './views/cms/cms.component';
import { AktualnosciComponent } from './views/aktualnosci/aktualnosci.component';
import { PracownicyComponent } from './views/pracownicy/pracownicy.component';
import { EdycjaPracownikaComponent } from './views/edycja-pracownika/edycja-pracownika.component';
import { EmployeeRegisterComponent } from './views/employee-register/employee-register.component';
import { GlownaStronaComponent } from './views/glowna-strona/glowna-strona.component';



export const routes: Routes = [
    {
        path: '', component: AppComponent, children: [
            { path: '', component: GlownaStronaComponent }, // schemat logowania: /główna -> /głównaLogin -> /główna 
            {
                path: 'cms', component: CmsPustyComponent, children: [
                    {
                        path: 'logged', component: CmsComponent, canActivate: [cmsAuthGuard], children: [
                            { path: 'aktualnosci', component: AktualnosciComponent },
                            { path: 'pracownicy', component: PracownicyComponent },
                            { path: 'employeeEdit/:id', component: EdycjaPracownikaComponent },
                            { path: 'employeeRegister', component: EmployeeRegisterComponent }
                        ]
                    },
                    { path: 'login', component: CmsLoginComponent },
                    { path: 'register', component: CmsRegisterComponent }
                ]
            }
        ]
    }
];
