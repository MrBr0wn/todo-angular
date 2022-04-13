import { Project } from "../project/project";
import { Todo } from "../project/todo-list/todo";

export const PROJECTS: Project[] = [{
  id: 1,
  title: 'Project 1',
  todos: [
    {
      id: 1,
      text: 'Something 1',
      isCompleted: false,
      project_id: 1
    },
    {
      id: 2,
      text: 'Something more 1',
      isCompleted: true,
      project_id: 1
    }]
  },
  {
    title: 'Project 2',
    todos: [{
      id: 1,
      text: 'Something 2',
      isCompleted: true,
      project_id: 2
    },
    {
      id: 2,
      text: 'Something more 2',
      isCompleted: false,
      project_id: 2
    }]
  }
];
