import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  @Input() task!: { task: string; status: string };
  @Output() taskUpdated = new EventEmitter<{ task: string; status: string }>();
  @Output() taskDeleted = new EventEmitter<{ task: string; status: string }>();

  constructor(private tasksService: TasksService) {}

  toggleStatus() {
    const updatedTask = {
      ...this.task,
      status: this.task.status === 'incomplete' ? 'complete' : 'incomplete',
    };
    this.tasksService.updateTask(updatedTask);
    this.taskUpdated.emit(updatedTask);
  }

  deleteTask() {
    this.tasksService.deleteTask(this.task);
    this.taskDeleted.emit(this.task);
  }
}
