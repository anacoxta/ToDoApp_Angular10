import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/shared.interface';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent {
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<Task>();

  constructor(private tasksService: TasksService) {}

  toggleTaskStatus(): void {
    const updatedTask: Task = {
      ...this.task,
      status: this.task.status === 'pending' ? 'complete' : 'pending',
    };

    let updatedTasks = this.tasksService.tasksSubject
      .getValue()
      .map((task) => (task.task === updatedTask.task ? updatedTask : task));

    updatedTasks = this.moveCompleted(updatedTasks, updatedTask);

    this.tasksService.tasksSubject.next(updatedTasks);
    this.tasksService.cacheTasks();
    this.taskUpdated.emit(updatedTask);
  }

  moveCompleted(arr: Task[], task: Task): Task[] {
    const index = arr.findIndex((i) => i.task === task.task);
    if (index === -1) {
      return arr;
    }

    const newArr = [...arr];
    const [removedItem] = newArr.splice(index, 1);
    newArr.push(removedItem);
    return newArr;
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
      this.taskDeleted.emit(this.task);
    }
  }
}
