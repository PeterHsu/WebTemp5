import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Crud1readComponent} from './crud1read/crud1read.component';

const routes: Routes = [
  { path: '', redirectTo: '/crud1read', pathMatch: 'full' },
  { path: 'crud1read', component: Crud1readComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
