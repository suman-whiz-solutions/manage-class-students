import { Component, OnInit } from '@angular/core';
import { IStudent, IStudentFilter, IStudentList } from '../../interfaces/Student';
import { StudentService } from '../../services/student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, of, switchMap } from 'rxjs';

@Component({
	selector: 'app-student-list',
	templateUrl: './student-list.component.html',
	styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
	showAddStudent: boolean = false;
	showUpdateStudent: boolean = false;
	studentList: IStudentList = {
		students: [],
		total: 0
	}
	filter: any = {};
	student: IStudent = {
		name: "",
		classId: "",
		roll: null,
		address: "",
		dob: null,
		father: "",
	}
	filterFormGroup: FormGroup = new FormGroup({});
	constructor(private studentService: StudentService) {
	}

	ngOnInit(): void {
		this.getStudentList();
		this.filterFormGroup = new FormGroup({
			filterBy: new FormControl("", Validators.required),
			filterValue: new FormControl("", Validators.required)
		});
		this.filterFormGroup.valueChanges.pipe(
			debounceTime(500),
			switchMap((id: string) => {
				let filterBy = this.filterFormGroup.value.filterBy;
				let filterValue = this.filterFormGroup.value.filterValue;
				this.filter = {};
				if (filterBy && filterValue) {
					this.filter[filterBy] = filterValue;
				}
				
				console.log(filterBy,filterValue)
				return this.studentService.getAllStudents(this.filter);
			})
		).subscribe((data) => {
			console.log("Switch map data", data);
			if (data && data.total>0) {
				this.studentList = data;
			}
			
		})
	}

	async getStudentList(): Promise<void> {
		this.studentList = await this.studentService.getAllStudents(this.filter);
	}

	showAddStudentSection() {
		this.showUpdateStudent = false;
		this.showAddStudent = !this.showAddStudent;
	}

	editStudent(student: IStudent): void {
		student = { ...student };
		student.dob = this.formatDate(student["dob"]);
		this.student = student;
		this.showAddStudent = false;
		this.showUpdateStudent = true;
	}
	async deleteStudent(student: IStudent): Promise<void> {
		if (confirm(`Are you sure to delete ${student.name}'s record`)) {
			await this.studentService.deleteStudent(student.id).then((res) => {
				alert("Successfully deleted")
				this.getStudentList();
			})
		}
	}

	reloadStudentList(event: any) {
		if (event) {
			this.showAddStudent = false
			this.getStudentList();
		}
	}

	closeUpdateWindowReq(event: boolean) {
		if (event) {
			this.showUpdateStudent = false;
		}
	}

	private formatDate(date: any) {
		const d = new Date(date);
		let month = '' + (d.getMonth() + 1);
		let day = '' + d.getDate();
		const year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	}
}
