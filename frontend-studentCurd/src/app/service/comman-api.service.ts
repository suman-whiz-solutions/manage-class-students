import { Injectable } from '@angular/core';
import {gql, Apollo} from 'apollo-angular';
// import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class CommanApiService {
  // allStudent:Student[] = [];
  constructor(private apollo: Apollo,) { }

  // async getAllClasses(get_Data:any): Promise<any> {
	// 	const result = await this.getAllClassesQuery.refetch({ filter });
	// 	return result.data.getAllClasses;
	// }


  getStudents(get_Data:any){
   this.apollo.watchQuery<any>({
      query: get_Data
    }).valueChanges.subscribe(({data, loading}) => {
      console.log(data.student,'data.student===');
      
      return data.student;
    })
  }
}
