import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
    
    },
    {
        path: 'user',
        component: LoginComponent
    },
    {
        path: 'create-user',
        component: CreateUserComponent
    }


];
