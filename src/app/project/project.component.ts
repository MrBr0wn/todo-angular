import { Component, OnInit, Input } from '@angular/core';
import { ProjectsDataService } from '../services/projects-data.service';
import { Project } from './project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})


export class ProjectComponent implements OnInit {

// TODO: Привести получаемые данные к структуре интерфеса?

  projects: any;
  constructor(private projectsData: ProjectsDataService) {
    this.projectsData.projects1().subscribe((data) => {
      console.log("data", data);
      return this.projects = data;
    })
  }

  // projects: Project[] = [{
  //   title: 'Project 1',
  //   todos: [
  //     {
  //       text: 'Something 1',
  //       isCompleted: false
  //     },
  //     {
  //       text: 'Something more 1',
  //       isCompleted: true
  //     }]
  //   },
  //   {
  //     title: 'Project 2',
  //     todos: [{
  //       text: 'Something 2',
  //       isCompleted: true
  //     },
  //     {
  //       text: 'Something more 2',
  //       isCompleted: false
  //     }]
  //   }
  // ]



  ngOnInit(): void {
  }

}
