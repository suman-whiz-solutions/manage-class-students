import { Injectable } from '@angular/core';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  makeQuery(queryData: any): QueryRef<any> {
    return this.apollo.watchQuery({
      query: gql`query ${queryData}`
    })
  }

  makeMutation(mutateData: any, variables: any): Promise<any> {
    return lastValueFrom(this.apollo.mutate({
      mutation: gql`mutation ${mutateData}`,
      variables: variables
    }))
  }
}
