import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  filteredTasks: { task: string; status: string }[] = [];
  filter: string = 'all';
  tasks: { task: string; status: string }[] = [];

  addTask(newTask: { task: string; status: string }) {
    this.tasks.push(newTask);
    this.applyFilter();
    console.log('Tasks:', this.tasks);
  }

  updateTask(updatedTask: { task: string; status: string }) {
    this.tasks = this.tasks.map((task) =>
      task.task === updatedTask.task ? updatedTask : task
    );
    this.applyFilter();
  }

  deleteTask(taskToDelete: { task: string; status: string }) {
    this.tasks = this.tasks.filter((task) => task.task !== taskToDelete.task);
    this.applyFilter();
  }

  setFilter(filter: string) {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter() {
    if (this.filter === 'all') {
      this.filteredTasks = this.tasks;
    } else {
      this.filteredTasks = this.tasks.filter(
        (task) => task.status === this.filter
      );
    }
  }
}
