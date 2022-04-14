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
      alert(JSON.stringify(this.addForm.value))
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
      .subscribe(projects => this.categoriesSelect = projects)
  }

}
