import { Component, ViewChild } from '@angular/core';
import { StudentManagementService } from 'src/app/services/student-management.service';
// import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/services/common.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentManagementComponent {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  allStudentsData: any = [];
  displayedColumns: string[] = ['id', 'name', 'roll', 'address', 'dob', 'father', "icon"];
  allStudents = new MatTableDataSource(this.allStudentsData);
  searchedValue: string = '';
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
  expandedElement=null
  selectedFilterKey:any
filterKeys=['name','class',"roll"]
  ngAfterViewInit() {
    //  this.allStudents.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getAllStudents();
  }
  getAllStudents(filter?: any) {
    this._studentService.getStudents(filter).subscribe(({ data, loading }) => {
      console.log(loading);
      this.allStudentsData = data.getAllStudents.students;
    })
  }
  searchBy() {
    this.getAllStudents({ [this.selectedFilterKey]: this.searchedValue })
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

  editStudent(student:any) {
    this.toastr.success('Hello world!', 'Toastr fun!');
		student = { ...student };
		student.dob = this.datepipe.transform(student["dob"], 'yyyy-MM-dd');
		this.student = student;
		this.toggleAddStudentFoam = false;
		this.toggleEditStudentFoam = true;
	}
	 deleteStudent(student:any) {
		if (confirm(`Do you want to delete ${student.name}'s record`)) {
			 this._studentService.deleteStudentById(student.id).subscribe(({ data, loading }) => {
				this._commonService.showSuccess();
			 this.getAllStudents();
			})
		}
	}
  closeUpdateWindowReq(event: boolean) {
		if (event) {
			this.toggleEditStudentFoam = false;
		}
	}

}

