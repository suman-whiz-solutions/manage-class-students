import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ApolloService } from './apollo.service';

@Injectable({
  providedIn: 'root'
})
export class StudentManagementService {

  constructor(private apolloService: ApolloService) { }

  getStudents(): Observable<any> {
   const query = `query GetStudents {
      getStudents {
        _id
        classId
        class
        firstName
        lastName
        roll
        father
        address
        dob
        createdOn
        updatedOn
      }
    }`;
    return this.apolloService.query(query).valueChanges
  }

  
  async getAllStudents(filter?: any){
    const QueryForGetAllStudent = `query ($filter: StudentFilter) {
      getStudentsByFilter(filter: $filter) {
        _id
        classId
        class
        firstName
        lastName
        roll
        father
        address
        dob
        createdOn
        updatedOn
      }
    }`
    
    const result = await this.apolloService.query(QueryForGetAllStudent, { filter: filter }).refetch();
    return result;
  }

  addStudent(foam: any): Observable<any> {
    const query = `mutation Mutation($input: StudentInput!) {
        createStudent(input: $input) {
        address
        classId
        father
        _id
        dob
        firstName
        lastName
        roll
      }
    }`
    return this.apolloService.mutate(query, { input: foam })
  }

  updateStudent(updatedfoam: any, id: any): Observable<any> {
    console.log(updatedfoam, id);
    const query = ` mutation UpdateStudent($input: StudentInput!, $update: StudentInput) {
      updateStudent(input: $input, update: $update) {
        _id
        classId
        class
        firstName
        lastName
        roll
        father
        address
        dob
        createdOn
        updatedOn
      }
    }`
    let variable = {
      "input": updatedfoam,
      "update": id
    }
    return this.apolloService.mutate(query, variable)
  }

  deleteStudentById(id: object): Observable<any> {
    const query = `mutation DeleteStudent($input: StudentInput!) {
      deleteStudent(input: $input) {
        _id
        classId
        class
        firstName
        lastName
        roll
        father
        address
        dob
        createdOn
        updatedOn
      }
    }`
    let variable = {
      "input": id
    }
    return this.apolloService.mutate(query, variable)
  }

}

