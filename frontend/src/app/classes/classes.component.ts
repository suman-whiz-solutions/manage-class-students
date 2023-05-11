import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service';
import { IClassFilter, IClassList } from '../interfaces/Class';

@Component({
	selector: 'app-classes',
	templateUrl: './classes.component.html',
	styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

	classList: IClassList = {
		classes: [],
		limit: 10,
		pageNo: 1,
		total: 0
	}
	filter: IClassFilter = {}

	constructor(private classService: ClassService) {
	}

	ngOnInit(): void {
		this.getAllClasses();
	}

	async getAllClasses() {
		this.classList = await this.classService.getAllClasses(this.filter);
		console.log("classList", this.classList);
	}

}
