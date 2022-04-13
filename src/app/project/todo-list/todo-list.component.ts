import { Component, OnInit, Input } from '@angular/core';
import { Todo } from './todo';
import { ProjectsDataService } from '../../services/projects-data.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private projectsDataService: ProjectsDataService) { }

  @Input() todos?: Todo[];

  updateItem(item: Todo): void {
    item.isCompleted = !item.isCompleted;
    if (item) {
      this.projectsDataService.updateTodo(item)
        .subscribe();
    }
  }


  ngOnInit(): void {
  }


}
