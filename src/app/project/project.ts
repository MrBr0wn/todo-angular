import { Todo } from './todo-list/todo';

export interface Project {
  title: string;
  todos: Todo[];
}
