import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  private tasksSubject = new BehaviorSubject<
    { task: string; status: string }[]
  >([]);
  private filterSubject = new BehaviorSubject<string>('all');

  tasks$ = this.tasksSubject.asObservable();
  filter$ = this.filterSubject.asObservable();

  filteredTasks$ = combineLatest([this.tasks$, this.filter$]).pipe(
    map(([tasks, filter]) => {
      if (filter === 'all') {
        return tasks;
      } else {
        return tasks.filter((task) => task.status === filter);
      }
    })
  );

  ngOnInit() {
    if (localStorage.getItem('yourTasks')) {
      this.tasksSubject.next(JSON.parse(localStorage.yourTasks));
      console.log('Cache:', localStorage.yourTasks);
    }
  }

  addTask(newTask: { task: string; status: string }) {
    const currentTasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...currentTasks, newTask]);
    this.cacheTask();
    console.log('Tasks:', this.tasksSubject.getValue());
  }

  updateTask(updatedTask: { task: string; status: string }) {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map((task) =>
      task.task === updatedTask.task ? updatedTask : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  deleteTask(taskToDelete: { task: string; status: string }) {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.filter(
      (task) => task.task !== taskToDelete.task
    );
    this.tasksSubject.next(updatedTasks);
  }

  setFilter(filter: string) {
    this.filterSubject.next(filter);
  }

  clearCompletedTasks() {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.filter(
      (task) => task.status !== 'complete'
    );
    this.tasksSubject.next(updatedTasks);
  }

  clearCachedTasks() {
    localStorage.removeItem('yourTasks');
    console.log('Cache:', localStorage.yourTasks);
  }

  cacheTask(): void {
    localStorage.yourTasks = JSON.stringify(this.tasksSubject.getValue());
    console.log('Cache:', localStorage.yourTasks);
  }
}
