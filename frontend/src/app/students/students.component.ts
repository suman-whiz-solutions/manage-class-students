import { Component } from '@angular/core';
import { StudentsService } from '../services/students.service'

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  public students : any = [];

  constructor(private _studentsService: StudentsService) { 
  }

  ngOnInit(){
    this.getStudents();
  }

  getStudents() {
    console.log("getStudents callled")
    this._studentsService.getStudents()
      .subscribe({
        next: (res) => {
          if(res.data.getStudents.success){
            this.students = res.data.getStudents.students;
            console.log("students", this.students);
          }
        },
        error: (error) => {
        }
      });
  }
}
