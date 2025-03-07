import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasksSubject = new BehaviorSubject<
    { task: string; status: string }[]
  >([]);
  private filterSubject = new BehaviorSubject<string>('all');

  tasks$ = this.tasksSubject.asObservable();
  filter$ = this.filterSubject.asObservable();

  getTasks(): Observable<{ task: string; status: string }[]> {
    return this.tasks$;
  }

  getFilter(): Observable<string> {
    return this.filter$;
  }

  setFilter(filter: string) {
    this.filterSubject.next(filter);
  }

  get filteredTasks$(): Observable<{ task: string; status: string }[]> {
    return combineLatest([this.tasks$, this.filter$]).pipe(
      map(([tasks, filter]) => {
        if (filter === 'all') {
          return tasks;
        } else {
          return tasks.filter((task) => task.status === filter);
        }
      })
    );
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

  cacheTasks() {
    localStorage.yourTasks = JSON.stringify(this.tasksSubject.getValue());
    console.log('Cache:', localStorage.yourTasks);
  }

  loadTasksFromCache() {
    if (localStorage.getItem('yourTasks')) {
      this.tasksSubject.next(JSON.parse(localStorage.yourTasks));
      console.log('Cache loaded:', localStorage.yourTasks);
    }
  }
}
