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

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.isEditMode = data?.task ? true : false; // Check if editing an existing task
    this.taskForm = this.fb.group({
      title: [this.isEditMode ? data.task.title : '', Validators.required],
      description: [this.isEditMode ? data.task.description : ''],
      priority: [this.isEditMode ? data.task.priority : 'Low', Validators.required],
      status: [this.isEditMode ? data.task.status : 'Pending', Validators.required]
    });
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const taskData: Task = this.taskForm.value;

      // If editing, update the task using its ID
      if (this.isEditMode) {
        const updatedTask: Task = { ...taskData, id: this.data.task.id };
        this.taskService.updateTask(updatedTask);
      } else {
        // If adding a new task, no need to set the ID; it will be handled in the service
        this.taskService.addTask(taskData);
      }
      this.dialogRef.close(true); // Close dialog and return 'true' to indicate success
    }
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close dialog and return 'false' to indicate cancel
  }
}
