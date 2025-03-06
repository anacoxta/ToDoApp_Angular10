import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  filteredTasks: any;
  filter: any;
  tasks: { task: string; status: string }[] = [];

  addTask(newTask: { task: string; status: string }) {
    this.tasks.push(newTask);
    console.log('Tasks:', this.tasks);
  }

  updateTask(updatedTask: { task: string; status: string }) {
    this.tasks = this.tasks
      .map((task) => (task.task === updatedTask.task ? updatedTask : task))
      .sort((a, b) => (a.status === 'incomplete' ? -1 : 1));
  }

  deleteTask(taskToDelete: { task: string; status: string }) {
    this.tasks = this.tasks.filter((task) => task.task !== taskToDelete.task);
  }
}
