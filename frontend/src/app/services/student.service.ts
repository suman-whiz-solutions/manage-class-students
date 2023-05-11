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
	private QueryForGetAllStudent = `query getAllStudentQuery($filter:StudentFilter){
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
		private graphqlService:GraphqlService
		) {}

	async getAllStudents(filter: IStudentFilter): Promise<any> {
		const result = await this.graphqlService.makeQuery(this.QueryForGetAllStudent).refetch({ filter });
		return result.data.getAllStudents;
	}

	async addStudent(inputValue: IStudent): Promise<any> {
		const result = await this.graphqlService.makeMutation(`mutation AddNewStudent($input: StudentInput!) {
			addNewStudent(input: $input) {
			  id
			  name
			}
		  }`,{
			"input": inputValue
		})
		console.log("add student ",result)
		return result;
	}

	async updateStudent(inputValue: IStudent,id:string): Promise<any> {
		const result = await lastValueFrom(this.apollo.mutate({
			mutation: gql`mutation UpdateStudent($input: StudentInput!,$updateStudentId: ID) {
				updateStudent(input: $input,id: $updateStudentId) {
				  id
				  name
				}
			  }`,
			variables: {
				"updateStudentId": id,
				"input": {
					"name": inputValue.name,
					"roll": inputValue.roll,
					"classId": inputValue.classId,
					"father": inputValue.father,
					"address": inputValue.address,
					"dob": inputValue.dob,
				}
			}
		}))
		console.log("result", result);
		return result;
	}
}
