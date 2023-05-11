import { Injectable } from '@angular/core';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import { IClassFilter, IClassList } from '../interfaces/Class';

@Injectable({
	providedIn: 'root'
})
export class ClassService {
	private getAllClassesQuery: QueryRef<{
		getAllClasses: any; classes: IClassList
	}, { filter: IClassFilter }>;

	constructor(private apollo: Apollo) {
		this.getAllClassesQuery = this.apollo.watchQuery({
			query: gql`query getAllClassesQuery($filter: ClassFilter) {
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
      				}`
		})
	}

	async getAllClasses(filter: IClassFilter): Promise<any> {
		const result = await this.getAllClassesQuery.refetch({ filter });
		return result.data.getAllClasses;
	}
}
