import { Component, OnInit } from '@angular/core';
import { ProjectsDataService } from '../services/projects-data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any;
  constructor(private projectsData: ProjectsDataService) {
    this.projectsData.projects().subscribe((data) => {
      console.log("data", data);
      this.projects = data;
    })
  }

  ngOnInit(): void {
  }

}
