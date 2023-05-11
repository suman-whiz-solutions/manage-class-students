import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClassList } from 'src/app/interfaces/Class';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  newStudentForm: FormGroup;
  classes: IClassList["classes"] = [];
  @Output() reloadStudentList: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private classService: ClassService,
    private studentService: StudentService
  ) {
    this.newStudentForm = new FormGroup({})
  }

  ngOnInit(): void {
    this.newStudentForm = new FormGroup({
      name: new FormControl<string>("", Validators.required),
      roll: new FormControl<number | null>(null, Validators.required),
      classId: new FormControl<string>("", Validators.required),
      father: new FormControl<string>("", Validators.required),
      address: new FormControl<string>("", Validators.required),
      dob: new FormControl<Date | null>(null, Validators.required),
    })
    this.getClassesList()
  }

  async addNewStudent() {
    console.log(this.newStudentForm.value)
    //this.newStudentForm.value.dob = new Date(this.newStudentForm.value.dob);
    await this.studentService.addStudent(this.newStudentForm.value).then((res)=>{
      this.newStudentForm.reset();
      this.reloadStudentList.emit(true);
    })

  }

  async getClassesList() {
    let classList = await this.classService.getAllClasses({});
    this.classes = classList.classes;
  }

  ngOnDestroy() {
    this.newStudentForm.reset();
  }
}
