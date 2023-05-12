import { Component,OnInit} from '@angular/core';
import { Student } from './models/student';
import {gql, Apollo} from 'apollo-angular';
import { CommanApiService } from './service/comman-api.service';


const get_Data = gql`
query{
  students{
    id,
    firstName,
    lastName,
    age,
  },
}`;

const Post_Save = gql
` mutation create($firstName: String, $lastName: String,$age: Int) {
  create(firstName: $firstName, lastName: $lastName, age: $age) {
    firstName
    lastName
    age
  }
 }`


const get_DataSearch = gql`
query ($studentId:ID){
  student(id:$studentId){
    id,
     firstName,
     lastName
  }
}`;

 
 const DELETE_QUOTE = gql`
 mutation delete($id: ID!) {
   delete(id: $id) {
     id
     firstName
     lastName
   }
 }
`;

const Post_update = gql`
 mutation update($id: ID,$firstName: String, $lastName: String,$age: Int) {
  update(id: $id, firstName: $firstName, lastName: $lastName, age: $age) {
    id
    firstName
    lastName
    age
  }
 }`



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public allStudent:any;
  searchTxt:string = '';
  public isUpdate=true;

  gadgetForms = {
    firstName:'',
    lastName:'',
    age:'',
    id:0
  };

  constructor(
    private apollo: Apollo,
    private commanApiService: CommanApiService
    ){}
  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
    this.getRecord();
  }

  getRecord(){
    this.apollo.watchQuery<any>({
      query: get_Data
    }).valueChanges.subscribe(({data, loading}) => {
      this.allStudent= data.students;
    })
  }


  newGadget(){
    this.apollo.mutate({
      mutation:Post_Save,
      variables:{
          firstName: this.gadgetForms.firstName,
          lastName: this.gadgetForms.lastName,
          age:Number(this.gadgetForms.age),
      }
    }).subscribe(({data}) => {
      let gadgets = Object.assign([], this.allStudent)
      this.getRecord();
      // this.allStudent = gadgets;
    })
  }


  searchByBrand(){
    this.apollo.watchQuery<any>({
       query: get_DataSearch,
       variables:{
        studentId  : this.searchTxt
       }
     }).valueChanges.subscribe(({data, loading}) => {
       console.log(loading);
       this.allStudent = data.student;
     });
   }


   deleteRecord(id:string){
    let text = "Are you sure want to delete record.";
    if (confirm(text) == true) {
      this.apollo
      .mutate({
        mutation: DELETE_QUOTE,
        refetchQueries: [{ query: get_Data }],
        variables: {
          id: id,
        },
      })
      .subscribe(() => {
        console.log("deleted");
      });
    } else {
      text = "You canceled!";
    }
   }


   updateRecord(data:any){
    this.gadgetForms = {
      firstName:data.firstName,
      lastName:data.lastName,
      age:data.age,
      id:data.id,
    };
    this.isUpdate=false;
   }

   updateRecordStudent(){
    this.apollo.mutate({
      mutation:Post_update,
      variables:{
          id: this.gadgetForms.id,
          firstName: this.gadgetForms.firstName,
          lastName: this.gadgetForms.lastName,
          age:Number(this.gadgetForms.age),
      }
    }).subscribe(({data}) => {
      let gadgets = Object.assign([], this.allStudent)
      this.getRecord();
      // this.allStudent = gadgets;
    })

   }
}
