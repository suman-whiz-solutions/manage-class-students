import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloService } from './apollo.service';

@Injectable({
  providedIn: 'root'
})
export class StudentManagementService {

  constructor(private apolloService: ApolloService) { }

  getStudents(filter?: any): Observable<any> {
    const query = `query getAllStudentQuery($filter:StudentFilter){
      getAllStudents(filter:$filter){
        total
        limit
        pageNo
        students {
          id
          name
          roll
          father
          address
          dob
          classId
        }
      }
    }`;
    return this.apolloService.query(query, filter).valueChanges
  }

  addStudent(foam: any): Observable<any> {
    const query = `mutation Mutation($input: StudentInput!) {
  addNewStudent(input: $input) {
    address
    classId
    father
    id
    dob
    name
    roll
  }
}`
    return this.apolloService.mutate(query, { input: foam })
  }
  async getAllStudents(filter: any): Promise<any> {
    const QueryForGetAllStudent = `getAllStudentQuery($filter:StudentFilter){
      getAllStudents(filter:$filter){
        total
        limit
        pageNo
        students {
          id
          name
          roll
          father
          address
          dob
          classId
        }
      }
    }`
    const result = await this.apolloService.makeQuery(QueryForGetAllStudent).refetch({ filter });
    return result.data.getAllStudents;
  }
  updateStudent(updatedfoam: any, id: any): Observable<any> {
    console.log(updatedfoam);
    // {
    //   "name": "Ram",
    //   "roll": 3,
    //   "classId": '645cbcd7c11790f5e6b04fe6',
    //   "father": "Ramesh",
    //   "address": "Harayana",
    //   "dob": '2023-04-16',
    // }
    const query = ` mutation UpdateStudent($input: StudentInput!,$updateStudentId: ID) {
      updateStudent(input: $input,id: $updateStudentId) {
        id
        name
      }
      }`
    let variable = {
      "updateStudentId": id,
      "input": updatedfoam
    }
    return this.apolloService.mutate(query, variable)
  }
  deleteStudentById(id: string): Observable<any> {
    const query = `mutation DeleteStudent($deleteStudentId: ID) {
      deleteStudent(id: $deleteStudentId) {
        id
        name
      }
      }`
    let variable = {
      "deleteStudentId": id
    }
    return this.apolloService.mutate(query, variable)
  }

}

