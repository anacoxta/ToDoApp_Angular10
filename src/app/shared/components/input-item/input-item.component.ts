import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TasksService } from '../../services/tasks/tasks.service';
import { Task } from '../../interfaces/shared.interface';

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
      const taskData: Task = {
        task: this.taskForm.value.task!,
        status: 'pending',
      };
      this.tasksService.setTask(taskData);
      console.log('Updated tasks:', this.tasksService.tasksSubject.getValue());
      this.taskForm.reset();
    }
  }
}
