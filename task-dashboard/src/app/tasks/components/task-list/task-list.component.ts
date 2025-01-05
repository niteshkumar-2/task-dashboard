import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterStatus: string = '';
  displayedColumns: string[] = ['title', 'description', 'priority', 'status'];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks;
  }

  applyFilter(): void {
    this.filteredTasks = this.filterStatus
      ? this.tasks.filter((task) => task.status === this.filterStatus)
      : this.tasks;
  }
}
