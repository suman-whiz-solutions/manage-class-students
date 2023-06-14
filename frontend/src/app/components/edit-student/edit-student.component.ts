import { Component, EventEmitter, Inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentManagementService } from 'src/app/services/student-management.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent {
  updateStudentForm: FormGroup;
  @Output() closeUpdateFoam: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() getAllStudents: EventEmitter<any> = new EventEmitter<any>();
  @Input() student: any;
  classes = [
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
  constructor(private _studentService: StudentManagementService
    // public dialogRef: MatDialogRef<DialogBoxComponent>,@Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateStudentForm = new FormGroup({
      firstName: new FormControl<string>("", Validators.required),
      lastName: new FormControl<string>("", Validators.required),
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


  // onNoClick(): void {
  // this.dialogRef.close();
  // }
  ngOnInit(): void {
  }
  updateStudent() {
    let filterStudent = {
      "classId": this.student.classId
    }
    this._studentService.updateStudent(this.updateStudentForm.value, filterStudent).subscribe(({ data, loading }) => {
      console.log(data);
      this.getAllStudents.emit()
      this.updateStudentForm.reset();
      this.closeUpdateWindow();
    })
  }

  // closeModal(result) {
  //   this.submitData.emit({
  //     result: result,
  //   })
  //   this.activeModal.close();
  // }

  // dismissModal() {
  //   this.activeModal.close();
  // }
  closeUpdateWindow() {
    this.closeUpdateFoam.emit(true);
  }

}
