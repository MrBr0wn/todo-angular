import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Project } from "../project/project";
import { Todo } from "../project/todo-list/todo";

@Injectable({
  providedIn: 'root'
})

export class ProjectsDataService {

  constructor(private http:HttpClient) { }

  projectsUrl = "http://localhost:3000/projects.json"

  projects: any;

  projects1() {
    return this.projects = this.http.get(this.projectsUrl);
  }
}
