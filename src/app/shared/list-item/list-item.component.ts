import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  @Input() task!: { task: string; status: string };
  @Output() taskUpdated = new EventEmitter<{ task: string; status: string }>();
  @Output() taskDeleted = new EventEmitter<{ task: string; status: string }>();

  toggleStatus() {
    this.taskUpdated.emit({
      ...this.task,
      status: this.task.status === 'incomplete' ? 'complete' : 'incomplete',
    });
  }

  deleteTask() {
    this.taskDeleted.emit(this.task);
  }
}
