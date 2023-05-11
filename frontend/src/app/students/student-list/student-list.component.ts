import { Component, OnInit } from '@angular/core';
import { IStudent, IStudentFilter, IStudentList } from '../../interfaces/Student';
import { StudentService } from '../../services/student.service';

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
	filter: IStudentFilter = {};
	student: IStudent = {
		name: "",
		classId: "",
		roll: null,
		address: "",
		dob: null,
		father: "",
	}
	constructor(private studentService: StudentService) {
	}

	ngOnInit(): void {
		this.getStudentList();
	}

	async getStudentList(): Promise<void> {
		this.studentList = await this.studentService.getAllStudents(this.filter);
	}

	showAddStudentSection() {
		this.showUpdateStudent = false;
		this.showAddStudent = !this.showAddStudent;
	}

	editStudent(student: IStudent) {
		student = { ...student };
		student.dob = this.formatDate(student["dob"]);
		this.student = student;
		this.showAddStudent = false;
		this.showUpdateStudent = true;
	}

	reloadStudentList(event: any) {
		if (event) {
			this.showAddStudent = false
			this.getStudentList();
		}
	}

	closeUpdateWindowReq(event: boolean){
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
