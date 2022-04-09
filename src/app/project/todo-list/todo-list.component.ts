import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  checkItem(item:any) {
    console.log(item.checked);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
