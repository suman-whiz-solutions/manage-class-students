import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ClassManagementComponent } from './components/class-management/class-management.component';
import { StudentManagementComponent } from './components/student-management/student-management.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddClassComponent } from './components/add-class/add-class.component';
import { EditClassComponent } from './components/edit-class/edit-class.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
toolbar
@NgModule({
  declarations: [
    AppComponent,
    ClassManagementComponent,
    StudentManagementComponent,
    AddStudentComponent,
    AddClassComponent,
    EditClassComponent,
    EditStudentComponent,
    DataTableComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    MatSelectModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
