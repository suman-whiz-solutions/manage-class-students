import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClassManagementComponent } from './components/class-management/class-management.component';
import { StudentManagementComponent } from './components/student-management/student-management.component';

const routes: Routes = [
   { path: 'class', component: ClassManagementComponent, pathMatch: "full" },
  { path: "student", component: StudentManagementComponent, pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
