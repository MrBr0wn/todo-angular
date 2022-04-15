import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Todo } from "../../project/todo-list/todo";
import { Project } from "../../project/project";
import { ProjectsDataService } from '../../services/projects-data.service';

@Component({
  selector: 'app-form-add',
  templateUrl: './form-add.component.html',
  styleUrls: ['./form-add.component.css']
})
export class FormAddComponent implements OnInit {

  value: string = 'Clear me';

  addForm: FormGroup;
  isValidated: boolean = false;
  isNewCategory: boolean = false;
  categoriesSelect: Project[] = [];


  // Greating form fields
  constructor(private projectsDataService: ProjectsDataService) {
    this.addForm = new FormGroup({
     "text": new FormControl("", [Validators.required]),
     "project_id": new FormControl(this.categoriesSelect, [Validators.required])
   });
  }

  // Initialization with data from api
  ngOnInit(): void {
    this.getProjectsData();
  }

  // Plug for submitting form data
  submitFormTodo(): any {
    console.log('Sending todo form...');
    this.isValidated = true;
    if (!this.addForm.valid) {
      return false;
    } else {

      if (this.addForm.value['project']) {
        console.log('...Form with new category...');
        this.postTodoWithCategory(
          this.addForm.value['project'],
          this.addForm.value['text']
        );
      } else {
        console.log('...Form without new category...');
        this.postTodo(this.addForm.value['text'], this.addForm.value['project_id']);
      }
    }
  }

  // Changing forms fields
  // If did selected new category, that adding one more input field
  // as category title, and switcher isNewCategory is toggle
  onChangeCategory(event: any) {
    console.log(event);

    if (event.value === "new") {
      this.isNewCategory = true;
      this.addForm.addControl("project", new FormControl("", [Validators.required]));
    } else {
      this.isNewCategory = false;
      this.addForm.removeControl("project");
      this.addForm.controls["project_id"].setValue(event.value, { onlySelf: true});
    }
  }

  // Clearing the todo title input field with a button in this field
  clearTodoTitleField(): void {
    this.addForm.controls["text"].setValue('');
  }

  // GET: list projects categories
  getProjectsData(): void {
    this.projectsDataService.getProjectsData()
      .subscribe(projects => this.categoriesSelect = projects);
  }

  // POST: sending form for create only one new todo
  postTodo(text: string, project_id: number): void {
    this.addForm.addControl("project", new FormControl(""));
    this.projectsDataService.sendTodo({ "todo": this.addForm.value } as unknown)
      .subscribe(() => {
        console.log('Form new todo sended');
      });
  }
  // Started POST "/todos" for ::1 at 2022-04-14 22:45:27 +0500
  // Processing by TodosController#create as HTML
  // Parameters: {
  //   "authenticity_token"=>"...",
  //   "todo" => {
  //     "text"=>"new task",
  //     "project"=>"",
  //     "project_id"=>"15"
  //   },
  //   "commit"=>"OK"
  // }

  // POST: sending form for create new todo and new project
  postTodoWithCategory(project: string, text: string): void {
    this.projectsDataService.sendTodoWithProject({ "todo": { text, project } } as unknown)
      .subscribe(() => {
        console.log('Form new todo and project sended');
      });
  }
  // Started POST "/todos" for ::1 at 2022-04-14 23:17:49 +0500
  // Processing by TodosController#create as HTML
  // Parameters: {
  //   "authenticity_token"=>"...",
  //   "todo" => {
  //     "text"=>"new task",
  //     "project"=>"test project",
  //     "project_id"=>""
  //   },
  //   "commit"=>"OK"
  // }


}
