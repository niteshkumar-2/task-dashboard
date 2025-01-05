import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  taskForm: FormGroup;
  isEditMode: boolean = false;
  priorityOptions: string[] = ['Low', 'Medium', 'High'];
  statusOptions: string[] = ['Pending', 'In Progress', 'Completed'];

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.isEditMode = !!data?.task;
    this.taskForm = this.fb.group({
      title: [this.isEditMode ? data.task.title : '', [Validators.required, Validators.maxLength(100)]],
      description: [this.isEditMode ? data.task.description : '', [Validators.maxLength(500)]],
      priority: [this.isEditMode ? data.task.priority : 'Low', Validators.required],
      status: [this.isEditMode ? data.task.status : 'Pending', Validators.required]
    });
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const taskData: Task = this.taskForm.value;
      if (this.isEditMode) {
        const updatedTask: Task = { ...taskData, id: this.data.task.id };
        this.taskService.updateTask(updatedTask);
      } else {
        this.taskService.addTask(taskData);
      }
      this.dialogRef.close(true);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
