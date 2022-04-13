import { Todo } from './todo-list/todo';

export interface Project {
  id: number;
  title: string;
  todos: Todo[];
}
