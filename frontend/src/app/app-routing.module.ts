import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassesComponent } from './classes/classes.component';
import { StudentListComponent } from './students/student-list/student-list.component';

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "classes", component: ClassesComponent },
  { path: "students", component: StudentListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
