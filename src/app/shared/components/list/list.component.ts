import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks/tasks.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  tasks$ = this.tasksService.tasks$;
  filteredTasks$ = this.tasksService.filteredTasks$;
  hasCompletedTasks: boolean = false;

  constructor(public tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasksService.loadTasksFromCache();
    this.tasks$.subscribe((tasks) => {
      this.hasCompletedTasks = tasks.some((task) => task.status === 'complete');
    });
  }

  setFilter(filter: string): void {
    this.tasksService.setFilter(filter);
  }

  clearCompletedTasks(): void {
    const confirmed = window.confirm(
      'Are you sure you want to clear all completed tasks?'
    );
    if (confirmed) {
      this.tasksService.clearCompletedTasks();
      this.tasksService.cacheTasks();
    }
  }

  clearCachedTasks(): void {
    const confirmed = window.confirm(
      'Are you sure you want to clear all cached tasks?'
    );
    if (confirmed) {
      this.tasksService.clearCachedTasks();
    }
  }
}
