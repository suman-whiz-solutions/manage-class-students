import { Component, OnInit, ViewChild } from '@angular/core';
import { IStudent, IStudentList } from '../../interfaces/Student';
import { StudentService } from '../../services/student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, of, switchMap } from 'rxjs';
import { AddStudentComponent } from '../add-student/add-student.component';
import { ClassService } from 'src/app/services/class.service';
import { IClassList } from 'src/app/interfaces/Class';

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
	sortFormGroup: FormGroup = new FormGroup({});
	classes: IClassList["classes"] = [];

	constructor(private studentService: StudentService, private classService: ClassService) {
	}

	ngOnInit(): void {
		this.getStudentList();
		this.getClassesList();
		this.filterFormGroup = new FormGroup({
			filterBy: new FormControl("", Validators.required),
			filterValue: new FormControl("", Validators.required)
		});
		this.sortFormGroup = new FormGroup({
			sortBy: new FormControl("", Validators.required),
			sortOrder: new FormControl("", Validators.required)
		});
		this.filterFormGroup.valueChanges.pipe(
			debounceTime(1000),
			switchMap((id: string) => {
				let filterBy = this.filterFormGroup.value.filterBy;
				let filterValue = this.filterFormGroup.value.filterValue;
				this.filter = {};
				if (filterBy && filterValue) {
					this.filter[filterBy] = (filterBy == 'roll') ? Number(filterValue) : filterValue;
				}
				return this.studentService.getAllStudents(this.filter);
			})
		).subscribe((data) => {
			if (data && data.total > 0) {
				this.studentList = data;
			}
		})

		this.sortFormGroup.valueChanges.pipe(
			debounceTime(1000),
			switchMap((id: string) => {
				let sortBy = this.sortFormGroup.value.sortBy;
				let sortOrder = this.sortFormGroup.value.sortOrder;
				delete this.filter.sortField;
				delete this.filter.sortOrder;
				if (sortBy && sortOrder) {
					this.filter["sortField"] = sortBy;
					this.filter["sortOrder"] = sortOrder;
				}
				return this.studentService.getAllStudents(this.filter);
			})
		).subscribe((data) => {
			if (data && data.total > 0) {
				this.studentList = data;
			}
		})
	}

	async getStudentList(): Promise<void> {
		this.studentList = await this.studentService.getAllStudents(this.filter);
	}

	async getClassesList() {
		let classList = await this.classService.getAllClasses({});
		this.classes = classList.classes;
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
