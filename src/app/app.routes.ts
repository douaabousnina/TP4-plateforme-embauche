import { Routes } from '@angular/router';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { HiredListComponent } from './components/hired-list/hired-list.component';
import { CvDetailComponent } from './components/cv-detail/cv-detail.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';

export const routes: Routes = [
    { path: '', redirectTo: '/cvs', pathMatch: 'full' },
    { path: 'cvs', component: CvListComponent },
    { path: 'embauches', component: HiredListComponent },
    { path: 'cv/:id', component: CvDetailComponent },
    { path: 'auth', component: AuthFormComponent },
    { path: 'slider', component: ImageSliderComponent }
];
