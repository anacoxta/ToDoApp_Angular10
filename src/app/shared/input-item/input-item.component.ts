import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-item',
  templateUrl: './input-item.component.html',
  styleUrls: ['./input-item.component.css'],
})
export class InputItemComponent {
  @Output() taskAdded = new EventEmitter<{ task: string; status: string }>();

  taskForm = new FormGroup({
    task: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  addTask(): void {
    if (this.taskForm.valid) {
      const taskData = {
        task: this.taskForm.value.task!,
        status: 'incomplete',
      };
      this.taskAdded.emit(taskData);
      this.taskForm.reset();
    }
  }
}
