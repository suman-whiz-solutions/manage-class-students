import {NgModule} from '@angular/core';
import {ApolloModule, Apollo} from 'apollo-angular';
import {InMemoryCache} from '@apollo/client/core';
import { Router} from '@angular/router';
import {HttpLink} from 'apollo-angular/http';
import { onError } from '@apollo/client/link/error';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from './services/storage.service';

const uri = "http://localhost:3000/";

@NgModule({
  exports: [ApolloModule],
})
export class GraphQLModule {

  constructor(apollo: Apollo, httpLink: HttpLink,private _storageService: StorageService,private router: Router) {

    const errorLink = onError(({ networkError }) => {
      const networkErrorRef:HttpErrorResponse = networkError as HttpErrorResponse;
      if(networkErrorRef && networkErrorRef.status === 404){
        console.log(networkErrorRef)
        this.router.navigate(['/']);
       }
      
    });
    apollo.create({
      link: errorLink.concat(httpLink.create({ uri: uri})),
      cache: new InMemoryCache(),
    });
  }

}
