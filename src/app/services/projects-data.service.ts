import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectsDataService {

  constructor(private http:HttpClient) { }

  projects_url = "http://localhost:3000/projects.json"

  projects() {
    return this.http.get(this.projects_url);
  }
}
