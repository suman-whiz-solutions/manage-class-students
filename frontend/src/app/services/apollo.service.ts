import {Apollo, gql } from "apollo-angular";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

  export class ApolloService {
  
    constructor(private apollo: Apollo) { }
        
      query(query: string, variable?: object) {
        return this.apollo.watchQuery({
            query: gql`${query}`,
            ...(variable && { variables: variable }),
        });
      }

      mutate(query: string, variable?: object) {
          return this.apollo.mutate({
              mutation: gql`${query}`,
              ...(variable && { variables: variable }),
          });
      }
  }

 