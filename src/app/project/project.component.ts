import { Component, OnInit } from '@angular/core';
import { ProjectsDataService } from '../services/projects-data.service';
import { Project } from './project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})


export class ProjectComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectsDataService: ProjectsDataService) {

  }


  ngOnInit(): void {
    this.getProjectsData();
  }

  getProjectsData(): void {
    this.projectsDataService.getProjectsData()
      .subscribe(projects => this.projects = projects)
  }

}
