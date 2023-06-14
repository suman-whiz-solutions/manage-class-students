import { Component, ViewChild } from '@angular/core';
import { StudentManagementService } from 'src/app/services/student-management.service';
// import { MatPaginator } from '@angular/material/paginator';
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
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
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
  filterKeys = ['name',"roll"]
  ngAfterViewInit() {
    //  this.allStudents.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getAllStudents();
  }
  getAllStudents() {
    console.log("getAllStudents called")
    this._studentService.getStudents().subscribe(({ data, loading }) => {
      console.log(data);
      this.allStudentsData = data.getStudents;
    })
  }
  searchBy() {
    if(this.selectedFilterKey=='roll'){
      this.searchedValue= +this.searchedValue
    }
    this._studentService.getAllStudents().then((data) => {
      this.allStudentsData = data.students;
    })
  }
refetchStudentDetails(){
  this._studentService.getAllStudents().then((data) => {
    console.log(data)
    this.allStudentsData = data.students;
  })
}
  handlePageEvent(event: PageEvent) {
    console.log(event);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openAddStudentFoam() {
    this.toggleAddStudentFoam = !this.toggleAddStudentFoam
  }
  openEditStudentFoam() {
    this.toggleEditStudentFoam = !this.toggleEditStudentFoam
  }

  editStudent(student: any) {
    // this.toastr.success('Hello world!', 'Toastr fun!');
    student = { ...student };
    student.dob = this.datepipe.transform(student["dob"], 'yyyy-MM-dd');
    this.student = student;
    this.toggleAddStudentFoam = false;
    this.toggleEditStudentFoam = true;
  }
  deleteStudent(student: any) {
    if (confirm(`Do you want to delete ${student.firstName} ${student.lastName}'s record`)) {
      let filterStudent = {
        "classId": student.classId
      }
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

