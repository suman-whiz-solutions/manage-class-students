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
    query Query {
      getClasses {
        _id
        class
        createdOn
        updatedOn
      }
    }  
    `;
    return this._apolloService.query(query).valueChanges

  }
}
