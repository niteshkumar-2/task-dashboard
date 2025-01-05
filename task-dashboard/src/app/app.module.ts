import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { TaskListComponent } from './tasks/components/task-list/task-list.component';
import { TaskModalComponent } from './tasks/components/task-modal/task-modal.component';
import { ConfirmDialogComponent } from './tasks/components/confirm-dialog/confirm-dialog.component';
// import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
// import { ConfirmDialogComponent } from './tasks/components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskModalComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: '', component: TaskListComponent }]),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
