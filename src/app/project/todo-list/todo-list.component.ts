import { Component, OnInit, Input } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() todos?: Todo[];

  checkItem(item: Todo) {
    item.isCompleted = !item.isCompleted;

    console.log(item);
  }

  constructor() { }

  ngOnInit(): void {
  }


}
