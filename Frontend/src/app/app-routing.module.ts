import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Crud1readComponent } from './crud1read/crud1read.component';
import { HttpStatusComponent } from './http-status/http-status.component';

const routes: Routes = [
  { path: '', redirectTo: '/crud1read', pathMatch: 'full' },
  { path: 'crud1read', component: Crud1readComponent },
  { path: 'httpstatus', component: HttpStatusComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
