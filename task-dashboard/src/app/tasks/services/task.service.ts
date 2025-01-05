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

  // Get all tasks
  getTasks(): Task[] {
    return [...this.tasks];  // Return a copy to avoid direct mutation
  }

  // Add a new task
  addTask(task: Task): void {
    const newId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1; // Generate next ID
    this.tasks.push({ ...task, id: newId });
  }

  // Update an existing task
  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);  // Use `id` for unique identification
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    } else {
      console.error(`Task with id ${updatedTask.id} not found for update.`);
    }
  }

  // Delete a task
  deleteTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);  // Find task by `id`
    if (index !== -1) {
      this.tasks.splice(index, 1);  // Remove the task by index
    } else {
      console.error(`Task with id ${task.id} not found for deletion.`);
    }
  }
}
