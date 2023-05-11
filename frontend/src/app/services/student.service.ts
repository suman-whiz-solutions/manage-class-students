import { Injectable } from '@angular/core';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import { IStudent, IStudentFilter } from '../interfaces/Student';
import { lastValueFrom } from 'rxjs';
import { GraphqlService } from './graphql.service';

@Injectable({
	providedIn: 'root'
})
export class StudentService {

	// private getAllStudentQuery: QueryRef<{ getAllStudents: any }, { filter: IStudentFilter }>
	private QueryForGetAllStudent = `getAllStudentQuery($filter:StudentFilter){
		getAllStudents(filter:$filter){
			total
			limit
			pageNo
			students {
				id
				class {
					name
				}
				name
				roll
				father
				address
				dob
				classId
			}
		}
	}`

	constructor(
		private apollo: Apollo,
		private graphqlService: GraphqlService
	) { }

	async getAllStudents(filter: IStudentFilter): Promise<any> {
		const result = await this.graphqlService.makeQuery(this.QueryForGetAllStudent).refetch({ filter });
		return result.data.getAllStudents;
	}

	async addStudent(inputValue: IStudent): Promise<any> {
		const result = await this.graphqlService.makeMutation(`AddNewStudent($input: StudentInput!) {
			addNewStudent(input: $input) {
			  id
			  name
			}
		  }`, {
			"input": inputValue
		})
		console.log("add student ", result)
		return result;
	}

	async updateStudent(inputValue: IStudent, id: string): Promise<any> {
		const result = await this.graphqlService.makeMutation(`UpdateStudent($input: StudentInput!,$updateStudentId: ID) {
			updateStudent(input: $input,id: $updateStudentId) {
			  id
			  name
			}
		  }`, {
			"updateStudentId": id,
			"input": inputValue
		})
		console.log("result", result);
		return result;
	}

	async deleteStudent(id: string): Promise<any> {
		const result = await this.graphqlService.makeMutation(`DeleteStudent($deleteStudentId: ID) {
			deleteStudent(id: $deleteStudentId) {
			  id
			  name
			}
		  }`, {
			"deleteStudentId": id
		})
		console.log("result", result);
		return result;
	}
}
