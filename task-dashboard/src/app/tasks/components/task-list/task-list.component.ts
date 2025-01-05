import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterStatus: string = '';
  displayedColumns: string[] = ['title', 'description', 'priority', 'status', 'actions'];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks;
  }

  applyFilter(): void {
    this.filteredTasks = this.filterStatus
      ? this.tasks.filter((task) => task.status === this.filterStatus)
      : this.tasks;
  }

  editTask(task: Task): void {
    // Open the TaskModalComponent for editing
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: { task }  // Pass the task data to the modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the task after the modal is closed
        this.updateTask(result);
      }
    });
  }

  deleteTask(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(task);
      this.applyFilter();  // Reapply the filter after deletion
    }
  }

  private updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.title === updatedTask.title);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.applyFilter();  // Reapply the filter after the update
    }
  }
}
