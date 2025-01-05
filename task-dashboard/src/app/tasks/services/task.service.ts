import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Task 1', priority: 'High', status: 'Pending' },
    { id: 2, title: 'Task 2', priority: 'Medium', status: 'In Progress' },
    { id: 3, title: 'Task 3', priority: 'Low', status: 'Completed' },
  ];

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(task: Task): void {
    task.id = new Date().getTime();
    this.tasks.push(task);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) this.tasks[index] = updatedTask;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
