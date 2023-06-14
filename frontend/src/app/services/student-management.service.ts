import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloService } from './apollo.service';

@Injectable({
  providedIn: 'root'
})
export class StudentManagementService {

  constructor(private apolloService: ApolloService) { }

  getStudents(): Observable<any> {
    console.log("getStudents called");
    const query = `query {
      getStudents{
        
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
    console.log("query: ", query);
    return this.apolloService.query(query).valueChanges
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
  async getAllStudents(): Promise<any> {
    const QueryForGetAllStudent = `query {
      getStudents{
        
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
    const result = await this.apolloService.makeQuery(QueryForGetAllStudent).refetch();
    console.log("result : ", result)
    return result.data.getStudents;
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

