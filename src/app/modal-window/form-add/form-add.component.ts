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
     "todoTitle": new FormControl("", [Validators.required]),
     "categoryId": new FormControl(this.categoriesSelect, [Validators.required])
   });
  }

  // Initialization with data from api
  ngOnInit(): void {
    this.getProjectsData();
  }

  // Plug for submitting from data
  submitFormTodo(): any {
    console.log('Send todo form');
    this.isValidated = true;
    if (!this.addForm.valid) {
      return false;
    } else {
      alert(JSON.stringify(this.addForm.value));
      if (this.addForm.value['categoryTitle']) {
        console.log('Form with new category');
        this.postTodoWithCategory(
          this.addForm.value['categoryTitle'],
          this.addForm.value['todoTitle']
        );
      } else {
        console.log('Form without new category');
        this.postTodo(this.addForm.value['todoTitle'], this.addForm.value['categoryId']);
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
      this.addForm.addControl("categoryTitle", new FormControl("", [Validators.required]));
    } else {
      this.isNewCategory = false;
      this.addForm.removeControl("categoryTitle");
      this.addForm.controls["categoryId"].setValue(event.value, { onlySelf: true});
    }
  }

  // Clearing the todo title input field with a button in this field
  clearTodoTitleField(): void {
    this.addForm.controls["todoTitle"].setValue('');
  }

  // GET: list projects categories
  getProjectsData(): void {
    this.projectsDataService.getProjectsData()
      .subscribe(projects => this.categoriesSelect = projects);
  }

  // POST: sending form for create only one new todo
  postTodo(text: string, project_id: number): void {
    this.projectsDataService.sendTodo({ text, project_id } as Todo)
    // this.projectsDataService.sendTodo({ "todo": {text, project_id }} as unknown)
      .subscribe();
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
      .subscribe();
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
