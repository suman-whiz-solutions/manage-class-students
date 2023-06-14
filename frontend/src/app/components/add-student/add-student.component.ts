import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassManagementService } from 'src/app/services/class-management.service';
import { StudentManagementService } from 'src/app/services/student-management.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent {
  newStudentForm: FormGroup;
  @Output() closeAddFoam: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() getAllStudents: EventEmitter<any> = new EventEmitter<any>();
  classes= [
    {
      "id": "645a93d2c11790f5e6b04ee6",
      "name": "XII"
    },
    {
      "id": "645cbc93c11790f5e6b04fe0",
      "name": "I"
    },
    {
      "id": "645cbcacc11790f5e6b04fe2",
      "name": "II"
    },
    {
      "id": "645cbcc0c11790f5e6b04fe4",
      "name": "III"
    },
    {
      "id": "645cbcd7c11790f5e6b04fe6",
      "name": "IV"
    },
    {
      "id": "645cbcecc11790f5e6b04fe8",
      "name": "V"
    },
    {
      "id": "645cbcfdc11790f5e6b04fea",
      "name": "VI"
    }
  ]
  constructor(
    private _classService: ClassManagementService,
    private _studentService: StudentManagementService
  ) {
    this.newStudentForm = new FormGroup({})
  }
  ngOnInit(): void {
    this.newStudentForm = new FormGroup({
      firstName: new FormControl<string>("", Validators.required),
      lastName: new FormControl<string>("", Validators.required),
      roll: new FormControl<number | null>(null, Validators.required),
      classId: new FormControl<string>("", Validators.required),
      father: new FormControl<string>("", Validators.required),
      address: new FormControl<string>("", Validators.required),
      dob: new FormControl<Date | null>(null, Validators.required),
    })
   
  }

 addNewStudent() {
    console.log(this.newStudentForm)
    //this.newStudentForm.value.dob = new Date(this.newStudentForm.value.dob);
    this._studentService.addStudent(this.newStudentForm.value).subscribe(({ data, loading }) => {
      console.log(data);
      this.newStudentForm.reset();  
      this.getAllStudents.emit();    
    })
       

  }
  closeAddWindow() {
    this.closeAddFoam.emit(true);
  }
}
