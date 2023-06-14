import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { STUDENT_FIELDS, IStudent } from '../models/students.model';
import { ApolloService } from '../services/apollo.service';

@Injectable({
    providedIn: 'root',
})
export class StudentsService {
    constructor(private apolloService: ApolloService) {}

    getStudents(): Observable<any> {
        const query = `
            query GetStudents {
                getStudents {
                    students{
                        ...STUDENT_FIELDS
                    }
                    message
                    statusCode
                    success
                }
            }
            ${STUDENT_FIELDS}
        `;

      
        return this.apolloService.query(query).valueChanges
    }

}