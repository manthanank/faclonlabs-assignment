import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: 'content',
    loadChildren: () => import('./content/content.module').then(m => m.ContentModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'table', component: TableComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
