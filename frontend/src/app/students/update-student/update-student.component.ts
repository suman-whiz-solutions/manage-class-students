import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IClassList } from 'src/app/interfaces/Class';
import { IStudent } from 'src/app/interfaces/Student';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {
  updateStudentForm: FormGroup;
  classes: IClassList["classes"] = [];
  @Input() student: IStudent | any;
  @Output() reloadStudentList: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeUpdateWindowReq: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private classService: ClassService,
    private studentService: StudentService
  ) {
    this.updateStudentForm = new FormGroup({
      name: new FormControl<string>("", Validators.required),
      roll: new FormControl<number | null>(null, Validators.required),
      classId: new FormControl<string>("", Validators.required),
      father: new FormControl<string>("", Validators.required),
      address: new FormControl<string>("", Validators.required),
      dob: new FormControl<Date | null>(null, Validators.required),
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let change in changes) {
      if (change == "student") {
        this.student = changes["student"].currentValue;
        this.updateStudentForm.patchValue(this.student);
      }
    }
  }

  ngOnInit(): void {
    this.getClassesList();
  }

  async updateStudent() {
    console.log(this.updateStudentForm.value)
    await this.studentService.updateStudent(this.updateStudentForm.value,this.student.id).then((res) => {
      this.updateStudentForm.reset();
      this.reloadStudentList.emit(true);
      this.closeUpdateWindow();
    })

  }

  async getClassesList() {
    let classList = await this.classService.getAllClasses({});
    this.classes = classList.classes;
  }
  closeUpdateWindow() {
    this.closeUpdateWindowReq.emit(true);
  }

  ngOnDestroy() {
    this.updateStudentForm.reset();
  }
}
