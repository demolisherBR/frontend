import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateListComponent } from './template-list/template-list.component';

const routes: Routes = [
  {path:"templateslist", component:TemplateListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
