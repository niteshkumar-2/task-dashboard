import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Task 1 description', priority: 'High', status: 'Pending' },
    { id: 2, title: 'Task 2', description: 'Task 2 description', priority: 'Medium', status: 'In Progress' },
    { id: 3, title: 'Task 3', description: 'Task 3 description', priority: 'Low', status: 'Completed' }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    const newTask: Task = { ...task, id: this.generateId() };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.tasksSubject.next(this.tasks);
    }
  }

  deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.tasksSubject.next(this.tasks);
  }

  private generateId(): number {
    const maxId = Math.max(...this.tasks.map(task => task.id), 0);
    return maxId + 1;
  }
}
