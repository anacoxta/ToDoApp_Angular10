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

  toggleTaskStatus(): void {
    const updatedTask = {
      ...this.task,
      status: this.task.status === 'incomplete' ? 'complete' : 'incomplete',
    };

    const updatedTasks = this.tasksService.tasksSubject
      .getValue()
      .map((task) => (task.task === updatedTask.task ? updatedTask : task));
    this.tasksService.tasksSubject.next(updatedTasks);
    this.tasksService.cacheTasks();
  }

  deleteTask(): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );
    if (confirmed) {
      const updatedTasks = this.tasksService.tasksSubject
        .getValue()
        .filter((task) => task.task !== this.task.task);
      this.tasksService.tasksSubject.next(updatedTasks);
      this.tasksService.cacheTasks();
    }
  }
}
