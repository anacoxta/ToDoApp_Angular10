import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.css'],
})
export class InputItemComponent {
  taskForm = new FormGroup({
    task: new FormControl('', [Validators.required]),
  });

  constructor(private tasksService: TasksService) {}

  addTask(): void {
    if (this.taskForm.valid) {
      const taskData = {
        task: this.taskForm.value.task!,
        status: 'incomplete',
      };
      this.tasksService.setTask(taskData);
      console.log('Updated tasks:', this.tasksService.tasksSubject.getValue());
      this.taskForm.reset();
    }
  }
}
