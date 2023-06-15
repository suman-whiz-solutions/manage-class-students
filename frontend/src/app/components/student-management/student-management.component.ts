import { Component, ViewChild } from '@angular/core';
import { StudentManagementService } from 'src/app/services/student-management.service';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/services/common.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class StudentManagementComponent {
  
  allStudentsData: any = [];
  displayedColumns: string[] = ['id', 'name', 'roll', 'address', 'dob', 'father', "icon"];
  allStudents = new MatTableDataSource(this.allStudentsData);
  searchedValue: any = '';
  imgSrc: any = {
    infoIcon: '../assets/images/info.svg'
  }
  student: any;
  constructor(private _studentService: StudentManagementService,
    public _commonService: CommonService,
    private modalService: NgbModal,
    public datepipe: DatePipe,
    private toastr: ToastrService) { }
  toggleAddStudentFoam = false;
  toggleEditStudentFoam = false;
  expandedElement = null
  selectedFilterKey: any
  filterKeys = ['firstName',"roll"]
  
  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this._studentService.getStudents().subscribe(({ data, loading }) => {
      this.allStudentsData = data.getStudents;
    })
  }

  searchBy() {
    if(this.selectedFilterKey=='roll'){
      this.searchedValue= +this.searchedValue
    }
    this._studentService.getAllStudents({ [this.selectedFilterKey]: this.searchedValue }).then(({data, loading}: any) => {
      this.allStudentsData = data.getStudentsByFilter;
    })
    
  }

  refetchStudentDetails(filter?: any){
    this._studentService.getAllStudents(filter).then(({data, loading}: any) => {
      this.allStudentsData = data.getStudentsByFilter;
    })
  }

  handlePageEvent(event: PageEvent) {
    console.log(event);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  openAddStudentFoam() {
    this.toggleAddStudentFoam = !this.toggleAddStudentFoam
  }

  openEditStudentFoam() {
    this.toggleEditStudentFoam = !this.toggleEditStudentFoam
  }

  editStudent(student: any) {
    student = { ...student };
    student.dob = this.datepipe.transform(student["dob"], 'yyyy-MM-dd');
    this.student = student;
    this.toggleAddStudentFoam = false;
    this.toggleEditStudentFoam = true;
  }

  deleteStudent(student: any) {
    let filterStudent = {
      "classId": student.classId
    }
    if (confirm(`Do you want to delete ${student.firstName}'s record`)) {
      this._studentService.deleteStudentById(filterStudent).subscribe(({ data, loading }) => {
        this._commonService.showSuccess();
        this.refetchStudentDetails();
      })
    }
  }

  closeUpdateFoam(event: boolean) {
    if (event) {
      this.toggleEditStudentFoam = false;
    }
  }

  closeAddFoam(event: boolean) {
    if (event) {
      this.toggleAddStudentFoam = false;
    }
  }

}

