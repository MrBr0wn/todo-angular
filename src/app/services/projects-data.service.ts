import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Project } from "../project/project";
import { Todo } from "../project/todo-list/todo";

@Injectable({
  providedIn: 'root'
})

export class ProjectsDataService {

  private projectsUrl = "http://localhost:3000/projects.json";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Request-Method': 'PATCH'
    })
  };

  constructor(private http: HttpClient) { }

  // GET: Getting all projects from server
  getProjectsData(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
      .pipe(
        catchError(this.handleError<Project[]>('getProjectsData', []))
      );
  }

  // PATCH: Updating todo property isCompleted
  updateTodoUrl: string = "http://localhost:3000/projects/";
  createTodoUrl: string = "http://localhost:3000/todos";

  updateTodo(todo: Todo): Observable<any> {
    return this.http.patch(`${this.updateTodoUrl}${todo.project_id}/todos/${todo.id}`, todo, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateTodo'))
      );
  }

  // POST: sending a new todo
  sendTodo(todo: Todo): Observable<any> {
    console.log(todo);

    return this.http.post<Todo>(`${this.createTodoUrl}`, todo, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(
        catchError(this.handleError<any>('sendTodo'))
      );
  }

  // POST: sending a new todo with a new project
  sendTodoWithProject(data: any): Observable<any> {
    console.log(data);

    return this.http.post(`${this.createTodoUrl}`, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(
        catchError(this.handleError<any>('sendTodoWithProject'))
      );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {
      // send error
      console.error(error);

      return of(result as T);
    }
  }
}
