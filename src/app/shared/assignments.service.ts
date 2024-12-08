import { Injectable, OnInit } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { error } from 'console';

@Injectable({
  // permet d'éviter de devoir importer le service dans le tableau des providers du module
  providedIn: 'root'
})
export class AssignmentsService {

  backendURL = "http://localhost:8010/api/assignments";

  constructor(private loggingService:LoggingService, private http: HttpClient) { } 

  assignments:Assignment[] = [
    {
      id:1,
      nom: "TP1 sur WebComponents, un lecteur audio amélioré",
      dateDeRendu: new Date('2020-11-17'),
      rendu: true
    },
    {
      id:2,
      nom: "TP2 sur Angular, un joli gestionnaire de devoirs (assignments)",
      dateDeRendu: new Date('2020-12-15'),
      rendu: false
    },
    {
      id:3,
      nom: "TP3 sur Angular, utilisation du router et de WebServices",
      dateDeRendu: new Date("2021-01-04"),
      rendu: false
    }
  ]

  getAssignmentsPagine(page:number, limit:number): Observable<any> {
    return this.http.get<any>(this.backendURL + '?page=' + page + '&limit=' + limit);
  }


  getAssignments():Observable<any> {
    return this.http.get<any>(this.backendURL);
  }

  getAssignment(id:number):Observable<any> {
    return this.http.get<any>(this.backendURL + "/" + id)
    .pipe(map(a=> {
      a.nom += "transformé avec un pipe....";
      return a;
    }),
  tap(_ =>{
    console.log("tap: assignment id" + id + " requete get envoyé sur le cloud");
  }),
  catchError(this.handleError<any>(`getAssignment(id=${id})`))
);}

private handleError<T>(operation: any, result?: T){
  return(error: any): Observable<T> => {
    console.log(error);

    return of (result as T);
  };
}

  addAssignment(assignment:Assignment) : Observable<any>{
    //this.assignments.push(assignment);
    //this.loggingService.log(assignment.nom, "ajouté");
    //return of("Assignment ajouté");
    return this.http.post<any>(this.backendURL, assignment);
  }

  updateAssignment(assignment:Assignment) : Observable<any>{
    //return of("Assignment service : assignment modifié");

    return this.http.put<Assignment>(this.backendURL, assignment);
  }

  deleteAssignment(assignment:Assignment) : Observable<any>{
    /*let pos = this.assignments.indexOf(assignment);
    this.assignments.splice(pos, 1);

    return of("Assignment service : assignment supprimé");*/
    return this.http.delete<Assignment>(this.backendURL + "/" + assignment.id);
  }

}
