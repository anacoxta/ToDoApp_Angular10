import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  public tasksSubject = new BehaviorSubject<{ task: string; status: string }[]>(
    []
  );
  private filterSubject = new BehaviorSubject<string>('all');

  tasks$ = this.tasksSubject.asObservable();
  filter$ = this.filterSubject.asObservable();

  getTasks(): Observable<{ task: string; status: string }[]> {
    return this.tasks$;
  }

  setTask(t: { task: string; status: string }) {
    this.tasksSubject.next([...this.tasksSubject.getValue(), t]);
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

  clearCompletedTasks() {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.filter(
      (task) => task.status !== 'complete'
    );
    this.tasksSubject.next(updatedTasks);
  }

  clearCachedTasks() {
    localStorage.removeItem('yourTasks');
  }

  cacheTasks() {
    localStorage.yourTasks = JSON.stringify(this.tasksSubject.getValue());
  }

  loadTasksFromCache() {
    if (localStorage.getItem('yourTasks')) {
      this.tasksSubject.next(JSON.parse(localStorage.yourTasks));
      console.log('Cache:', localStorage.yourTasks);
    }
  }
}
