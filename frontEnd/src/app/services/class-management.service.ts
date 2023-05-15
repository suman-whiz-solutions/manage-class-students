import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloService } from './apollo.service';
@Injectable({
  providedIn: 'root'
})
export class ClassManagementService {

  constructor(private _apolloService:ApolloService) { }

  getClasses(): Observable<any>{
    const query = `    
    query getAllClassesQuery($filter: ClassFilter) {
      getAllClasses(filter: $filter) {
      total
      limit
      pageNo
      classes {
        id
        name
        head
        floor
      }
      }
        }  
    `;
    return this._apolloService.query(query).valueChanges

  }
}
