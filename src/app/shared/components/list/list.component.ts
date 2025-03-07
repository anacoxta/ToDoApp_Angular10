import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
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

  addTask(newTask: { task: string; status: string }) {
    const currentTasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...currentTasks, newTask]);
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
}
