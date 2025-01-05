import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ConfirmationDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
    this.taskService.tasks$.subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  applyFilter(): void {
    this.filteredTasks = this.filterStatus
      ? this.tasks.filter(task => task.status === this.filterStatus)
      : this.tasks;
  }

  addTask(): void {``
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.applyFilter();
    });
  }

  editTask(task: Task): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.applyFilter();
    });
  }

  deleteTask(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(task);
        this.applyFilter();
      }
    });
  }
}
