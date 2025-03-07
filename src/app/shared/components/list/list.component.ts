import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  tasks$ = this.tasksService.tasks$;
  filteredTasks$ = this.tasksService.filteredTasks$;

  constructor(public tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.loadTasksFromCache();
  }

  setFilter(filter: string) {
    this.tasksService.setFilter(filter);
  }

  clearCompletedTasks() {
    this.tasksService.clearCompletedTasks();
  }

  clearCachedTasks() {
    this.tasksService.clearCachedTasks();
  }
}
